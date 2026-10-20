import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const source = path.join(__dirname, 'brand', 'logo-source.png');
const brandDir = path.join(root, 'public', 'assets', 'brand');

function pngToIcoBmp(entries) {
  const header = 6 + entries.length * 16;
  let offset = header;
  const parts = [Buffer.alloc(header)];
  parts[0].writeUInt16LE(0, 0);
  parts[0].writeUInt16LE(1, 2);
  parts[0].writeUInt16LE(entries.length, 4);
  let p = 6;
  for (const e of entries) {
    parts[0].writeUInt8(e.w >= 256 ? 0 : e.w, p++);
    parts[0].writeUInt8(e.h >= 256 ? 0 : e.h, p++);
    parts[0].writeUInt8(0, p++);
    parts[0].writeUInt8(0, p++);
    parts[0].writeUInt16LE(1, p);
    p += 2;
    parts[0].writeUInt16LE(32, p);
    p += 2;
    parts[0].writeUInt32LE(e.dib.length, p);
    p += 4;
    parts[0].writeUInt32LE(offset, p);
    p += 4;
    offset += e.dib.length;
    parts.push(e.dib);
  }
  return Buffer.concat(parts);
}

/** Crop to the white disc so {S} stays readable at favicon / header sizes. */
async function extractMarkBuffer() {
  const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let minX = info.width;
  let minY = info.height;
  let maxX = -1;
  let maxY = -1;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (r > 240 && g > 240 && b > 240) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }

  if (maxX < 0) {
    throw new Error('No white mark found in logo-source.png');
  }

  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const side = Math.max(maxX - minX + 1, maxY - minY + 1);
  const pad = Math.round(side * 0.02);
  const size = Math.min(info.width, info.height, side + pad * 2);
  const left = Math.max(0, Math.round(cx - size / 2));
  const top = Math.max(0, Math.round(cy - size / 2));
  const width = Math.min(size, info.width - left);
  const height = Math.min(size, info.height - top);

  // Fill remaining red canvas corners with white so the round UI mark reads as white + {S}.
  const cropped = await sharp(source)
    .extract({ left, top, width, height })
    .resize(512, 512, { fit: 'cover', position: 'centre' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const out = Buffer.from(cropped.data);
  for (let i = 0; i < out.length; i += 4) {
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];
    if (r > 180 && g < 120 && b < 120) {
      // Keep the glyph red; only neutralize near-corner red background via distance from center.
      const px = (i / 4) % 512;
      const py = Math.floor(i / 4 / 512);
      const dx = px - 255.5;
      const dy = py - 255.5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 248) {
        out[i] = 255;
        out[i + 1] = 255;
        out[i + 2] = 255;
      }
    }
  }

  return sharp(out, { raw: { width: 512, height: 512, channels: 4 } }).png().toBuffer();
}

async function toBmpDib(markPng, size) {
  const { data, info } = await sharp(markPng)
    .resize(size, size, { fit: 'cover', position: 'centre' })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  const xorSize = w * h * 4;
  const andRow = Math.ceil(w / 32) * 4;
  const andSize = andRow * h;
  const dib = Buffer.alloc(40 + xorSize + andSize);
  dib.writeUInt32LE(40, 0);
  dib.writeInt32LE(w, 4);
  dib.writeInt32LE(h * 2, 8);
  dib.writeUInt16LE(1, 12);
  dib.writeUInt16LE(32, 14);
  dib.writeUInt32LE(0, 16);
  dib.writeUInt32LE(xorSize + andSize, 20);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const srcIdx = ((h - 1 - y) * w + x) * 4;
      const dstIdx = 40 + (y * w + x) * 4;
      dib[dstIdx] = data[srcIdx + 2];
      dib[dstIdx + 1] = data[srcIdx + 1];
      dib[dstIdx + 2] = data[srcIdx];
      dib[dstIdx + 3] = data[srcIdx + 3];
    }
  }
  return { w, h, dib };
}

fs.mkdirSync(brandDir, { recursive: true });

const mark = await extractMarkBuffer();
const square = sharp(mark);

await square.clone().png({ compressionLevel: 9 }).toFile(path.join(brandDir, 'logo.png'));
await square.clone().webp({ quality: 92 }).toFile(path.join(brandDir, 'logo.webp'));

await sharp(mark).resize(64, 64, { fit: 'cover' }).png().toFile(path.join(root, 'public', 'favicon.png'));
await sharp(mark).resize(32, 32, { fit: 'cover' }).png().toFile(path.join(brandDir, 'favicon-32.png'));
await sharp(mark).resize(16, 16, { fit: 'cover' }).png().toFile(path.join(brandDir, 'favicon-16.png'));
await sharp(mark).resize(48, 48, { fit: 'cover' }).png().toFile(path.join(brandDir, 'favicon-48.png'));
await sharp(mark).resize(180, 180, { fit: 'cover' }).png().toFile(path.join(brandDir, 'apple-touch-icon.png'));

const entries = [];
for (const size of [16, 32, 48]) {
  entries.push(await toBmpDib(mark, size));
}
fs.writeFileSync(path.join(root, 'public', 'favicon.ico'), pngToIcoBmp(entries));

console.log('Brand assets regenerated → public/assets/brand + favicon.ico/png (cropped mark)');

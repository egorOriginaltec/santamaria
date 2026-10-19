/**
 * Comprime assets de imagen a WebP (y JPEG ligero para el hero).
 * Uso: node scripts/optimize-images.mjs
 */
import { mkdirSync, statSync, unlinkSync, writeFileSync } from 'node:fs';
import { dirname, extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');

/** @type {{ src: string; out: string; width?: number; quality?: number; format: 'webp' | 'jpeg' }[]} */
const JOBS = [
  {
    src: 'assets/hero/coding.jpg',
    out: 'assets/hero/coding.webp',
    width: 960,
    quality: 42,
    format: 'webp',
  },
  {
    src: 'assets/courses/computer.png',
    out: 'assets/courses/computer.webp',
    width: 256,
    quality: 72,
    format: 'webp',
  },
  {
    src: 'assets/courses/globe.png',
    out: 'assets/courses/globe.webp',
    width: 256,
    quality: 72,
    format: 'webp',
  },
  {
    src: 'assets/courses/lock.png',
    out: 'assets/courses/lock.webp',
    width: 256,
    quality: 72,
    format: 'webp',
  },
  {
    src: 'assets/courses/puzzle.png',
    out: 'assets/courses/puzzle.webp',
    width: 256,
    quality: 72,
    format: 'webp',
  },
  {
    src: 'assets/courses/python.png',
    out: 'assets/courses/python.webp',
    width: 256,
    quality: 72,
    format: 'webp',
  },
  {
    src: 'assets/courses/robot.png',
    out: 'assets/courses/robot.webp',
    width: 256,
    quality: 72,
    format: 'webp',
  },
  {
    src: 'assets/courses/smartphone.png',
    out: 'assets/courses/smartphone.webp',
    width: 256,
    quality: 72,
    format: 'webp',
  },
  {
    src: 'assets/courses/unity.png',
    out: 'assets/courses/unity.webp',
    width: 256,
    quality: 72,
    format: 'webp',
  },
  {
    src: 'assets/courses/roblox.png',
    out: 'assets/courses/roblox.webp',
    width: 256,
    quality: 72,
    format: 'webp',
  },
];

const UNUSED = [
  'assets/hero-city.jpg',
  'assets/hero-student.jpg',
  'assets/hero/city.jpg',
  'assets/hero/graduates.png',
  'assets/hero/student_grp.png',
];

async function optimizeOne(job) {
  const input = join(PUBLIC, job.src);
  const output = join(PUBLIC, job.out);
  mkdirSync(dirname(output), { recursive: true });

  let pipeline = sharp(input).rotate();
  if (job.width) {
    pipeline = pipeline.resize({
      width: job.width,
      withoutEnlargement: true,
      fit: 'inside',
    });
  }

  if (job.format === 'webp') {
    pipeline = pipeline.webp({ quality: job.quality ?? 70, effort: 6 });
  } else {
    pipeline = pipeline.jpeg({ quality: job.quality ?? 70, mozjpeg: true });
  }

  const buffer = await pipeline.toBuffer();
  writeFileSync(output, buffer);

  const before = statSync(input).size;
  const after = buffer.length;
  console.log(
    `${relative(PUBLIC, input)} → ${relative(PUBLIC, output)}  ${(before / 1024).toFixed(1)}KB → ${(after / 1024).toFixed(1)}KB`,
  );
}

async function main() {
  for (const job of JOBS) {
    await optimizeOne(job);
  }

  for (const rel of UNUSED) {
    const path = join(PUBLIC, rel);
    try {
      unlinkSync(path);
      console.log(`removed unused ${rel}`);
    } catch {
      // ignore missing
    }
  }

  // OG / redes: PNG pequeño de computer (mejor compatibilidad que WebP).
  const ogPng = join(PUBLIC, 'assets/courses/computer.png');
  const ogBuffer = await sharp(ogPng)
    .resize({ width: 1200, height: 630, fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png({ compressionLevel: 9, palette: true, quality: 70 })
    .toBuffer();
  writeFileSync(ogPng, ogBuffer);
  console.log(`og computer.png → ${(ogBuffer.length / 1024).toFixed(1)}KB`);

  const toDrop = [
    'assets/courses/globe.png',
    'assets/courses/lock.png',
    'assets/courses/puzzle.png',
    'assets/courses/python.png',
    'assets/courses/robot.png',
    'assets/courses/smartphone.png',
    'assets/courses/unity.png',
    'assets/courses/roblox.png',
    'assets/hero/coding.jpg',
  ];
  for (const rel of toDrop) {
    try {
      unlinkSync(join(PUBLIC, rel));
      console.log(`removed original ${rel}`);
    } catch {
      // ignore
    }
  }

  console.log('optimize-images: done');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

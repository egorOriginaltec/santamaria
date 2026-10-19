import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
/** Mantener alineado con APP_ORIGIN en src/app/core/constants/app/app.constants.ts */
const SITE_ORIGIN = 'https://santamarialearn.com';
const TODAY = new Date().toISOString().slice(0, 10);

const coursesPath = join(ROOT, 'src/app/features/landing/data/courses.ts');
const coursesSource = readFileSync(coursesPath, 'utf8');
const courseSlugs = [...coursesSource.matchAll(/slug:\s*'([^']+)'/g)].map((match) => match[1]);

if (courseSlugs.length === 0) {
  console.error('generate-sitemap: no se encontraron slugs de cursos.');
  process.exit(1);
}

/** @type {{ loc: string; priority: string; changefreq: string }[]} */
const urls = [
  { loc: `${SITE_ORIGIN}/`, priority: '1.0', changefreq: 'weekly' },
  ...courseSlugs.map((slug) => ({
    loc: `${SITE_ORIGIN}/cursos/${slug}`,
    priority: '0.9',
    changefreq: 'weekly',
  })),
  { loc: `${SITE_ORIGIN}/horarios`, priority: '0.8', changefreq: 'weekly' },
  { loc: `${SITE_ORIGIN}/contacto`, priority: '0.7', changefreq: 'monthly' },
];

const body = urls
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

const outPath = join(ROOT, 'public/sitemap.xml');
writeFileSync(outPath, xml, 'utf8');
console.log(`sitemap.xml generado (${urls.length} URLs) → public/sitemap.xml`);

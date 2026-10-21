import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tsPath = path.join(root, 'src/app/features/landing/pages/course/course.ts');
const outPath = path.resolve(root, '../santamaria-backend/database/data/landing_curricula.json');

/** @type {Record<string, string>} */
const MAP = {
  scratchCurriculum: 'scratch',
  mobileCurriculum: 'aplicaciones-moviles',
  arduinoCurriculum: 'robotica-arduino',
  unityCurriculum: 'videojuegos',
  pythonCurriculum: 'python',
  pythonAdvancedCurriculum: 'python-avanzado',
  aiCurriculum: 'inteligencia-artificial',
  webCurriculum: 'paginas-web',
  privateCurriculum: 'clases-particulares',
};

const ts = fs.readFileSync(tsPath, 'utf8');
/** @type {Record<string, unknown>} */
const result = {};

for (const [property, slug] of Object.entries(MAP)) {
  const regex = new RegExp(`readonly ${property} = (\\[[\\s\\S]*?\\]) as const;`);
  const match = ts.match(regex);
  if (!match) {
    console.warn(`Missing ${property}`);
    continue;
  }

  const data = new Function(`return (${match[1]});`)();
  result[slug] = normalizeUnits(data);
  const classes = result[slug].reduce((n, u) => n + u.sessions.length, 0);
  console.log(`${slug}: ${result[slug].length} units / ${classes} classes`);
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(result, null, 2));
console.log(`Wrote ${outPath}`);

/**
 * @param {Array<Record<string, unknown>>} units
 */
function normalizeUnits(units) {
  return units.map((unit) => {
    /** @type {Array<Record<string, string>>} */
    let sessions = [];

    if (Array.isArray(unit.sessions)) {
      sessions = unit.sessions.map((session) => ({
        date: String(session.date ?? ''),
        label: String(session.label ?? ''),
        title: String(session.title ?? ''),
        text: String(session.text ?? ''),
        learns: String(session.learns ?? ''),
        result: session.result != null ? String(session.result) : '',
      }));
    } else if (Array.isArray(unit.topics)) {
      sessions = unit.topics.map((topic, index) => ({
        date: '—',
        label: `Tema ${index + 1}`,
        title: String(topic),
        text: String(topic),
        learns: String(topic),
        result: '',
      }));
    }

    return {
      phase: String(unit.phase ?? ''),
      period: String(unit.period ?? ''),
      title: String(unit.title ?? ''),
      text: String(unit.text ?? ''),
      sessions,
    };
  });
}

import type { CourseOverviewRow } from '../../models/course-module/course-module.model';

export const COURSE_OVERVIEW_EYEBROW = 'Plan de estudios';

export const COURSE_OVERVIEW_TITLE = 'Ingeniería Full Stack + sistemas con IA';

export const COURSE_OVERVIEW_INTRO =
  'Ocho bloques encadenados: interfaz, lógica, API, base de datos, integración con modelos y automatización de procesos. Cada etapa deja un entregable que alimenta la siguiente.';

export const COURSE_OVERVIEW_WEEKS = 16;
export const COURSE_OVERVIEW_HOURS = 320;

export const COURSE_MAP: readonly CourseOverviewRow[] = [
  {
    block: 'HTML, CSS, Tailwind y Git',
    weeks: '1',
    hours: '20 h',
    projects: '1',
  },
  {
    block: 'JavaScript y lógica',
    weeks: '2–3',
    hours: '40 h',
    projects: '1',
  },
  {
    block: 'Angular, TypeScript y APIs',
    weeks: '4–5',
    hours: '40 h',
    projects: '2',
  },
  {
    block: 'Backend con PHP, Laravel y MySQL',
    weeks: '6–8',
    hours: '60 h',
    projects: '1',
  },
  {
    block: 'Full Stack Angular + Laravel',
    weeks: '9–10',
    hours: '40 h',
    projects: '2',
  },
  {
    block: 'Inteligencia Artificial',
    weeks: '11–13',
    hours: '60 h',
    projects: '3',
  },
  {
    block: 'Automatización con n8n',
    weeks: '14',
    hours: '20 h',
    projects: '1',
  },
  {
    block: 'Proyecto final Full Stack',
    weeks: '15–16',
    hours: '40 h',
    projects: '1',
  },
];

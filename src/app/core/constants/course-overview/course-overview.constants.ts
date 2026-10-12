import type { CourseOverviewRow } from '../../models/course-module/course-module.model';

export const COURSE_OVERVIEW_EYEBROW = 'Plan docente completo';

export const COURSE_OVERVIEW_TITLE =
  'De cero a productos reales con IA';

export const COURSE_OVERVIEW_INTRO =
  'De cero a productos reales: web, mapas, portal inmobiliario, reservas, IA, voz y automatizaciones. 8 bloques · 4 horas al día · lunes a viernes.';

export const COURSE_OVERVIEW_WEEKS = 16;
export const COURSE_OVERVIEW_HOURS = 320;
export const COURSE_OVERVIEW_DAYS = 80;

export const COURSE_MAP: readonly CourseOverviewRow[] = [
  {
    block: 'Tu primera web profesional',
    weeks: '1',
    hours: '20 h',
    projects: '1',
  },
  {
    block: 'Tu propio Google Maps',
    weeks: '2–3',
    hours: '40 h',
    projects: '1',
  },
  {
    block: 'Tu propio Idealista',
    weeks: '4–5',
    hours: '40 h',
    projects: '1',
  },
  {
    block: 'Sistema de clientes y reservas',
    weeks: '6–8',
    hours: '60 h',
    projects: '1',
  },
  {
    block: 'Plataforma de reservas online',
    weeks: '9–10',
    hours: '40 h',
    projects: '1',
  },
  {
    block: 'Tres productos con IA',
    weeks: '11–13',
    hours: '60 h',
    projects: '3',
  },
  {
    block: 'Recepcionista virtual por voz',
    weeks: '14',
    hours: '20 h',
    projects: '1',
  },
  {
    block: 'Gestión empresarial con IA',
    weeks: '15–16',
    hours: '40 h',
    projects: '1',
  },
];

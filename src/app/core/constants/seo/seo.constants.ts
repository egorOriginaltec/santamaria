import { APP_NAME, APP_ORIGIN } from '../app/app.constants';

/** Origen público del sitio (sin barra final). */
export const SITE_ORIGIN = APP_ORIGIN;

export const SITE_NAME = APP_NAME;

export const DEFAULT_SEO = {
  title: 'Santamaria Learn · Cursos de programación online para jóvenes',
  description:
    'Clases online en directo de programación, videojuegos, robótica, Python, web e IA para jóvenes de 12 a 18 años. Grupos reducidos en España.',
  image: `${SITE_ORIGIN}/assets/brand/logo.png?v=6`,
  locale: 'es_ES',
} as const;

/** Anclas de la home en español + alias antiguos en inglés. */
export const LANDING_FRAGMENT_ALIASES: Readonly<Record<string, string>> = {
  program: 'cursos',
  'why-us': 'por-que',
  why: 'por-que',
  calendar: 'calendario',
  faq: 'preguntas',
};

export interface PageSeo {
  readonly title: string;
  readonly description: string;
  readonly robots: string;
  readonly priority?: number;
}

/** SEO por ruta exacta (sin query). */
export const PAGE_SEO: Readonly<Record<string, PageSeo>> = {
  '/': {
    title: DEFAULT_SEO.title,
    description: DEFAULT_SEO.description,
    robots: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    priority: 1,
  },
  '/horarios': {
    title: 'Horarios y precios · Santamaria Learn',
    description:
      'Consulta horarios, días y precios de los cursos de programación online de Santamaria Learn. Grupos de lunes a viernes.',
    robots: 'index,follow',
    priority: 0.8,
  },
  '/contacto': {
    title: 'Contacto e inscripción · Santamaria Learn',
    description:
      'Escríbenos para plazas, horarios e inscripción en los cursos de programación online de Santamaria Learn.',
    robots: 'index,follow',
    priority: 0.7,
  },
  '/acceso': {
    title: 'Acceso alumnos · Santamaria Learn',
    description: 'Acceso al campus de Santamaria Learn para alumnos y familias.',
    robots: 'noindex,nofollow',
  },
};

/** Prefijos que no deben indexarse. */
export const NOINDEX_PATH_PREFIXES = [
  '/acceso',
  '/login',
  '/dashboard',
  '/alumno',
  '/student',
  '/legal',
  '/calendario',
] as const;

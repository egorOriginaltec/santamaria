import type { AudienceReason } from '../../models/audience/audience.model';

export const AUDIENCE_EYEBROW = 'Para quién es';

export const AUDIENCE_TITLE = '¿Por qué elegirnos?';

export const AUDIENCE_INTRO =
  'Extraescolares online y en directo, de los 8 a los 20. Un grupo pequeño cada semana, en toda España.';

export const AUDIENCE_REASONS: readonly AudienceReason[] = [
  {
    id: 1,
    code: '01',
    title: 'Desde cero',
    text: 'Entras en el curso que te encaja, aunque no hayas programado nunca.',
  },
  {
    id: 2,
    code: '02',
    title: 'Grupo reducido',
    text: 'Máximo 10. En la sesión hay tiempo para preguntar y para tu ejercicio.',
    highlight: true,
  },
  {
    id: 3,
    code: '03',
    title: 'Para cada edad',
    text: 'De los 8 a los 20 hay cursos distintos. Entras en el tuyo: un juego, una app, Python, inteligencia artificial o una página web.',
  },
  {
    id: 4,
    code: '04',
    title: 'En toda España',
    text: 'Desde casa, estés donde estés. Estás en la misma clase que tu grupo.',
  },
  {
    id: 5,
    code: '05',
    title: 'Clase en vivo',
    text: 'Cada semana se practica en directo. Al acabar tienes algo hecho que puedes enseñar.',
  },
] as const;

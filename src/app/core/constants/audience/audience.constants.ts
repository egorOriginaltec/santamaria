import type { AudienceReason } from '../../models/audience/audience.model';

export const AUDIENCE_EYEBROW = 'Por qué Santamaria';

export const AUDIENCE_TITLE = '¿Por qué elegirnos?';

export const AUDIENCE_INTRO =
  'Cursos online y en directo para jóvenes de 8 a 18 años. Grupos reducidos, acompañamiento cercano y un proyecto real en cada etapa.';

export const AUDIENCE_REASONS: readonly AudienceReason[] = [
  {
    id: 1,
    code: '01',
    title: 'Empieza en su nivel',
    text: 'No necesita experiencia previa. Cada curso parte de una edad y unos conocimientos concretos.',
  },
  {
    id: 2,
    code: '02',
    title: 'Atención de verdad',
    text: 'Los grupos son reducidos para poder preguntar, practicar y recibir ayuda durante la clase.',
    highlight: true,
  },
  {
    id: 3,
    code: '03',
    title: 'Un camino para crecer',
    text: 'Desde Scratch hasta apps, Roblox, Unity, Python, IA y desarrollo web.',
  },
  {
    id: 4,
    code: '04',
    title: 'Online y en directo',
    text: 'Se conecta desde casa, esté donde esté, y participa en tiempo real junto a su grupo y profesor.',
  },
  {
    id: 5,
    code: '05',
    title: 'Proyectos que se enseñan',
    text: 'Cada curso termina con algo propio y funcional: una app, un juego, un programa, una web o una automatización.',
  },
] as const;

import type { AudienceReason } from '../../models/audience/audience.model';

export const AUDIENCE_EYEBROW = 'Para quién es';

export const AUDIENCE_TITLE = '¿Por qué elegirnos?';

export const AUDIENCE_INTRO =
  'Empezamos desde cero y te llevamos, con ritmo claro, hasta un portfolio real.';

export const AUDIENCE_REASONS: readonly AudienceReason[] = [
  {
    id: 1,
    code: '01',
    title: 'Desde cero',
    text: 'Empiezas sin experiencia. Te guiamos desde los fundamentos hasta tu primer proyecto publicado.',
  },
  {
    id: 2,
    code: '02',
    title: 'Ruta clara',
    text: '16 semanas, 320 horas y objetivos semanales. Sabes qué construir en cada bloque del programa.',
    highlight: true,
  },
  {
    id: 3,
    code: '03',
    title: 'Resultado real',
    text: 'Cada módulo cierra con entregables. Sales con portfolio full stack, IA y automatización.',
  },
  {
    id: 4,
    code: '04',
    title: 'Ambiente cercano',
    text: 'Clases en vivo, feedback directo y una comunidad enfocada en practicar, no en teoría vacía.',
  },
  {
    id: 5,
    code: '05',
    title: 'Experiencia útil',
    text: 'Herramientas del mercado: Angular, Laravel, Git, n8n e IA aplicada a productos reales.',
  },
] as const;

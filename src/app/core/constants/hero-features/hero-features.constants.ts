import type { FeatureCard } from '../../models/feature-card/feature-card.model';

export const HERO_FEATURES: readonly FeatureCard[] = [
  {
    title: 'Mentores expertos',
    text: 'Aprende con profesionales que construyen software e IA en producción.',
    icon: 'cap',
  },
  {
    title: 'Programa intensivo',
    text: 'Una ruta clara: programación, IA y automatización de alto nivel.',
    icon: 'doc',
  },
  {
    title: '+10 proyectos reales',
    text: 'Entregables publicables: apps, flujos automatizados y soluciones con IA.',
    icon: 'book',
  },
  {
    title: 'Clases en vivo',
    text: 'Sesiones prácticas, feedback continuo y comunidad enfocada en resultados.',
    icon: 'screen',
  },
] as const;

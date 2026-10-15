import type { FeatureCard } from '../../models/feature-card/feature-card.model';

export const HERO_FEATURES: readonly FeatureCard[] = [
  {
    title: 'Grupos reducidos',
    text: 'Máximo 10 alumnos. Una sesión online a la semana, en directo.',
    icon: 'cap',
  },
  {
    title: 'Varios cursos',
    text: 'De los 7 a los 18 hay varios. Cada edad tiene el suyo: juegos, apps, Python o páginas web.',
    icon: 'doc',
  },
  {
    title: 'Extraescolar',
    text: 'Una clase a la semana, de los 7 a los 18, para quien quiera aprender a programar.',
    icon: 'book',
  },
  {
    title: 'Online en toda España',
    text: 'Entras desde casa y estás en la misma clase, en directo.',
    icon: 'screen',
  },
] as const;

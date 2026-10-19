import type { FeatureCard } from '../../models/feature-card/feature-card.model';

export const HERO_FEATURES: readonly FeatureCard[] = [
  {
    title: 'Grupos reducidos',
    text: 'Máximo 10 alumnos. Una sesión online a la semana, en directo.',
    icon: 'cap',
  },
  {
    title: 'Varios cursos',
    text: 'De los 8 a los 18 hay varios. Cada edad tiene el suyo: Scratch, apps, Arduino, Unity, Python, web o IA.',
    icon: 'doc',
  },
  {
    title: 'Clases todos los días',
    text: 'De lunes a viernes hay grupo: eliges el curso y te toca una sesión semanal, de los 8 a los 18.',
    icon: 'book',
  },
  {
    title: 'Online en toda España',
    text: 'Entras desde casa y estás en la misma clase, en directo.',
    icon: 'screen',
  },
] as const;

import type { NavItem } from '../../models/navigation/navigation.model';

export const PRIMARY_NAV: readonly NavItem[] = [
  {
    label: 'Inicio',
    path: '/',
    exact: true,
  },
  {
    label: 'Cursos',
    path: '/',
    fragment: 'cursos',
  },
  {
    label: 'Horarios',
    path: '/horarios',
  },
] as const;

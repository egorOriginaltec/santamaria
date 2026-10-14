import type { NavItem } from '../../models/navigation/navigation.model';

export const PRIMARY_NAV: readonly NavItem[] = [
  {
    label: 'Cursos',
    path: '/',
    fragment: 'program',
    exact: true,
  },
  {
    label: 'Horarios',
    path: '/horarios',
  },
] as const;

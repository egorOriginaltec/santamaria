import type { NavItem } from '../../models/navigation/navigation.model';

export const PRIMARY_NAV: readonly NavItem[] = [
  {
    label: 'Programa',
    path: '/cursos',
    exact: true,
  },
] as const;

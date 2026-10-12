import type { NavItem } from '../../models/navigation/navigation.model';

export const PRIMARY_NAV: readonly NavItem[] = [
  {
    label: 'Programa',
    path: '/',
    fragment: 'program',
    exact: true,
  },
] as const;

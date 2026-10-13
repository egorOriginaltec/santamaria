import { SWAGGER_DOCS_URL } from '@core/index';

export interface DashboardNavItem {
  readonly id: string;
  readonly label: string;
  readonly path?: string;
  readonly externalUrl?: string;
  readonly icon:
    | 'dashboard'
    | 'students'
    | 'payments'
    | 'courses'
    | 'calendar'
    | 'planner'
    | 'analytics'
    | 'messages'
    | 'settings'
    | 'swagger';
}

export interface DashboardNavGroup {
  readonly title: string;
  readonly items: readonly DashboardNavItem[];
}

export const STUDENT_NAV: readonly DashboardNavGroup[] = [
  {
    title: 'Principal',
    items: [
      { id: 'calendar', label: 'Calendario', path: '/calendario', icon: 'planner' },
    ],
  },
] as const;

export const DASHBOARD_NAV: readonly DashboardNavGroup[] = [
  {
    title: 'Principal',
    items: [
      { id: 'dashboard', label: 'Panel', path: '/dashboard', icon: 'dashboard' },
    ],
  },
  {
    title: 'Gestión',
    items: [
      { id: 'students', label: 'Estudiantes', path: '/dashboard/students', icon: 'students' },
      { id: 'payments', label: 'Pagos', path: '/dashboard/payments', icon: 'payments' },
      { id: 'leads', label: 'Leads', path: '/dashboard/leads', icon: 'messages' },
      { id: 'holidays', label: 'Festivos', path: '/dashboard/holidays', icon: 'calendar' },
      { id: 'courses-manage', label: 'Cursos', path: '/dashboard/courses', icon: 'courses' },
      { id: 'calendar', label: 'Calendario', path: '/dashboard/calendar', icon: 'planner' },
    ],
  },
  {
    title: 'Operaciones',
    items: [
      {
        id: 'swagger',
        label: 'Documentación',
        externalUrl: SWAGGER_DOCS_URL,
        icon: 'swagger',
      },
    ],
  },
] as const;

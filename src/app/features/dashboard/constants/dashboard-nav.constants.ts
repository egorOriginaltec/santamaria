import { SWAGGER_DOCS_URL } from '@core/index';

export interface DashboardNavItem {
  readonly id: string;
  readonly label: string;
  readonly path?: string;
  readonly externalUrl?: string;
  readonly icon:
    | 'dashboard'
    | 'students'
    | 'courses'
    | 'calendar'
    | 'analytics'
    | 'messages'
    | 'settings'
    | 'swagger';
}

export interface DashboardNavGroup {
  readonly title: string;
  readonly items: readonly DashboardNavItem[];
}

export const DASHBOARD_NAV: readonly DashboardNavGroup[] = [
  {
    title: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
      { id: 'students', label: 'Students', path: '/dashboard/students', icon: 'students' },
      { id: 'courses', label: 'Courses', path: '/dashboard/courses', icon: 'courses' },
      { id: 'calendar', label: 'Calendar', path: '/dashboard/calendar', icon: 'calendar' },
      { id: 'analytics', label: 'Analytics', path: '/dashboard/analytics', icon: 'analytics' },
    ],
  },
  {
    title: 'Gestión',
    items: [
      { id: 'leads', label: 'Leads', path: '/dashboard/leads', icon: 'messages' },
      { id: 'holidays', label: 'Festivos', path: '/dashboard/holidays', icon: 'calendar' },
      { id: 'courses-manage', label: 'Cursos', path: '/dashboard/courses', icon: 'courses' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { id: 'settings', label: 'Settings', path: '/dashboard/settings', icon: 'settings' },
      {
        id: 'swagger',
        label: 'API Docs',
        externalUrl: SWAGGER_DOCS_URL,
        icon: 'swagger',
      },
    ],
  },
] as const;

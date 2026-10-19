import { SWAGGER_DOCS_URL } from '@core/index';

export interface DashboardNavItem {
  readonly id: string;
  readonly label: string;
  readonly path?: string;
  readonly externalUrl?: string;
  readonly icon:
    | 'dashboard'
    | 'students'
    | 'subscriptions'
    | 'payments'
    | 'courses'
    | 'calendar'
    | 'planner'
    | 'analytics'
    | 'messages'
    | 'settings'
    | 'swagger'
    | 'calculator';
}

export interface DashboardNavGroup {
  readonly title: string;
  readonly items: readonly DashboardNavItem[];
}

export const STUDENT_NAV: readonly DashboardNavGroup[] = [
  {
    title: 'Principal',
    items: [
      { id: 'home', label: 'Inicio', path: '/alumno', icon: 'dashboard' },
      { id: 'calendar', label: 'Calendario', path: '/alumno/calendario', icon: 'planner' },
      { id: 'classes', label: 'Contenido', path: '/alumno/contenido', icon: 'courses' },
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
      { id: 'students', label: 'Estudiantes', path: '/dashboard/estudiantes', icon: 'students' },
      {
        id: 'subscriptions',
        label: 'Suscripciones',
        path: '/dashboard/suscripciones',
        icon: 'subscriptions',
      },
      { id: 'payments', label: 'Pagos', path: '/dashboard/pagos', icon: 'payments' },
      { id: 'leads', label: 'Contactos', path: '/dashboard/contactos', icon: 'messages' },
    ],
  },
  {
    title: 'Learn',
    items: [
      { id: 'courses-manage', label: 'Cursos', path: '/dashboard/cursos', icon: 'courses' },
      { id: 'exercise-results', label: 'Resultados', path: '/dashboard/resultados', icon: 'analytics' },
      { id: 'holidays', label: 'Festivos', path: '/dashboard/festivos', icon: 'calendar' },
    ],
  },
  {
    title: 'Operaciones',
    items: [
      { id: 'calculator', label: 'Calculadora', path: '/dashboard/calculadora', icon: 'calculator' },
      {
        id: 'swagger',
        label: 'Documentación',
        externalUrl: SWAGGER_DOCS_URL,
        icon: 'swagger',
      },
    ],
  },
] as const;

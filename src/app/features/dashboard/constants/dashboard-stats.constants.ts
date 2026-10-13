export interface DashboardStat {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly delta: string;
  readonly trend: 'up' | 'down';
  readonly accent: string;
}

export const DASHBOARD_STATS: readonly DashboardStat[] = [
  {
    id: 'students',
    label: 'Students',
    value: '128',
    delta: '+12%',
    trend: 'up',
    accent: '#22c55e',
  },
  {
    id: 'enrollments',
    label: 'Enrollments',
    value: '46',
    delta: '-8%',
    trend: 'down',
    accent: '#ef4444',
  },
  {
    id: 'revenue',
    label: 'Revenue',
    value: '€62.4k',
    delta: '+18%',
    trend: 'up',
    accent: '#5751e1',
  },
  {
    id: 'completion',
    label: 'Completion',
    value: '91%',
    delta: '+5%',
    trend: 'up',
    accent: '#f59e0b',
  },
] as const;

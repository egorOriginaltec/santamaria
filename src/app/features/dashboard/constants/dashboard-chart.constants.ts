export interface ChartPoint {
  readonly label: string;
  readonly current: number;
  readonly previous: number;
}

export const DASHBOARD_REVENUE_POINTS: readonly ChartPoint[] = [
  { label: 'Mon', current: 42, previous: 38 },
  { label: 'Tue', current: 55, previous: 44 },
  { label: 'Wed', current: 48, previous: 51 },
  { label: 'Thu', current: 68, previous: 49 },
  { label: 'Fri', current: 61, previous: 57 },
  { label: 'Sat', current: 74, previous: 60 },
  { label: 'Sun', current: 58, previous: 52 },
] as const;

export const DASHBOARD_REVENUE_TITLE = 'Weekly activity';
export const DASHBOARD_REVENUE_HINT = 'Live sessions and project submissions';

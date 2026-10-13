export interface EnrollmentSlice {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  readonly color: string;
}

export const DASHBOARD_ENROLLMENT_TOTAL = '€834';

export const DASHBOARD_ENROLLMENT_SLICES: readonly EnrollmentSlice[] = [
  { id: 'direct', label: 'Direct', value: 34, color: '#5751e1' },
  { id: 'referral', label: 'Referral', value: 26, color: '#f97316' },
  { id: 'social', label: 'Social', value: 22, color: '#06b6d4' },
  { id: 'partners', label: 'Partners', value: 18, color: '#ec4899' },
] as const;

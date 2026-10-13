export interface RecentStudentRow {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly course: string;
  readonly joinedAt: string;
  readonly status: 'active' | 'pending' | 'completed';
  readonly amount: string;
}

export const DASHBOARD_RECENT_STUDENTS: readonly RecentStudentRow[] = [
  {
    id: '1',
    name: 'Laura Méndez',
    email: 'laura.mendez@email.com',
    course: 'Full Stack + IA',
    joinedAt: '12 Oct 2026',
    status: 'active',
    amount: '1.350 €',
  },
  {
    id: '2',
    name: 'Carlos Ruiz',
    email: 'carlos.ruiz@email.com',
    course: 'Full Stack + IA',
    joinedAt: '11 Oct 2026',
    status: 'pending',
    amount: '375 €',
  },
  {
    id: '3',
    name: 'Ana Torres',
    email: 'ana.torres@email.com',
    course: 'Automation Track',
    joinedAt: '09 Oct 2026',
    status: 'active',
    amount: '1.350 €',
  },
  {
    id: '4',
    name: 'Diego Navarro',
    email: 'diego.navarro@email.com',
    course: 'Full Stack + IA',
    joinedAt: '07 Oct 2026',
    status: 'completed',
    amount: '1.350 €',
  },
  {
    id: '5',
    name: 'Sofía Vega',
    email: 'sofia.vega@email.com',
    course: 'AI Products',
    joinedAt: '05 Oct 2026',
    status: 'active',
    amount: '375 €',
  },
] as const;

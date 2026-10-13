import { Routes } from '@angular/router';
import { DashboardLayout } from '@features/dashboard/layout/dashboard-layout';
import { DashboardCalendar } from '@features/dashboard/pages/calendar/calendar';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    component: DashboardLayout,
    children: [
      { path: '', component: DashboardCalendar, title: 'Calendario · Santamaria Bootcaps', data: { student: true } },
    ],
  },
];

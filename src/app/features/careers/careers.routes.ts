import { Routes } from '@angular/router';

export const CAREERS_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/careers/careers').then((m) => m.CareersPage),
    title: 'Trabaja con nosotros · Santamaria Learn',
  },
];

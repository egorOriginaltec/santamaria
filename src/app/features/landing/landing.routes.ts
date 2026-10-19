import { Routes } from '@angular/router';

export const LANDING_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing').then((m) => m.Landing),
    title: 'Santamaria Learn · Cursos de programación online para niños y jóvenes',
  },
  {
    path: 'horarios',
    loadComponent: () => import('./pages/schedule/schedule').then((m) => m.SchedulePage),
    title: 'Horarios y precios · Santamaria Learn',
  },
  {
    path: 'precios',
    redirectTo: 'horarios',
    pathMatch: 'full',
  },
  {
    path: 'cursos/:slug',
    loadComponent: () => import('./pages/course/course').then((m) => m.CoursePage),
    title: 'Cursos · Santamaria Learn',
  },
];

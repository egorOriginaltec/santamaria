import { Routes } from '@angular/router';
import { CoursePage } from './pages/course/course';
import { Landing } from './pages/landing/landing';
import { SchedulePage } from './pages/schedule/schedule';

export const LANDING_ROUTES: Routes = [
  {
    path: '',
    component: Landing,
    title: 'Santamaria Club · Programación + IA',
  },
  {
    path: 'horarios',
    component: SchedulePage,
    title: 'Horarios y precios · Santamaria Club',
  },
  {
    path: 'precios',
    redirectTo: 'horarios',
    pathMatch: 'full',
  },
  {
    path: 'cursos/:slug',
    component: CoursePage,
    title: 'Curso · Santamaria Club',
  },
];

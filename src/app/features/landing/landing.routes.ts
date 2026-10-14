import { Routes } from '@angular/router';
import { CoursePage } from './pages/course/course';
import { Landing } from './pages/landing/landing';

export const LANDING_ROUTES: Routes = [
  {
    path: '',
    component: Landing,
    title: 'Santamaria Bootcaps · Programación + IA',
  },
  {
    path: 'cursos/:slug',
    component: CoursePage,
    title: 'Curso · Santamaria Bootcaps',
  },
];

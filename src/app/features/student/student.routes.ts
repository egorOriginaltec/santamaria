import { Routes } from '@angular/router';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/student-layout').then((m) => m.StudentLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/student-home').then((m) => m.StudentHome),
        title: 'Campus · Santamaria Learn',
      },
      {
        path: 'calendario',
        loadComponent: () =>
          import('./pages/calendar/student-calendar').then((m) => m.StudentCalendar),
        title: 'Calendario · Santamaria Learn',
      },
      {
        path: 'contenido',
        loadComponent: () =>
          import('./pages/classes/student-classes').then((m) => m.StudentClasses),
        title: 'Contenido · Santamaria Learn',
      },
      {
        path: 'ejercicios/:uuid',
        loadComponent: () =>
          import('./pages/exercise-take/student-exercise-take').then(
            (m) => m.StudentExerciseTake,
          ),
        title: 'Ejercicio · Santamaria Learn',
      },

      // Legacy EN → ES
      { path: 'calendar', redirectTo: 'calendario', pathMatch: 'full' },
      { path: 'classes', redirectTo: 'contenido', pathMatch: 'full' },
      { path: 'clases', redirectTo: 'contenido', pathMatch: 'full' },
      { path: 'exercises', redirectTo: 'calendario', pathMatch: 'full' },
      { path: 'ejercicios', redirectTo: 'calendario', pathMatch: 'full' },
      { path: 'exercises/:uuid', redirectTo: 'ejercicios/:uuid' },
    ],
  },
];

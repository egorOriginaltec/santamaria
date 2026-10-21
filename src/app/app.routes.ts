import { Routes } from '@angular/router';
import { adminGuard } from '@core/guards/admin.guard';
import { studentGuard } from '@core/guards/student.guard';
import { MainLayout } from '@layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@features/landing/landing.routes').then((m) => m.LANDING_ROUTES),
      },
      {
        path: 'contacto',
        loadChildren: () =>
          import('@features/contact/contact.routes').then((m) => m.CONTACT_ROUTES),
      },
      {
        path: 'trabaja-con-nosotros',
        loadChildren: () =>
          import('@features/careers/careers.routes').then((m) => m.CAREERS_ROUTES),
      },
      {
        path: 'acceso',
        loadChildren: () =>
          import('@features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
      },
      {
        path: 'legal',
        loadChildren: () =>
          import('@features/legal/legal.routes').then((m) => m.LEGAL_ROUTES),
      },
      // Legacy English paths
      { path: 'contact', redirectTo: 'contacto', pathMatch: 'full' },
      { path: 'careers', redirectTo: 'trabaja-con-nosotros', pathMatch: 'full' },
      { path: 'empleo', redirectTo: 'trabaja-con-nosotros', pathMatch: 'full' },
      { path: 'login', redirectTo: 'acceso', pathMatch: 'full' },
      { path: 'horario', redirectTo: 'horarios', pathMatch: 'full' },
      { path: 'terminos', redirectTo: 'legal/terminos', pathMatch: 'full' },
      { path: 'privacidad', redirectTo: 'legal/privacidad', pathMatch: 'full' },
      { path: 'cookies', redirectTo: 'legal/cookies', pathMatch: 'full' },
      { path: 'politica-de-privacidad', redirectTo: 'legal/privacidad', pathMatch: 'full' },
      { path: 'politica-de-cookies', redirectTo: 'legal/cookies', pathMatch: 'full' },
    ],
  },
  {
    path: 'dashboard',
    canActivate: [adminGuard],
    loadChildren: () =>
      import('@features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
  },
  {
    path: 'alumno',
    canActivate: [studentGuard],
    loadChildren: () => import('@features/student/student.routes').then((m) => m.STUDENT_ROUTES),
  },
  {
    path: 'student',
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/alumno' },
      { path: 'calendar', redirectTo: '/alumno/calendario' },
      { path: 'calendario', redirectTo: '/alumno/calendario' },
      { path: 'contenido', redirectTo: '/alumno/contenido' },
      { path: 'classes', redirectTo: '/alumno/contenido' },
      { path: 'clases', redirectTo: '/alumno/contenido' },
      { path: 'exercises', redirectTo: '/alumno/calendario' },
      { path: 'ejercicios', redirectTo: '/alumno/calendario' },
      { path: 'exercises/:uuid', redirectTo: '/alumno/ejercicios/:uuid' },
      { path: 'ejercicios/:uuid', redirectTo: '/alumno/ejercicios/:uuid' },
    ],
  },
  { path: 'calendario', redirectTo: '/alumno/calendario', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

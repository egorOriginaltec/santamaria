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
    path: 'student',
    canActivate: [studentGuard],
    loadChildren: () => import('@features/student/student.routes').then((m) => m.STUDENT_ROUTES),
  },
  {
    path: 'alumno',
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/student' },
      { path: 'calendar', redirectTo: '/student/calendar' },
      { path: 'calendario', redirectTo: '/student/calendar' },
      { path: 'contenido', redirectTo: '/student/contenido' },
      { path: 'classes', redirectTo: '/student/contenido' },
      { path: 'clases', redirectTo: '/student/contenido' },
      { path: 'exercises', redirectTo: '/student/calendar' },
      { path: 'ejercicios', redirectTo: '/student/calendar' },
    ],
  },
  { path: 'calendario', redirectTo: '/student/calendar', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

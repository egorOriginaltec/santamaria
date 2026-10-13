import { Routes } from '@angular/router';
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
        path: 'contact',
        loadChildren: () =>
          import('@features/contact/contact.routes').then((m) => m.CONTACT_ROUTES),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('@features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
      },
      // Legacy Spanish paths
      { path: 'contacto', redirectTo: 'contact', pathMatch: 'full' },
      { path: 'acceso', redirectTo: 'login', pathMatch: 'full' },
    ],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
  },
  { path: '**', redirectTo: '' },
];

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
        path: 'contacto',
        loadChildren: () =>
          import('@features/contact/contact.routes').then((m) => m.CONTACT_ROUTES),
      },
      {
        path: 'acceso',
        loadChildren: () =>
          import('@features/auth/auth.routes').then((m) => m.AUTH_ROUTES),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

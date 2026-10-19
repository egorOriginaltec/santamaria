import { Routes } from '@angular/router';

export const CONTACT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact),
    title: 'Contacto e inscripción · Santamaria Learn',
  },
];

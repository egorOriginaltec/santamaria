import { Routes } from '@angular/router';

export const LEGAL_ROUTES: Routes = [
  {
    path: ':slug',
    loadComponent: () =>
      import('./pages/legal-document/legal-document').then((m) => m.LegalDocumentPage),
    title: 'Aviso legal · Santamaria Learn',
  },
  {
    path: '',
    redirectTo: 'terminos',
    pathMatch: 'full',
  },
];

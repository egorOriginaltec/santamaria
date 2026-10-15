import { Routes } from '@angular/router';
import { LegalDocumentPage } from './pages/legal-document/legal-document';

export const LEGAL_ROUTES: Routes = [
  {
    path: ':slug',
    component: LegalDocumentPage,
    title: 'Legal · Santamaria Club',
  },
  {
    path: '',
    redirectTo: 'terminos',
    pathMatch: 'full',
  },
];

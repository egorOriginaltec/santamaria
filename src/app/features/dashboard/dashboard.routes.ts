import { Routes } from '@angular/router';
import { DashboardCalculator } from './pages/calculator/calculator';

import { DashboardCalendar } from './pages/calendar/calendar';
import { DashboardLayout } from './layout/dashboard-layout';
import { DashboardCourseClasses } from './pages/course-classes/course-classes';
import { DashboardCourseForm } from './pages/course-form/course-form';
import { DashboardCourses } from './pages/courses/courses';
import { DashboardHome } from './pages/dashboard-home/dashboard-home';
import { DashboardHolidayForm } from './pages/holiday-form/holiday-form';
import { DashboardHolidays } from './pages/holidays/holidays';
import { DashboardLeads } from './pages/leads/leads';
import { DashboardPaymentForm } from './pages/payment-form/payment-form';
import { DashboardPayments } from './pages/payments/payments';
import { DashboardStudentForm } from './pages/student-form/student-form';
import { DashboardStudents } from './pages/students/students';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardLayout,
    children: [
      {
        path: '',
        component: DashboardHome,
        title: 'Panel · Santamaria Bootcaps',
      },
      {
        path: 'students',
        component: DashboardStudents,
        title: 'Estudiantes · Santamaria Bootcaps',
      },
      {
        path: 'students/new',
        component: DashboardStudentForm,
        title: 'Nuevo estudiante · Santamaria Bootcaps',
      },
      {
        path: 'students/:uuid/edit',
        component: DashboardStudentForm,
        title: 'Editar estudiante · Santamaria Bootcaps',
      },
      { path: 'students/nuevo', redirectTo: 'students/new', pathMatch: 'full' },
      { path: 'students/:uuid/editar', redirectTo: 'students/:uuid/edit' },
      {
        path: 'payments',
        component: DashboardPayments,
        title: 'Pagos · Santamaria Bootcaps',
      },
      {
        path: 'payments/new',
        component: DashboardPaymentForm,
        title: 'Nuevo pago · Santamaria Bootcaps',
      },
      {
        path: 'payments/:uuid/edit',
        component: DashboardPaymentForm,
        title: 'Editar pago · Santamaria Bootcaps',
      },
      { path: 'payments/nuevo', redirectTo: 'payments/new', pathMatch: 'full' },
      { path: 'payments/:uuid/editar', redirectTo: 'payments/:uuid/edit' },
      {
        path: 'courses',
        component: DashboardCourses,
        title: 'Cursos · Santamaria Bootcaps',
      },
      {
        path: 'courses/new',
        component: DashboardCourseForm,
        title: 'Nuevo curso · Santamaria Bootcaps',
      },
      {
        path: 'courses/:uuid/edit',
        component: DashboardCourseForm,
        title: 'Editar curso · Santamaria Bootcaps',
      },
      {
        path: 'calendar',
        component: DashboardCalendar,
        title: 'Calendario · Santamaria Bootcaps',
      },
      { path: 'calendario', redirectTo: 'calendar', pathMatch: 'full' },
      {
        path: 'calculator',
        component: DashboardCalculator,
        title: 'Calculadora · Santamaria Bootcaps',
      },
      { path: 'calculadora', redirectTo: 'calculator', pathMatch: 'full' },
      { path: 'courses/nuevo', redirectTo: 'courses/new', pathMatch: 'full' },
      { path: 'courses/:uuid/editar', redirectTo: 'courses/:uuid/edit' },
      {
        path: 'leads',
        component: DashboardLeads,
        title: 'Leads · Santamaria Bootcaps',
      },
      {
        path: 'messages',
        redirectTo: 'leads',
        pathMatch: 'full',
      },
      {
        path: 'holidays',
        component: DashboardHolidays,
        title: 'Festivos · Santamaria Bootcaps',
      },
      {
        path: 'holidays/new',
        component: DashboardHolidayForm,
        title: 'Nuevo festivo · Santamaria Bootcaps',
      },
      {
        path: 'holidays/:uuid/edit',
        component: DashboardHolidayForm,
        title: 'Editar festivo · Santamaria Bootcaps',
      },
      { path: 'holidays/nuevo', redirectTo: 'holidays/new', pathMatch: 'full' },
      { path: 'holidays/:uuid/editar', redirectTo: 'holidays/:uuid/edit' },
    ],
  },
];

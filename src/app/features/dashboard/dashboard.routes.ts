import { Routes } from '@angular/router';
import { DashboardCalculator } from './pages/calculator/calculator';
import { DashboardLayout } from './layout/dashboard-layout';
import { DashboardCourseClasses } from './pages/course-classes/course-classes';
import { DashboardCourseExercises } from './pages/course-exercises/course-exercises';
import { DashboardCourseForm } from './pages/course-form/course-form';
import { DashboardCourses } from './pages/courses/courses';
import { DashboardExerciseForm } from './pages/exercise-form/exercise-form';
import { DashboardExerciseResults } from './pages/exercise-results/exercise-results';
import { DashboardHome } from './pages/dashboard-home/dashboard-home';
import { DashboardHolidayForm } from './pages/holiday-form/holiday-form';
import { DashboardHolidays } from './pages/holidays/holidays';
import { DashboardLeads } from './pages/leads/leads';
import { DashboardPaymentForm } from './pages/payment-form/payment-form';
import { DashboardPayments } from './pages/payments/payments';
import { DashboardStudentForm } from './pages/student-form/student-form';
import { DashboardStudents } from './pages/students/students';
import { DashboardSubscriptionForm } from './pages/subscription-form/subscription-form';
import { DashboardSubscriptions } from './pages/subscriptions/subscriptions';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardLayout,
    children: [
      {
        path: '',
        component: DashboardHome,
        title: 'Panel · Santamaria Club',
      },
      {
        path: 'students',
        component: DashboardStudents,
        title: 'Estudiantes · Santamaria Club',
      },
      {
        path: 'students/new',
        component: DashboardStudentForm,
        title: 'Nuevo estudiante · Santamaria Club',
      },
      {
        path: 'students/:uuid/edit',
        component: DashboardStudentForm,
        title: 'Editar estudiante · Santamaria Club',
      },
      { path: 'students/nuevo', redirectTo: 'students/new', pathMatch: 'full' },
      { path: 'students/:uuid/editar', redirectTo: 'students/:uuid/edit' },
      {
        path: 'subscriptions',
        component: DashboardSubscriptions,
        title: 'Suscripciones · Santamaria Club',
      },
      {
        path: 'subscriptions/new',
        component: DashboardSubscriptionForm,
        title: 'Nueva suscripción · Santamaria Club',
      },
      {
        path: 'subscriptions/:uuid/edit',
        component: DashboardSubscriptionForm,
        title: 'Editar suscripción · Santamaria Club',
      },
      { path: 'subscriptions/nuevo', redirectTo: 'subscriptions/new', pathMatch: 'full' },
      { path: 'subscriptions/:uuid/editar', redirectTo: 'subscriptions/:uuid/edit' },
      {
        path: 'payments',
        component: DashboardPayments,
        title: 'Pagos · Santamaria Club',
      },
      {
        path: 'payments/new',
        component: DashboardPaymentForm,
        title: 'Nuevo pago · Santamaria Club',
      },
      {
        path: 'payments/:uuid/edit',
        component: DashboardPaymentForm,
        title: 'Editar pago · Santamaria Club',
      },
      { path: 'payments/nuevo', redirectTo: 'payments/new', pathMatch: 'full' },
      { path: 'payments/:uuid/editar', redirectTo: 'payments/:uuid/edit' },
      {
        path: 'courses',
        component: DashboardCourses,
        title: 'Cursos · Santamaria Club',
      },
      {
        path: 'courses/new',
        component: DashboardCourseForm,
        title: 'Nuevo curso · Santamaria Club',
      },
      {
        path: 'courses/:uuid/edit',
        component: DashboardCourseForm,
        title: 'Editar curso · Santamaria Club',
      },
      {
        path: 'courses/:uuid/classes',
        component: DashboardCourseClasses,
        title: 'Clases · Santamaria Club',
      },
      {
        path: 'courses/:uuid/exercises',
        component: DashboardCourseExercises,
        title: 'Ejercicios · Santamaria Club',
      },
      {
        path: 'courses/:uuid/exercises/new',
        component: DashboardExerciseForm,
        title: 'Nuevo ejercicio · Santamaria Club',
      },
      {
        path: 'courses/:uuid/exercises/:exerciseUuid/edit',
        component: DashboardExerciseForm,
        title: 'Editar ejercicio · Santamaria Club',
      },
      {
        path: 'exercise-results',
        component: DashboardExerciseResults,
        title: 'Resultados · Santamaria Club',
      },
      { path: 'resultados', redirectTo: 'exercise-results', pathMatch: 'full' },
      {
        path: 'calculator',
        component: DashboardCalculator,
        title: 'Calculadora · Santamaria Club',
      },
      { path: 'calculadora', redirectTo: 'calculator', pathMatch: 'full' },
      { path: 'courses/nuevo', redirectTo: 'courses/new', pathMatch: 'full' },
      { path: 'courses/:uuid/editar', redirectTo: 'courses/:uuid/edit' },
      {
        path: 'leads',
        component: DashboardLeads,
        title: 'Leads · Santamaria Club',
      },
      {
        path: 'messages',
        redirectTo: 'leads',
        pathMatch: 'full',
      },
      {
        path: 'holidays',
        component: DashboardHolidays,
        title: 'Festivos · Santamaria Club',
      },
      {
        path: 'holidays/new',
        component: DashboardHolidayForm,
        title: 'Nuevo festivo · Santamaria Club',
      },
      {
        path: 'holidays/:uuid/edit',
        component: DashboardHolidayForm,
        title: 'Editar festivo · Santamaria Club',
      },
      { path: 'holidays/nuevo', redirectTo: 'holidays/new', pathMatch: 'full' },
      { path: 'holidays/:uuid/editar', redirectTo: 'holidays/:uuid/edit' },
    ],
  },
];

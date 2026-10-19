import { Routes } from '@angular/router';

const loadLayout = () =>
  import('./layout/dashboard-layout').then((m) => m.DashboardLayout);

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: loadLayout,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/dashboard-home/dashboard-home').then((m) => m.DashboardHome),
        title: 'Panel · Santamaria Learn',
      },

      {
        path: 'estudiantes',
        loadComponent: () =>
          import('./pages/students/students').then((m) => m.DashboardStudents),
        title: 'Estudiantes · Santamaria Learn',
      },
      {
        path: 'estudiantes/nuevo',
        loadComponent: () =>
          import('./pages/student-form/student-form').then((m) => m.DashboardStudentForm),
        title: 'Nuevo estudiante · Santamaria Learn',
      },
      {
        path: 'estudiantes/:uuid/editar',
        loadComponent: () =>
          import('./pages/student-form/student-form').then((m) => m.DashboardStudentForm),
        title: 'Editar estudiante · Santamaria Learn',
      },

      {
        path: 'suscripciones',
        loadComponent: () =>
          import('./pages/subscriptions/subscriptions').then((m) => m.DashboardSubscriptions),
        title: 'Suscripciones · Santamaria Learn',
      },
      {
        path: 'suscripciones/nuevo',
        loadComponent: () =>
          import('./pages/subscription-form/subscription-form').then(
            (m) => m.DashboardSubscriptionForm,
          ),
        title: 'Nueva suscripción · Santamaria Learn',
      },
      {
        path: 'suscripciones/:uuid/editar',
        loadComponent: () =>
          import('./pages/subscription-form/subscription-form').then(
            (m) => m.DashboardSubscriptionForm,
          ),
        title: 'Editar suscripción · Santamaria Learn',
      },

      {
        path: 'pagos',
        loadComponent: () =>
          import('./pages/payments/payments').then((m) => m.DashboardPayments),
        title: 'Pagos · Santamaria Learn',
      },
      {
        path: 'pagos/nuevo',
        loadComponent: () =>
          import('./pages/payment-form/payment-form').then((m) => m.DashboardPaymentForm),
        title: 'Nuevo pago · Santamaria Learn',
      },
      {
        path: 'pagos/:uuid/editar',
        loadComponent: () =>
          import('./pages/payment-form/payment-form').then((m) => m.DashboardPaymentForm),
        title: 'Editar pago · Santamaria Learn',
      },

      {
        path: 'cursos',
        loadComponent: () =>
          import('./pages/courses/courses').then((m) => m.DashboardCourses),
        title: 'Cursos · Santamaria Learn',
      },
      {
        path: 'cursos/nuevo',
        loadComponent: () =>
          import('./pages/course-form/course-form').then((m) => m.DashboardCourseForm),
        title: 'Nuevo curso · Santamaria Learn',
      },
      {
        path: 'cursos/:uuid/editar',
        loadComponent: () =>
          import('./pages/course-form/course-form').then((m) => m.DashboardCourseForm),
        title: 'Editar curso · Santamaria Learn',
      },
      {
        path: 'cursos/:uuid/clases',
        loadComponent: () =>
          import('./pages/course-classes/course-classes').then((m) => m.DashboardCourseClasses),
        title: 'Clases · Santamaria Learn',
      },
      {
        path: 'cursos/:uuid/ejercicios',
        loadComponent: () =>
          import('./pages/course-exercises/course-exercises').then(
            (m) => m.DashboardCourseExercises,
          ),
        title: 'Ejercicios · Santamaria Learn',
      },
      {
        path: 'cursos/:uuid/ejercicios/nuevo',
        loadComponent: () =>
          import('./pages/exercise-form/exercise-form').then((m) => m.DashboardExerciseForm),
        title: 'Nuevo ejercicio · Santamaria Learn',
      },
      {
        path: 'cursos/:uuid/ejercicios/:exerciseUuid/editar',
        loadComponent: () =>
          import('./pages/exercise-form/exercise-form').then((m) => m.DashboardExerciseForm),
        title: 'Editar ejercicio · Santamaria Learn',
      },

      {
        path: 'resultados',
        loadComponent: () =>
          import('./pages/exercise-results/exercise-results').then(
            (m) => m.DashboardExerciseResults,
          ),
        title: 'Resultados · Santamaria Learn',
      },
      {
        path: 'resultados/:uuid',
        loadComponent: () =>
          import('./pages/exercise-result-detail/exercise-result-detail').then(
            (m) => m.DashboardExerciseResultDetail,
          ),
        title: 'Detalle resultado · Santamaria Learn',
      },

      {
        path: 'calculadora',
        loadComponent: () =>
          import('./pages/calculator/calculator').then((m) => m.DashboardCalculator),
        title: 'Calculadora · Santamaria Learn',
      },

      {
        path: 'contactos',
        loadComponent: () => import('./pages/leads/leads').then((m) => m.DashboardLeads),
        title: 'Contactos · Santamaria Learn',
      },

      {
        path: 'festivos',
        loadComponent: () =>
          import('./pages/holidays/holidays').then((m) => m.DashboardHolidays),
        title: 'Festivos · Santamaria Learn',
      },
      {
        path: 'festivos/nuevo',
        loadComponent: () =>
          import('./pages/holiday-form/holiday-form').then((m) => m.DashboardHolidayForm),
        title: 'Nuevo festivo · Santamaria Learn',
      },
      {
        path: 'festivos/:uuid/editar',
        loadComponent: () =>
          import('./pages/holiday-form/holiday-form').then((m) => m.DashboardHolidayForm),
        title: 'Editar festivo · Santamaria Learn',
      },

      // Legacy EN → ES
      { path: 'students', redirectTo: 'estudiantes', pathMatch: 'full' },
      { path: 'students/new', redirectTo: 'estudiantes/nuevo', pathMatch: 'full' },
      { path: 'students/nuevo', redirectTo: 'estudiantes/nuevo', pathMatch: 'full' },
      { path: 'students/:uuid/edit', redirectTo: 'estudiantes/:uuid/editar' },
      { path: 'students/:uuid/editar', redirectTo: 'estudiantes/:uuid/editar' },

      { path: 'subscriptions', redirectTo: 'suscripciones', pathMatch: 'full' },
      { path: 'subscriptions/new', redirectTo: 'suscripciones/nuevo', pathMatch: 'full' },
      { path: 'subscriptions/nuevo', redirectTo: 'suscripciones/nuevo', pathMatch: 'full' },
      { path: 'subscriptions/:uuid/edit', redirectTo: 'suscripciones/:uuid/editar' },
      { path: 'subscriptions/:uuid/editar', redirectTo: 'suscripciones/:uuid/editar' },

      { path: 'payments', redirectTo: 'pagos', pathMatch: 'full' },
      { path: 'payments/new', redirectTo: 'pagos/nuevo', pathMatch: 'full' },
      { path: 'payments/nuevo', redirectTo: 'pagos/nuevo', pathMatch: 'full' },
      { path: 'payments/:uuid/edit', redirectTo: 'pagos/:uuid/editar' },
      { path: 'payments/:uuid/editar', redirectTo: 'pagos/:uuid/editar' },

      { path: 'courses', redirectTo: 'cursos', pathMatch: 'full' },
      { path: 'courses/new', redirectTo: 'cursos/nuevo', pathMatch: 'full' },
      { path: 'courses/nuevo', redirectTo: 'cursos/nuevo', pathMatch: 'full' },
      { path: 'courses/:uuid/edit', redirectTo: 'cursos/:uuid/editar' },
      { path: 'courses/:uuid/editar', redirectTo: 'cursos/:uuid/editar' },
      { path: 'courses/:uuid/classes', redirectTo: 'cursos/:uuid/clases' },
      { path: 'courses/:uuid/exercises', redirectTo: 'cursos/:uuid/ejercicios' },
      { path: 'courses/:uuid/exercises/new', redirectTo: 'cursos/:uuid/ejercicios/nuevo' },
      {
        path: 'courses/:uuid/exercises/:exerciseUuid/edit',
        redirectTo: 'cursos/:uuid/ejercicios/:exerciseUuid/editar',
      },

      { path: 'exercise-results', redirectTo: 'resultados', pathMatch: 'full' },
      { path: 'exercise-results/:uuid', redirectTo: 'resultados/:uuid' },

      { path: 'calculator', redirectTo: 'calculadora', pathMatch: 'full' },

      { path: 'leads', redirectTo: 'contactos', pathMatch: 'full' },
      { path: 'messages', redirectTo: 'contactos', pathMatch: 'full' },

      { path: 'holidays', redirectTo: 'festivos', pathMatch: 'full' },
      { path: 'holidays/new', redirectTo: 'festivos/nuevo', pathMatch: 'full' },
      { path: 'holidays/nuevo', redirectTo: 'festivos/nuevo', pathMatch: 'full' },
      { path: 'holidays/:uuid/edit', redirectTo: 'festivos/:uuid/editar' },
      { path: 'holidays/:uuid/editar', redirectTo: 'festivos/:uuid/editar' },
    ],
  },
];

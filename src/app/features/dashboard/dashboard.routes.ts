import { Routes } from '@angular/router';
import { DashboardLayout } from './layout/dashboard-layout';
import { DashboardCourseForm } from './pages/course-form/course-form';
import { DashboardCourses } from './pages/courses/courses';
import { DashboardHome } from './pages/dashboard-home/dashboard-home';
import { DashboardHolidayForm } from './pages/holiday-form/holiday-form';
import { DashboardHolidays } from './pages/holidays/holidays';
import { DashboardLeads } from './pages/leads/leads';
import { DashboardSectionPage } from './pages/section-page/section-page';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardLayout,
    children: [
      {
        path: '',
        component: DashboardHome,
        title: 'Dashboard · Santamaria Bootcaps',
      },
      {
        path: 'students',
        component: DashboardSectionPage,
        title: 'Students · Santamaria Bootcaps',
        data: {
          title: 'Students',
          description: 'Manage enrolled students, roles and progress across cohorts.',
        },
      },
      {
        path: 'courses',
        component: DashboardCourses,
        title: 'Courses · Santamaria Bootcaps',
      },
      {
        path: 'courses/new',
        component: DashboardCourseForm,
        title: 'New course · Santamaria Bootcaps',
      },
      {
        path: 'courses/:uuid/edit',
        component: DashboardCourseForm,
        title: 'Edit course · Santamaria Bootcaps',
      },
      { path: 'courses/nuevo', redirectTo: 'courses/new', pathMatch: 'full' },
      { path: 'courses/:uuid/editar', redirectTo: 'courses/:uuid/edit' },
      {
        path: 'calendar',
        component: DashboardSectionPage,
        title: 'Calendar · Santamaria Bootcaps',
        data: {
          title: 'Calendar',
          description: 'Track live sessions, project milestones and exams.',
        },
      },
      {
        path: 'analytics',
        component: DashboardSectionPage,
        title: 'Analytics · Santamaria Bootcaps',
        data: {
          title: 'Analytics',
          description: 'Deep-dive metrics for enrollment, retention and revenue.',
        },
      },
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
        title: 'Holidays · Santamaria Bootcaps',
      },
      {
        path: 'holidays/new',
        component: DashboardHolidayForm,
        title: 'New holiday · Santamaria Bootcaps',
      },
      {
        path: 'holidays/:uuid/edit',
        component: DashboardHolidayForm,
        title: 'Edit holiday · Santamaria Bootcaps',
      },
      { path: 'holidays/nuevo', redirectTo: 'holidays/new', pathMatch: 'full' },
      { path: 'holidays/:uuid/editar', redirectTo: 'holidays/:uuid/edit' },
      {
        path: 'settings',
        component: DashboardSectionPage,
        title: 'Settings · Santamaria Bootcaps',
        data: {
          title: 'Settings',
          description: 'Workspace preferences, billing and access controls.',
        },
      },
    ],
  },
];

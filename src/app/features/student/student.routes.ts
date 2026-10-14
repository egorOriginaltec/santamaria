import { Routes } from '@angular/router';
import { StudentLayout } from './layout/student-layout';
import { StudentCalendar } from './pages/calendar/student-calendar';
import { StudentClasses } from './pages/classes/student-classes';
import { StudentHome } from './pages/home/student-home';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    component: StudentLayout,
    children: [
      { path: '', component: StudentHome, title: 'Home · Santamaria' },
      { path: 'calendar', component: StudentCalendar, title: 'Calendar · Santamaria' },
      { path: 'classes', component: StudentClasses, title: 'Classes · Santamaria' },
      { path: 'calendario', redirectTo: 'calendar', pathMatch: 'full' },
      { path: 'clases', redirectTo: 'classes', pathMatch: 'full' },
    ],
  },
];

import { Routes } from '@angular/router';
import { StudentLayout } from './layout/student-layout';
import { StudentCalendar } from './pages/calendar/student-calendar';
import { StudentClasses } from './pages/classes/student-classes';
import { StudentExerciseTake } from './pages/exercise-take/student-exercise-take';
import { StudentHome } from './pages/home/student-home';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    component: StudentLayout,
    children: [
      { path: '', component: StudentHome, title: 'Home · Santamaria' },
      { path: 'calendar', component: StudentCalendar, title: 'Calendar · Santamaria' },
      { path: 'contenido', component: StudentClasses, title: 'Contenido · Santamaria' },
      { path: 'exercises', redirectTo: 'calendar', pathMatch: 'full' },
      { path: 'exercises/:uuid', component: StudentExerciseTake, title: 'Ejercicio · Santamaria' },
      { path: 'calendario', redirectTo: 'calendar', pathMatch: 'full' },
      { path: 'classes', redirectTo: 'contenido', pathMatch: 'full' },
      { path: 'clases', redirectTo: 'contenido', pathMatch: 'full' },
      { path: 'ejercicios', redirectTo: 'exercises', pathMatch: 'full' },
    ],
  },
];

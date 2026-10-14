import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Reveal } from '@shared/directives/reveal.directive';

type Weekday = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';

interface WeeklyClass {
  readonly title: string;
  readonly ages: string;
  readonly hours: string;
  readonly price: string;
  readonly slug?: string;
  readonly tone: 'red' | 'yellow' | 'teal' | 'ink' | 'muted';
}

@Component({
  selector: 'app-academic-calendar',
  imports: [Reveal, RouterLink],
  templateUrl: './academic-calendar.html',
  styleUrl: './academic-calendar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcademicCalendar {
  readonly showPageLink = input(false);
  readonly plain = input(false);

  readonly days: readonly Weekday[] = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  readonly slots = ['17:30', '19:00'] as const;

  private readonly timetable: Readonly<Record<string, Partial<Record<Weekday, WeeklyClass>>>> = {
    '17:30': {
      Lunes: {
        title: 'Programación con Scratch',
        ages: '8–10 años',
        hours: '17:30–18:30',
        price: '49 €/mes',
        slug: 'scratch',
        tone: 'teal',
      },
      Martes: {
        title: 'Desarrollo de videojuegos con Unity',
        ages: '10–14 años',
        hours: '17:30–19:00',
        price: '59 €/mes',
        slug: 'videojuegos',
        tone: 'ink',
      },
      Miércoles: {
        title: 'Primeros Pasos Digitales',
        ages: '7–9 años',
        hours: '17:30–18:30',
        price: '49 €/mes',
        slug: 'ordenador-e-internet',
        tone: 'red',
      },
      Jueves: {
        title: 'Apps Móviles con Kodular',
        ages: '12–16 años',
        hours: '17:30–19:00',
        price: '59 €/mes',
        slug: 'aplicaciones-moviles',
        tone: 'ink',
      },
      Viernes: {
        title: 'Desarrollo Web',
        ages: '15–20 años',
        hours: '17:30–19:00',
        price: '59 €/mes',
        slug: 'paginas-web',
        tone: 'red',
      },
    },
    '19:00': {
      Lunes: {
        title: 'Python',
        ages: '12–16 años',
        hours: '19:00–20:30',
        price: '59 €/mes',
        slug: 'python',
        tone: 'teal',
      },
      Martes: {
        title: 'Seguridad Digital y Ciberseguridad',
        ages: '11–15 años',
        hours: '19:00–20:30',
        price: '59 €/mes',
        slug: 'seguridad-digital',
        tone: 'red',
      },
      Miércoles: {
        title: 'IA y Automatización',
        ages: '14–18 años',
        hours: '19:00–20:30',
        price: '59 €/mes',
        slug: 'inteligencia-artificial',
        tone: 'yellow',
      },
    },
  };

  classAt(time: string, day: Weekday): WeeklyClass | undefined {
    return this.timetable[time]?.[day];
  }

  isWeekend(day: Weekday): boolean {
    return day === 'Sábado' || day === 'Domingo';
  }
}

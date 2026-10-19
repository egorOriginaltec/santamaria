import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

type Weekday = 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';

interface WeeklyClass {
  readonly title: string;
  readonly ages: string;
  readonly hours: string;
  readonly price: string;
  readonly slug?: string;
  readonly tone: 'red' | 'yellow' | 'teal' | 'ink' | 'muted';
}

interface MobileDay {
  readonly day: Weekday;
  readonly lessons: readonly WeeklyClass[];
}

@Component({
  selector: 'app-academic-calendar',
  imports: [RouterLink],
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

  readonly weekdayDays: readonly Weekday[] = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
  ];

  readonly slots = ['17:30', '19:00'] as const;

  private readonly timetable: Readonly<Record<string, Partial<Record<Weekday, WeeklyClass>>>> = {
    '17:30': {
      Lunes: {
        title: 'Programación con Scratch',
        ages: '8–12 años',
        hours: '17:30–19:00',
        price: '59 €/mes',
        slug: 'scratch',
        tone: 'teal',
      },
      Miércoles: {
        title: 'Robótica y Programación con Arduino',
        ages: '11–15 años',
        hours: '17:30–19:00',
        price: '59 €/mes',
        slug: 'robotica-arduino',
        tone: 'teal',
      },
      Jueves: {
        title: 'Crea tus propias aplicaciones móviles',
        ages: '10–14 años',
        hours: '17:30–19:00',
        price: '59 €/mes',
        slug: 'aplicaciones-moviles',
        tone: 'ink',
      },
      Viernes: {
        title: 'Desarrollo Web',
        ages: '14–18 años',
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
        title: 'Desarrollo de videojuegos con Unity',
        ages: '12–16 años',
        hours: '19:00–20:30',
        price: '59 €/mes',
        slug: 'videojuegos',
        tone: 'ink',
      },
      Miércoles: {
        title: 'IA y Automatización',
        ages: '14–18 años',
        hours: '19:00–20:30',
        price: '59 €/mes',
        slug: 'inteligencia-artificial',
        tone: 'yellow',
      },
      Jueves: {
        title: 'Python avanzado',
        ages: '14–18 años',
        hours: '19:00–20:30',
        price: '59 €/mes',
        slug: 'python-avanzado',
        tone: 'ink',
      },
    },
  };

  readonly mobileDays = computed<readonly MobileDay[]>(() =>
    this.weekdayDays.map((day) => ({
      day,
      lessons: this.slots
        .map((slot) => this.classAt(slot, day))
        .filter((lesson): lesson is WeeklyClass => lesson != null),
    })),
  );

  classAt(time: string, day: Weekday): WeeklyClass | undefined {
    return this.timetable[time]?.[day];
  }

  isWeekend(day: Weekday): boolean {
    return day === 'Sábado' || day === 'Domingo';
  }
}

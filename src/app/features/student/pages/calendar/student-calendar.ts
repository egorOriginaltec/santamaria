import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { AppAlert } from '@shared/components/alert/alert';
import {
  CalendarExerciseDto,
  CourseSessionDto,
  MaterialDto,
  readApiError,
} from '@core/services/course-sessions-api.service';
import { StudentCampusService } from '../../data/student-campus.service';
import { studentContentEnter } from '../../student-enter.animation';
import {
  WEEKDAYS_LONG,
  buildMonthCells,
  formatMonthTitle,
  formatNice,
  holidayDates,
  parseIso,
  testsListedOn,
  todayIso,
} from '../../student-schedule';

@Component({
  selector: 'app-student-calendar',
  imports: [RouterLink, AppAlert],
  templateUrl: './student-calendar.html',
  styleUrls: ['../../student-ui.css', './student-calendar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [studentContentEnter],
})
export class StudentCalendar {
  private readonly campus = inject(StudentCampusService);

  readonly loading = this.campus.loading;
  readonly errorMessage = this.campus.error;
  readonly courses = this.campus.courses;
  readonly weekdayLabels = WEEKDAYS_LONG.map((label) => label.slice(0, 3));
  readonly today = todayIso();
  readonly formatNice = formatNice;
  readonly cursor = signal(startOfCurrentMonth());
  readonly selectedIso = signal<string | null>(null);
  readonly downloadError = signal<string | null>(null);
  readonly skeletonCells = Array.from({ length: 35 }, (_, index) => index);
  private aligned = false;

  readonly monthTitle = computed(() => {
    const date = this.cursor();
    return formatMonthTitle(date.getFullYear(), date.getMonth());
  });

  readonly weeks = computed(() => {
    const date = this.cursor();
    return buildMonthCells(
      date.getFullYear(),
      date.getMonth(),
      this.campus.courses(),
      this.campus.sessions(),
      this.campus.holidays(),
      this.today,
      this.campus.exercises(),
    );
  });

  readonly selected = computed(() => {
    const iso = this.selectedIso();
    if (!iso) {
      return null;
    }

    const cell = this.weeks()
      .flat()
      .find((day) => day.iso === iso);

    const holidays = holidayDates(this.campus.holidays());
    const tests = testsListedOn(iso, this.campus.courses(), this.campus.exercises(), holidays);

    return {
      iso,
      title: formatNice(iso),
      holidayName: cell?.holidayName ?? this.campus.holidays().find((holiday) => holiday.date.slice(0, 10) === iso)?.name ?? null,
      classes: cell?.classes ?? [],
      tests,
    };
  });

  constructor() {
    this.campus.ensure();

    effect(() => {
      const courses = this.campus.courses();
      if (this.aligned || this.campus.loading() || courses.length === 0) {
        return;
      }

      this.aligned = true;

      const starts = courses.map((course) => course.start_date.slice(0, 10)).sort();
      const ends = courses.map((course) => course.end_date.slice(0, 10)).sort();
      const start = parseIso(starts[0] ?? '');
      const end = parseIso(ends[ends.length - 1] ?? '');
      const today = parseIso(this.today);
      if (!start || !end || !today) {
        return;
      }

      if (today < start) {
        this.cursor.set(new Date(start.getFullYear(), start.getMonth(), 1));
      } else if (today > end) {
        this.cursor.set(new Date(end.getFullYear(), end.getMonth(), 1));
      }

      this.pickDefaultDay();
    });
  }

  private pickDefaultDay(): void {
    const days = this.weeks()
      .flat()
      .filter((day) => day.inMonth);
    const today = days.find((day) => day.isToday);
    const busy = days.find((day) => day.classes.length > 0 || day.dueTests.length > 0);
    this.selectedIso.set(today?.iso ?? busy?.iso ?? days[0]?.iso ?? null);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.selectedIso.set(null);
  }

  prevMonth(): void {
    const date = new Date(this.cursor());
    date.setMonth(date.getMonth() - 1);
    this.cursor.set(date);
    this.pickDefaultDay();
  }

  nextMonth(): void {
    const date = new Date(this.cursor());
    date.setMonth(date.getMonth() + 1);
    this.cursor.set(date);
    this.pickDefaultDay();
  }

  selectDay(iso: string): void {
    this.downloadError.set(null);
    this.selectedIso.set(iso);

    if (window.matchMedia('(max-width: 979px)').matches) {
      queueMicrotask(() =>
        document.querySelector('.cal-panel')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }),
      );
    }
  }

  closeDay(): void {
    this.selectedIso.set(null);
  }

  retry(): void {
    this.campus.reload().subscribe();
  }

  download(material: MaterialDto): void {
    this.downloadError.set(null);
    this.campus.download(material).subscribe({
      error: (err: HttpErrorResponse) => {
        this.downloadError.set(readApiError(err, 'No se pudo descargar el archivo.'));
      },
    });
  }

  summary(day: { classes: readonly unknown[]; tests: readonly unknown[] }): string {
    const parts: string[] = [];
    if (day.classes.length > 0) {
      parts.push(day.classes.length === 1 ? '1 clase' : `${day.classes.length} clases`);
    }
    if (day.tests.length > 0) {
      parts.push(day.tests.length === 1 ? '1 ejercicio' : `${day.tests.length} ejercicios`);
    }
    return parts.join(' · ');
  }

  meetUrl(session: CourseSessionDto | null): string | null {
    return session?.meet_url ?? null;
  }

  meetPending(classes: readonly { session: CourseSessionDto | null }[]): boolean {
    return classes.length > 0 && !classes.some((item) => !!item.session?.meet_url);
  }

  testKind(exercise: CalendarExerciseDto): string {
    return 'Ejercicio';
  }

  testMeta(exercise: CalendarExerciseDto): string {
    const kind = this.testKind(exercise);
    if (exercise.attempt) {
      return `${kind} · ${exercise.attempt.correct_count}/${exercise.attempt.question_count}`;
    }

    const count = exercise.question_count;
    if (count == null) {
      return kind;
    }

    return `${kind} · ${count} ${count === 1 ? 'pregunta' : 'preguntas'}`;
  }

  testCta(exercise: CalendarExerciseDto): string {
    return exercise.attempt ? 'Repetir' : 'Hacer';
  }
}

function startOfCurrentMonth(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

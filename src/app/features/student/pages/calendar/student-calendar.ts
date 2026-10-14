import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { MaterialDto } from '@core/services/course-sessions-api.service';
import { StudentCampusService } from '../../data/student-campus.service';
import {
  WEEKDAYS_LONG,
  buildMonthCells,
  formatMonthTitle,
  formatNice,
  parseIso,
  todayIso,
} from '../../student-schedule';

@Component({
  selector: 'app-student-calendar',
  imports: [RouterLink],
  templateUrl: './student-calendar.html',
  styleUrls: ['../../student-ui.css', './student-calendar.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCalendar {
  private readonly campus = inject(StudentCampusService);

  readonly loading = this.campus.loading;
  readonly errorMessage = this.campus.error;
  readonly courses = this.campus.courses;
  readonly weekdayLabels = WEEKDAYS_LONG.map((label) => label.slice(0, 3));
  readonly today = todayIso();
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
    );
  });

  readonly selectedClasses = computed(() => {
    const iso = this.selectedIso();
    if (!iso) {
      return [];
    }

    return this.weeks()
      .flat()
      .find((cell) => cell.iso === iso)?.classes ?? [];
  });

  readonly selectedHoliday = computed(() => {
    const iso = this.selectedIso();
    if (!iso) {
      return null;
    }

    return this.weeks().flat().find((cell) => cell.iso === iso)?.holidayName ?? null;
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
    });
  }

  readonly formatNice = formatNice;

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.selectedIso()) {
      this.closeDay();
    }
  }

  prevMonth(): void {
    const date = new Date(this.cursor());
    date.setMonth(date.getMonth() - 1);
    this.cursor.set(date);
    this.selectedIso.set(null);
  }

  nextMonth(): void {
    const date = new Date(this.cursor());
    date.setMonth(date.getMonth() + 1);
    this.cursor.set(date);
    this.selectedIso.set(null);
  }

  selectDay(iso: string, hasClass: boolean, holidayName: string | null): void {
    if (!hasClass && !holidayName) {
      return;
    }

    this.selectedIso.set(iso);
    this.downloadError.set(null);
  }

  closeDay(): void {
    this.selectedIso.set(null);
    this.downloadError.set(null);
  }

  download(material: MaterialDto): void {
    this.downloadError.set(null);
    this.campus.download(material).subscribe({
      error: () => this.downloadError.set('No se pudo descargar el archivo.'),
    });
  }
}

function startOfCurrentMonth(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
}

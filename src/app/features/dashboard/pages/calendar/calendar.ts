import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  HostListener,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  CourseSessionDto,
  CourseSessionsApiService,
  MaterialDto,
  materialFileError,
  readApiError,
} from '@core/services/course-sessions-api.service';
import { CourseDto, CoursesApiService } from '@core/services/courses-api.service';
import { HolidayDto, HolidaysApiService } from '@core/services/holidays-api.service';
import { EMPTY, expand, finalize, forkJoin, map, of, reduce, switchMap } from 'rxjs';

type DayKind = 'outside' | 'gap' | 'weekend' | 'holiday' | 'class';

interface CalendarDay {
  readonly iso: string;
  readonly day: number;
  readonly inMonth: boolean;
  readonly kind: DayKind;
  readonly holidayName: string | null;
  readonly isToday: boolean;
}

interface MonthHoliday {
  readonly iso: string;
  readonly name: string;
  readonly label: string;
  readonly weekday: string;
  readonly counts: boolean;
}

interface CalendarMonth {
  readonly key: string;
  readonly label: string;
  readonly weeks: readonly (readonly CalendarDay[])[];
  readonly classDays: number;
  readonly weekdayHolidays: number;
  readonly weekends: number;
  readonly holidays: readonly MonthHoliday[];
}

interface CourseCalendar {
  readonly months: readonly CalendarMonth[];
  readonly classDays: number;
  readonly weekdayHolidays: number;
  readonly weekends: number;
  readonly rangeLabel: string;
}

const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
] as const;

const WEEKDAYS = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo'] as const;

const sessionDialog = trigger('sessionDialog', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(8px)' }),
    animate('200ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0)' })),
  ]),
  transition(':leave', [
    animate('150ms ease-in', style({ opacity: 0, transform: 'translateY(6px)' })),
  ]),
]);

const sessionModal = trigger('sessionModal', [
  transition(':enter', [
    style({ opacity: 0 }),
    group([
      animate('180ms ease-out', style({ opacity: 1 })),
      query('@sessionDialog', animateChild()),
    ]),
  ]),
  transition(':leave', [
    group([
      animate('150ms ease-in', style({ opacity: 0 })),
      query('@sessionDialog', animateChild()),
    ]),
  ]),
]);

@Component({
  selector: 'app-dashboard-calendar',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './calendar.html',
  styleUrl: './calendar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [sessionModal, sessionDialog],
})
export class DashboardCalendar implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly coursesApi = inject(CoursesApiService);
  private readonly holidaysApi = inject(HolidaysApiService);
  private readonly sessionsApi = inject(CourseSessionsApiService);

  readonly courseControl = new FormControl('', { nonNullable: true });
  readonly meetControl = new FormControl('', { nonNullable: true });
  readonly loading = signal(true);
  readonly errorMessage = signal<string | null>(null);
  readonly panelError = signal<string | null>(null);
  readonly panelSuccess = signal<string | null>(null);
  readonly courses = signal<readonly CourseDto[]>([]);
  readonly holidays = signal<readonly HolidayDto[]>([]);
  readonly sessions = signal<readonly CourseSessionDto[]>([]);
  readonly selectedUuid = signal('');
  readonly selectedIso = signal<string | null>(null);
  readonly saving = signal(false);
  readonly uploading = signal(false);
  readonly studentView = signal(inject(ActivatedRoute).snapshot.data['student'] === true);
  private readonly studentSessions = signal<Readonly<Record<string, readonly CourseSessionDto[]>>>({});

  readonly selectedCourse = computed(
    () => this.courses().find((course) => course.uuid === this.selectedUuid()) ?? null,
  );

  readonly calendar = computed(() => {
    const course = this.selectedCourse();
    if (!course) {
      return null;
    }

    return buildCalendar(course, this.holidays(), todayIso());
  });

  readonly selectedSession = computed(
    () => this.sessions().find((session) => session.session_on === this.selectedIso()) ?? null,
  );

  private readonly sessionsByDate = computed(() => {
    const byDate = new Map<string, CourseSessionDto>();
    for (const session of this.sessions()) {
      byDate.set(session.session_on.slice(0, 10), session);
    }
    return byDate;
  });

  readonly weekdayLabels = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'] as const;
  readonly todayWeekIndex = (new Date().getDay() + 6) % 7;
  readonly skeletonWeekdays = [0, 1, 2, 3, 4, 5, 6] as const;
  readonly skeletonCells = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34] as const;

  constructor() {
    effect((onCleanup) => {
      if (!this.selectedIso() || typeof document === 'undefined') {
        return;
      }

      const previous = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      onCleanup(() => {
        document.body.style.overflow = previous;
      });
    });

    this.courseControl.valueChanges.pipe(takeUntilDestroyed()).subscribe((uuid) => {
      this.selectedUuid.set(uuid);
      this.selectedIso.set(null);
      this.meetControl.setValue('');
      this.panelError.set(null);
      this.panelSuccess.set(null);
      if (this.studentView()) {
        this.sessions.set(this.studentSessions()[uuid] ?? []);
        return;
      }
      this.loadSessions(uuid);
    });
  }

  ngOnInit(): void {
    if (this.studentView()) {
      this.loadStudentCalendar();
      return;
    }

    forkJoin({
      courses: this.coursesApi.list({ per_page: 100, sort: 'start_date_asc' }),
      holidays: this.loadHolidays(),
    })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: ({ courses, holidays }) => {
          this.courses.set(courses.data);
          this.holidays.set(holidays.filter((holiday) => holiday.is_active));
          const requested = this.route.snapshot.queryParamMap.get('course');
          const uuid = courses.data.some((course) => course.uuid === requested)
            ? (requested ?? '')
            : pickCourse(courses.data, todayIso());
          this.selectedUuid.set(uuid);
          this.courseControl.setValue(uuid, { emitEvent: false });
          this.loadSessions(uuid, this.route.snapshot.queryParamMap.get('day'));
        },
        error: (err: { status?: number }) => {
          this.errorMessage.set(
            err.status === 401 || err.status === 403
              ? 'No tienes permiso para ver el calendario. Entra con egor@gmail.com.'
              : 'No se pudo cargar el calendario.',
          );
        },
      });
  }

  private loadStudentCalendar(): void {
    this.sessionsApi
      .studentCalendar()
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (calendar) => {
          this.courses.set(calendar.courses);
          this.holidays.set(calendar.holidays.filter((holiday) => holiday.is_active));
          this.studentSessions.set(calendar.sessions);
          const requested = this.route.snapshot.queryParamMap.get('course');
          const uuid = calendar.courses.some((course) => course.uuid === requested)
            ? (requested ?? '')
            : pickCourse(calendar.courses, todayIso());
          this.selectedUuid.set(uuid);
          this.courseControl.setValue(uuid, { emitEvent: false });
          this.sessions.set(calendar.sessions[uuid] ?? []);
          const day = this.route.snapshot.queryParamMap.get('day');
          if (day) {
            this.selectedIso.set(day);
          }
        },
        error: () => {
          this.errorMessage.set('No se pudo cargar el calendario.');
        },
      });
  }

  sessionFor(iso: string): CourseSessionDto | undefined {
    return this.sessionsByDate().get(iso);
  }

  meetLabel(url: string): string {
    const code = url.replace(/^https?:\/\/(?:www\.)?meet\.google\.com\//i, '').replace(/\/$/, '');
    return code ? `Meet · ${code}` : url;
  }

  filesLabel(materials: readonly MaterialDto[]): string {
    if (materials.length === 1) {
      return materials[0].name;
    }
    return `${materials.length} archivos`;
  }

  selectDay(iso: string): void {
    if (!this.isClassDay(iso)) {
      return;
    }

    this.selectedIso.set(iso);
    const session = this.sessions().find((item) => item.session_on === iso);
    this.meetControl.setValue(session?.meet_url ?? '');
    this.panelError.set(null);
    this.panelSuccess.set(null);
  }

  closeDay(): void {
    this.selectedIso.set(null);
    this.panelError.set(null);
    this.panelSuccess.set(null);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.selectedIso()) {
      this.closeDay();
    }
  }

  saveSession(): void {
    if (this.studentView()) {
      this.panelError.set('No puedes modificar esta clase.');
      return;
    }
    const course = this.selectedCourse();
    const iso = this.selectedIso();
    if (!course || !iso || this.saving()) {
      return;
    }

    const payload = {
      session_on: iso,
      meet_url: this.meetControl.value.trim() || null,
    };
    const existing = this.selectedSession();
    this.saving.set(true);
    this.panelError.set(null);
    this.panelSuccess.set(null);

    const request = existing
      ? this.sessionsApi.update(course.uuid, existing.uuid, payload)
      : this.sessionsApi.create(course.uuid, payload);

    request.pipe(finalize(() => this.saving.set(false))).subscribe({
      next: () => {
        this.closeDay();
        this.loadSessions(course.uuid);
      },
      error: (err: HttpErrorResponse) => {
        this.panelError.set(readApiError(err, 'No se pudo guardar la clase.'));
      },
    });
  }

  deleteSession(): void {
    if (this.studentView()) {
      this.panelError.set('No puedes modificar esta clase.');
      return;
    }
    const course = this.selectedCourse();
    const session = this.selectedSession();
    const iso = this.selectedIso();
    if (!course || !session || !iso) {
      return;
    }

    const ok = window.confirm(`¿Eliminar la clase del ${this.formatIso(iso)}?`);
    if (!ok) {
      return;
    }

    this.sessionsApi.destroy(course.uuid, session.uuid).subscribe({
      next: () => {
        this.meetControl.setValue('');
        this.panelSuccess.set('Clase eliminada.');
        this.loadSessions(course.uuid, iso);
      },
      error: () => this.panelError.set('No se pudo eliminar la clase.'),
    });
  }

  onSessionFile(event: Event): void {
    if (this.studentView()) {
      this.panelError.set('No puedes modificar esta clase.');
      return;
    }
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    const course = this.selectedCourse();
    const iso = this.selectedIso();
    if (!file || !course || !iso || this.uploading()) {
      input.value = '';
      return;
    }

    const problem = materialFileError(file);
    if (problem) {
      input.value = '';
      this.panelSuccess.set(null);
      this.panelError.set(problem);
      return;
    }

    const meetUrl = this.meetControl.value.trim() || null;
    const existing = this.selectedSession();
    void this.readUpload(file).then(
      (upload) => {
        input.value = '';
        this.uploading.set(true);
        this.panelError.set(null);
        this.panelSuccess.set(null);

        const ensured = existing
          ? of(existing)
          : this.sessionsApi.create(course.uuid, {
              session_on: iso,
              meet_url: meetUrl,
            });

        ensured
          .pipe(
            switchMap((session) =>
              this.sessionsApi.uploadSessionMedia(course.uuid, session.uuid, upload).pipe(map(() => session)),
            ),
            finalize(() => this.uploading.set(false)),
          )
          .subscribe({
            next: (session) => {
              this.panelSuccess.set('Archivo subido.');
              this.loadSessions(course.uuid, session.session_on);
            },
            error: (err: HttpErrorResponse) => {
              this.panelError.set(readApiError(err, 'No se pudo subir el archivo.'));
            },
          });
      },
      () => {
        input.value = '';
        this.uploading.set(false);
        this.panelError.set('No se pudo leer el archivo.');
      },
    );
  }

  deleteMedia(material: MaterialDto): void {
    if (this.studentView()) {
      this.panelError.set('No puedes modificar esta clase.');
      return;
    }
    const course = this.selectedCourse();
    const iso = this.selectedIso();
    if (!course || !iso) {
      return;
    }

    const ok = window.confirm(`¿Eliminar “${material.name}”?`);
    if (!ok) {
      return;
    }

    this.sessionsApi.destroyMedia(material.uuid).subscribe({
      next: () => {
        this.panelSuccess.set('Archivo eliminado.');
        this.loadSessions(course.uuid, iso);
      },
      error: () => this.panelError.set('No se pudo eliminar el archivo.'),
    });
  }

  download(material: MaterialDto): void {
    this.sessionsApi.download(material.uuid).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = material.name;
        link.click();
        URL.revokeObjectURL(url);
      },
      error: () => this.panelError.set('No se pudo descargar el archivo.'),
    });
  }

  formatIso(iso: string): string {
    const date = parseIso(iso);
    return date ? formatLong(date) : iso;
  }

  formatSize(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes} B`;
    }
    if (bytes < 1024 * 1024) {
      return `${Math.round(bytes / 1024)} KB`;
    }
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  private readUpload(file: File): Promise<File> {
    return file.arrayBuffer().then(
      (bytes) => new File([bytes], file.name, { type: file.type, lastModified: file.lastModified }),
    );
  }

  private loadSessions(uuid: string, openDay: string | null = null): void {
    if (!uuid) {
      this.sessions.set([]);
      return;
    }

    this.sessionsApi.list(uuid).subscribe({
      next: (sessions) => {
        if (this.selectedUuid() !== uuid) {
          return;
        }

        this.sessions.set(sessions);
        this.errorMessage.set(null);
        if (openDay && this.isClassDay(openDay)) {
          const session = sessions.find((item) => item.session_on === openDay);
          this.selectedIso.set(openDay);
          this.meetControl.setValue(session?.meet_url ?? '');
        }
      },
      error: () => {
        const message = 'No se pudieron cargar las clases de este curso.';
        this.errorMessage.set(message);
        this.panelError.set(message);
      },
    });
  }

  private isClassDay(iso: string): boolean {
    const view = this.calendar();
    if (!view) {
      return false;
    }

    return view.months.some((month) =>
      month.weeks.some((week) => week.some((day) => day.iso === iso && day.kind === 'class')),
    );
  }

  private loadHolidays() {
    const params = { per_page: 100, sort: 'date_asc' as const, year: 'all' as const };

    return this.holidaysApi.list({ ...params, page: 1 }).pipe(
      expand((response) => {
        const page = response.meta?.current_page ?? 1;
        const last = response.meta?.last_page ?? 1;
        if (page >= last) {
          return EMPTY;
        }

        return this.holidaysApi.list({ ...params, page: page + 1 });
      }),
      map((response) => response.data),
      reduce((all, page) => all.concat(page), [] as HolidayDto[]),
    );
  }
}

function pickCourse(courses: readonly CourseDto[], today: string): string {
  const active = courses.filter((course) => course.is_active);
  const pool = active.length > 0 ? active : courses;
  const current = pool.find((course) => course.start_date <= today && course.end_date >= today);
  if (current) {
    return current.uuid;
  }

  const upcoming = pool.find((course) => course.start_date >= today);
  return upcoming?.uuid ?? pool[0]?.uuid ?? '';
}

function buildCalendar(
  course: CourseDto,
  holidays: readonly HolidayDto[],
  today: string,
): CourseCalendar | null {
  const start = parseIso(course.start_date);
  const end = parseIso(course.end_date);
  if (!start || !end || toIso(start) > toIso(end)) {
    return null;
  }

  const holidayByDate = new Map(
    holidays.map((holiday) => [holiday.date.slice(0, 10), holiday] as const),
  );

  const months: CalendarMonth[] = [];
  let classDays = 0;
  let weekdayHolidays = 0;
  let weekends = 0;
  const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
  const lastMonth = new Date(end.getFullYear(), end.getMonth(), 1);

  while (cursor <= lastMonth) {
    const month = buildMonth(cursor, start, end, holidayByDate, today);
    months.push(month);
    classDays += month.classDays;
    weekdayHolidays += month.weekdayHolidays;
    weekends += month.weekends;
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return {
    months,
    classDays,
    weekdayHolidays,
    weekends,
    rangeLabel: `${formatLong(start)} – ${formatLong(end)} · ${course.schedule_start}–${course.schedule_end}`,
  };
}

function buildMonth(
  monthDate: Date,
  start: Date,
  end: Date,
  holidayByDate: ReadonlyMap<string, HolidayDto>,
  today: string,
): CalendarMonth {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const gridStart = startOfWeek(new Date(year, month, 1));
  const gridEnd = endOfWeek(new Date(year, month + 1, 0));
  const weeks: CalendarDay[][] = [];
  const monthHolidays: MonthHoliday[] = [];
  let classDays = 0;
  let weekdayHolidays = 0;
  let weekends = 0;
  const cursor = new Date(gridStart);

  while (cursor <= gridEnd) {
    const week: CalendarDay[] = [];
    for (let index = 0; index < 7; index += 1) {
      const iso = toIso(cursor);
      const inMonth = cursor.getMonth() === month;
      const inCourse = iso >= toIso(start) && iso <= toIso(end);
      const weekend = cursor.getDay() === 0 || cursor.getDay() === 6;
      const holiday = inMonth && inCourse ? (holidayByDate.get(iso) ?? null) : null;
      const kind = dayKind(inMonth, inCourse, weekend, holiday !== null);

      if (inMonth && inCourse && weekend) {
        weekends += 1;
      }
      if (inMonth && inCourse && holiday && !weekend) {
        weekdayHolidays += 1;
      }
      if (kind === 'class') {
        classDays += 1;
      }
      if (holiday) {
        monthHolidays.push({
          iso,
          name: holiday.name,
          label: formatLong(cursor),
          weekday: WEEKDAYS[(cursor.getDay() + 6) % 7],
          counts: !weekend,
        });
      }

      week.push({
        iso,
        day: cursor.getDate(),
        inMonth,
        kind,
        holidayName: holiday?.name ?? null,
        isToday: iso === today,
      });
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push(week);
  }

  return {
    key: `${year}-${month}`,
    label: `${MONTHS[month]} ${year}`,
    weeks,
    classDays,
    weekdayHolidays,
    weekends,
    holidays: monthHolidays,
  };
}

function dayKind(inMonth: boolean, inCourse: boolean, weekend: boolean, holiday: boolean): DayKind {
  if (!inMonth) {
    return 'outside';
  }
  if (!inCourse) {
    return 'gap';
  }
  if (holiday && !weekend) {
    return 'holiday';
  }
  if (weekend) {
    return 'weekend';
  }
  return 'class';
}

function startOfWeek(date: Date): Date {
  const copy = new Date(date);
  const offset = (copy.getDay() + 6) % 7;
  copy.setDate(copy.getDate() - offset);
  return copy;
}

function endOfWeek(date: Date): Date {
  const copy = startOfWeek(date);
  copy.setDate(copy.getDate() + 6);
  return copy;
}

function parseIso(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(value);
  if (!match) {
    return null;
  }

  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function toIso(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function todayIso(): string {
  return toIso(new Date());
}

function formatLong(date: Date): string {
  return `${date.getDate()} ${MONTHS[date.getMonth()].slice(0, 3).toLowerCase()} ${date.getFullYear()}`;
}

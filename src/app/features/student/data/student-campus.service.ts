import { Injectable, computed, inject, signal } from '@angular/core';
import {
  CalendarExerciseDto,
  CourseSessionDto,
  CourseSessionsApiService,
  MaterialDto,
  StudentCalendarDto,
} from '@core/services/course-sessions-api.service';
import { CourseDto } from '@core/services/courses-api.service';
import { HolidayDto } from '@core/services/holidays-api.service';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { pastClasses, todayIso, upcomingClasses } from '../student-schedule';

@Injectable({ providedIn: 'root' })
export class StudentCampusService {
  private readonly sessionsApi = inject(CourseSessionsApiService);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly courses = signal<readonly CourseDto[]>([]);
  readonly holidays = signal<readonly HolidayDto[]>([]);
  readonly sessions = signal<Readonly<Record<string, readonly CourseSessionDto[]>>>({});
  readonly exercises = signal<Readonly<Record<string, readonly CalendarExerciseDto[]>>>({});
  readonly materials = signal<Readonly<Record<string, readonly MaterialDto[]>>>({});

  readonly nextClass = computed(
    () =>
      upcomingClasses(this.courses(), this.sessions(), this.holidays(), todayIso(), 1, true)[0] ??
      null,
  );

  readonly upcoming = computed(() =>
    upcomingClasses(this.courses(), this.sessions(), this.holidays(), todayIso(), 6, true),
  );

  readonly recent = computed(() =>
    pastClasses(this.courses(), this.sessions(), this.holidays(), todayIso(), 8),
  );

  ensure(): void {
    this.reload().subscribe();
  }

  reload(): Observable<StudentCalendarDto | null> {
    this.loading.set(true);
    this.error.set(null);

    return this.sessionsApi.studentCalendar().pipe(
      tap((calendar) => {
        this.apply(calendar);
        this.loading.set(false);
      }),
      catchError(() => {
        this.error.set('No se pudo cargar tu espacio. Prueba otra vez en un momento.');
        this.loading.set(false);
        return of(null);
      }),
    );
  }

  private apply(calendar: StudentCalendarDto): void {
    this.courses.set(calendar.courses);
    this.holidays.set(calendar.holidays);
    this.sessions.set(calendar.sessions);
    this.exercises.set(calendar.exercises ?? {});
    this.materials.set(calendar.materials ?? {});
  }

  clear(): void {
    this.loading.set(true);
    this.error.set(null);
    this.courses.set([]);
    this.holidays.set([]);
    this.sessions.set({});
    this.exercises.set({});
    this.materials.set({});
  }

  download(material: MaterialDto): Observable<void> {
    return this.sessionsApi.download(material.uuid).pipe(
      tap((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = material.name;
        link.click();
        URL.revokeObjectURL(url);
      }),
      map(() => undefined),
    );
  }
}

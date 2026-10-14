import { Injectable, computed, inject, signal } from '@angular/core';
import {
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
  private started = false;

  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly courses = signal<readonly CourseDto[]>([]);
  readonly holidays = signal<readonly HolidayDto[]>([]);
  readonly sessions = signal<Readonly<Record<string, readonly CourseSessionDto[]>>>({});

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
    if (this.started) {
      return;
    }

    this.started = true;
    this.reload().subscribe();
  }

  reload(): Observable<StudentCalendarDto | null> {
    this.loading.set(true);
    this.error.set(null);

    return this.sessionsApi.studentCalendar().pipe(
      tap((calendar) => {
        this.courses.set(calendar.courses);
        this.holidays.set(calendar.holidays);
        this.sessions.set(calendar.sessions);
        this.loading.set(false);
      }),
      catchError(() => {
        this.error.set('No se pudo cargar tu espacio. Prueba otra vez en un momento.');
        this.loading.set(false);
        return of(null);
      }),
    );
  }

  clear(): void {
    this.started = false;
    this.loading.set(true);
    this.error.set(null);
    this.courses.set([]);
    this.holidays.set([]);
    this.sessions.set({});
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

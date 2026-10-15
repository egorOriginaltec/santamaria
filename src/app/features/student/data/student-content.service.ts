import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { API_BASE_URL } from '@core/constants/api/api.constants';
import {
  CalendarExerciseDto,
  CourseSessionsApiService,
  MaterialDto,
  readApiError,
} from '@core/services/course-sessions-api.service';
import { Observable, catchError, map, of, tap } from 'rxjs';

export interface ContentMaterialDto extends MaterialDto {
  readonly session_on: string | null;
}

export interface StudentContentCourseDto {
  readonly uuid: string;
  readonly title: string;
  readonly weekdays: readonly number[];
  readonly weekdays_label: string;
  readonly schedule_start: string | null;
  readonly schedule_end: string | null;
  readonly materials: readonly ContentMaterialDto[];
  readonly exercises: readonly CalendarExerciseDto[];
}

export interface StudentContentDto {
  readonly courses: readonly StudentContentCourseDto[];
}

interface StudentContentResponse {
  readonly data: StudentContentDto;
}

@Injectable({ providedIn: 'root' })
export class StudentContentService {
  private readonly http = inject(HttpClient);
  private readonly sessionsApi = inject(CourseSessionsApiService);
  private readonly endpoint = `${API_BASE_URL}/api/v1/student/content`;
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly courses = signal<readonly StudentContentCourseDto[]>([]);

  ensure(): void {
    this.reload().subscribe();
  }

  reload(): Observable<StudentContentDto | null> {
    this.loading.set(true);
    this.error.set(null);

    return this.fetch().pipe(
      tap(() => this.loading.set(false)),
      catchError(() => {
        this.error.set('No se pudo cargar el contenido. Prueba otra vez en un momento.');
        this.loading.set(false);
        return of(null);
      }),
    );
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

  private fetch(): Observable<StudentContentDto | null> {
    return this.http.get<StudentContentResponse>(this.endpoint).pipe(
      map((response) => ({
        courses: response.data.courses ?? [],
      })),
      tap((content) => this.courses.set(content.courses)),
    );
  }
}

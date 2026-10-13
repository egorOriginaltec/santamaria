import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '@core/constants/api/api.constants';
import { CourseDto } from '@core/services/courses-api.service';
import { HolidayDto } from '@core/services/holidays-api.service';
import { Observable, map } from 'rxjs';

export interface MaterialDto {
  readonly uuid: string;
  readonly name: string;
  readonly mime_type: string;
  readonly size: number;
}

export interface CourseSessionDto {
  readonly uuid: string;
  readonly session_on: string;
  readonly meet_url: string | null;
  readonly materials: readonly MaterialDto[];
}

export interface CourseSessionPayload {
  readonly session_on: string;
  readonly meet_url: string | null;
}

export interface StudentCalendarDto {
  readonly courses: readonly CourseDto[];
  readonly holidays: readonly HolidayDto[];
  readonly sessions: Readonly<Record<string, readonly CourseSessionDto[]>>;
}

interface StudentCalendarResponse {
  readonly data: StudentCalendarDto;
}

interface SessionListResponse {
  readonly data: readonly CourseSessionDto[];
}

interface MediaListResponse {
  readonly data: readonly MaterialDto[];
}

interface SessionMutationResponse {
  readonly message: string;
  readonly data: {
    readonly session: CourseSessionDto;
  };
}

interface MediaMutationResponse {
  readonly message: string;
  readonly data: {
    readonly media: MaterialDto;
  };
}

export const MATERIAL_MAX_BYTES = 50 * 1024 * 1024;

const MATERIAL_EXTENSIONS = ['zip', 'pdf', 'png', 'jpg', 'jpeg', 'webp'] as const;

export function materialFileError(file: File): string | null {
  const extension = file.name.includes('.') ? (file.name.split('.').pop() ?? '').toLowerCase() : '';
  if (!MATERIAL_EXTENSIONS.includes(extension as (typeof MATERIAL_EXTENSIONS)[number])) {
    return 'El archivo debe ser un zip, un PDF o una imagen.';
  }

  if (file.size > MATERIAL_MAX_BYTES) {
    return 'El archivo no puede superar 50 MB.';
  }

  return null;
}

export function readApiError(err: HttpErrorResponse, fallback: string): string {
  if (err.status === 413) {
    return 'El archivo no puede superar 50 MB.';
  }

  const errors = err.error?.errors;
  if (errors && typeof errors === 'object') {
    const first = Object.values(errors as Record<string, unknown>).flat()[0];
    if (typeof first === 'string' && first.length > 0) {
      return first;
    }
  }

  const message = err.error?.message;
  if (typeof message === 'string' && message.length > 0 && err.status >= 400 && err.status < 500) {
    return message;
  }

  return fallback;
}

@Injectable({ providedIn: 'root' })
export class CourseSessionsApiService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${API_BASE_URL}/api/v1`;

  studentCalendar(): Observable<StudentCalendarDto> {
    return this.http
      .get<StudentCalendarResponse>(`${this.endpoint}/student/calendar`)
      .pipe(map((response) => response.data));
  }

  list(courseUuid: string): Observable<readonly CourseSessionDto[]> {
    return this.http
      .get<SessionListResponse>(`${this.endpoint}/courses/${courseUuid}/sessions`)
      .pipe(map((response) => response.data));
  }

  create(courseUuid: string, payload: CourseSessionPayload): Observable<CourseSessionDto> {
    return this.http
      .post<SessionMutationResponse>(`${this.endpoint}/courses/${courseUuid}/sessions`, payload)
      .pipe(map((response) => response.data.session));
  }

  update(
    courseUuid: string,
    sessionUuid: string,
    payload: CourseSessionPayload,
  ): Observable<CourseSessionDto> {
    return this.http
      .put<SessionMutationResponse>(
        `${this.endpoint}/courses/${courseUuid}/sessions/${sessionUuid}`,
        payload,
      )
      .pipe(map((response) => response.data.session));
  }

  destroy(courseUuid: string, sessionUuid: string): Observable<void> {
    return this.http.delete<void>(
      `${this.endpoint}/courses/${courseUuid}/sessions/${sessionUuid}`,
    );
  }

  listCourseMedia(courseUuid: string): Observable<readonly MaterialDto[]> {
    return this.http
      .get<MediaListResponse>(`${this.endpoint}/courses/${courseUuid}/media`)
      .pipe(map((response) => response.data));
  }

  uploadCourseMedia(courseUuid: string, file: File): Observable<MaterialDto> {
    return this.http
      .post<MediaMutationResponse>(
        `${this.endpoint}/courses/${courseUuid}/media`,
        this.fileBody(file),
      )
      .pipe(map((response) => response.data.media));
  }

  uploadSessionMedia(courseUuid: string, sessionUuid: string, file: File): Observable<MaterialDto> {
    return this.http
      .post<MediaMutationResponse>(
        `${this.endpoint}/courses/${courseUuid}/sessions/${sessionUuid}/media`,
        this.fileBody(file),
      )
      .pipe(map((response) => response.data.media));
  }

  destroyMedia(mediaUuid: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/media/${mediaUuid}`);
  }

  download(mediaUuid: string): Observable<Blob> {
    return this.http.get(`${this.endpoint}/media/${mediaUuid}/download`, {
      responseType: 'blob',
      headers: { Accept: '*/*' },
    });
  }

  private fileBody(file: File): FormData {
    const body = new FormData();
    body.append('file', file);
    return body;
  }
}

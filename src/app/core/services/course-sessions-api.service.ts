import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '@core/constants/api/api.constants';
import { CourseDto } from '@core/services/courses-api.service';
import { ExercisePurpose, ExerciseWindow } from '@core/services/exercises-api.service';
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

export interface CalendarExerciseAttemptDto {
  readonly uuid: string;
  readonly correct_count: number;
  readonly question_count: number;
  readonly submitted_at: string | null;
}

export interface CalendarExerciseDto {
  readonly uuid: string;
  readonly title: string;
  readonly purpose: ExercisePurpose;
  readonly starts_on: string | null;
  readonly ends_on: string | null;
  readonly open_ended: boolean;
  readonly window: ExerciseWindow;
  readonly question_count: number | null;
  readonly attempt: CalendarExerciseAttemptDto | null;
}

export interface StudentCalendarDto {
  readonly courses: readonly CourseDto[];
  readonly holidays: readonly HolidayDto[];
  readonly sessions: Readonly<Record<string, readonly CourseSessionDto[]>>;
  readonly exercises: Readonly<Record<string, readonly CalendarExerciseDto[]>>;
  readonly materials: Readonly<Record<string, readonly MaterialDto[]>>;
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

const API_ERROR_BY_STATUS: Readonly<Record<number, string>> = {
  0: 'No hay conexión. Revisa internet e inténtalo de nuevo.',
  401: 'Tu sesión ha caducado. Entra otra vez.',
  403: 'No tienes permiso para ver esto.',
  404: 'No se encontró lo que buscabas.',
  408: 'La petición ha tardado demasiado. Inténtalo de nuevo.',
  413: 'El archivo no puede superar 50 MB.',
  419: 'La sesión ha caducado. Recarga la página.',
  422: 'Revisa los datos e inténtalo de nuevo.',
  429: 'Demasiados intentos. Espera un momento.',
  500: 'Algo ha fallado en el servidor. Prueba en un momento.',
  502: 'El servidor no responde. Prueba en un momento.',
  503: 'El servicio no está disponible ahora.',
  504: 'El servidor no responde. Prueba en un momento.',
};

const API_ERROR_ENGLISH: Readonly<Record<string, string>> = {
  'this action is unauthorized.': 'No tienes permiso para ver esto.',
  'this action is unauthorized': 'No tienes permiso para ver esto.',
  unauthenticated: 'Tu sesión ha caducado. Entra otra vez.',
  'unauthenticated.': 'Tu sesión ha caducado. Entra otra vez.',
  unauthorized: 'No tienes permiso para ver esto.',
  'unauthorized.': 'No tienes permiso para ver esto.',
  forbidden: 'No tienes permiso para ver esto.',
  'forbidden.': 'No tienes permiso para ver esto.',
  'not found.': 'No se encontró lo que buscabas.',
  'not found': 'No se encontró lo que buscabas.',
  'page expired.': 'La sesión ha caducado. Recarga la página.',
  'too many attempts.': 'Demasiados intentos. Espera un momento.',
  'server error': 'Algo ha fallado en el servidor. Prueba en un momento.',
  'internal server error': 'Algo ha fallado en el servidor. Prueba en un momento.',
  'the given data was invalid.': 'Revisa los datos e inténtalo de nuevo.',
  'the email has already been taken.': 'Ese email ya está registrado.',
  'the email has already been taken': 'Ese email ya está registrado.',
  'the phone has already been taken.': 'Ese teléfono ya está registrado.',
  'the phone has already been taken': 'Ese teléfono ya está registrado.',
  'the email field is required.': 'El email es obligatorio.',
  'the phone field is required.': 'El teléfono es obligatorio.',
  'the selected email is invalid.': 'Indica un email válido.',
  'the email must be a valid email address.': 'Indica un email válido.',
  'the student id has already been taken.': 'Ese alumno ya tiene una suscripción.',
  'the student id has already been taken': 'Ese alumno ya tiene una suscripción.',
  'the student uuid field is required.': 'Elige un alumno.',
  'the monthly amount field is required.': 'Indica la cuota mensual.',
  'the starts on field is required.': 'Indica la fecha de inicio.',
  'the selected student uuid is invalid.': 'Elige un alumno válido.',
  'the course uuid field is required.': 'Selecciona un curso.',
  'the selected course uuid is invalid.': 'El curso tiene que ser uno en el que el estudiante esté matriculado.',
  'the amount field is required.': 'Indica el importe.',
  'the paid on field is required.': 'Indica la fecha del pago.',
  'the name field is required.': 'El nombre es obligatorio.',
  'the date field is required.': 'La fecha es obligatoria.',
  'the date has already been taken.': 'Esa fecha nacional ya existe.',
  'the date has already been taken': 'Esa fecha nacional ya existe.',
  'the password field is required.': 'La contraseña es obligatoria.',
  'the password field is required': 'La contraseña es obligatoria.',
  'these credentials do not match our records.':
    'Email o contraseña incorrectos.',
  'these credentials do not match our records':
    'Email o contraseña incorrectos.',
  'the provided password is incorrect.': 'Email o contraseña incorrectos.',
  'the provided password is incorrect': 'Email o contraseña incorrectos.',
  'auth.failed': 'Email o contraseña incorrectos.',
};

function looksSpanish(text: string): boolean {
  return /[áéíóúñü¿¡]/i.test(text) || /\b(no se|no tienes|sesión|inténtalo|prueba|archivo|ejercicio)\b/i.test(text);
}

function translateApiMessage(raw: string | null | undefined, status: number, fallback: string): string {
  if (typeof raw !== 'string') {
    return API_ERROR_BY_STATUS[status] ?? fallback;
  }

  const text = raw.trim();
  if (text === '' || text.length >= 280 || text.includes('<')) {
    return API_ERROR_BY_STATUS[status] ?? fallback;
  }

  const mapped = API_ERROR_ENGLISH[text.toLowerCase()];
  if (mapped) {
    return mapped;
  }

  if (looksSpanish(text)) {
    return text;
  }

  return API_ERROR_BY_STATUS[status] ?? fallback;
}

export function readApiError(err: HttpErrorResponse, fallback: string): string {
  const errors = err.error?.errors;
  if (errors && typeof errors === 'object') {
    const first = Object.values(errors as Record<string, unknown>).flat()[0];
    if (typeof first === 'string' && first.length > 0) {
      return translateApiMessage(first, err.status, fallback);
    }
  }

  return translateApiMessage(err.error?.message, err.status, fallback);
}

@Injectable({ providedIn: 'root' })
export class CourseSessionsApiService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${API_BASE_URL}/api/v1`;

  studentCalendar(): Observable<StudentCalendarDto> {
    return this.http
      .get<StudentCalendarResponse>(`${this.endpoint}/student/calendar`)
      .pipe(
        map((response) => ({
          ...response.data,
          sessions: response.data.sessions ?? {},
          exercises: response.data.exercises ?? {},
          materials: response.data.materials ?? {},
        })),
      );
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

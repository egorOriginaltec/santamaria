import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '@core/constants/api/api.constants';
import { Observable, map } from 'rxjs';

export type ExerciseSource = 'manual' | 'chatgpt';
export type ExercisePurpose = 'practice' | 'exam';
export type ExerciseRevealOn = 'after_choice' | 'at_end';
export type ExerciseWindow = 'draft' | 'scheduled' | 'open' | 'closed';
export type ExerciseChoiceKey = 'A' | 'B' | 'C';
export type ExerciseType = 'multiple_choice' | 'code';
export type ExerciseQuestionFormat = 'multiple_choice' | 'code_write' | 'code_complete';
export type ExerciseLanguage = string;

export interface ExerciseChoiceDto {
  readonly key: ExerciseChoiceKey;
  readonly label: string;
  readonly is_correct?: boolean;
}

export interface ExerciseQuestionDto {
  readonly uuid: string;
  readonly position: number;
  readonly prompt: string;
  readonly format?: ExerciseQuestionFormat;
  readonly language?: ExerciseLanguage | null;
  readonly starter_code?: string | null;
  readonly accepted_answers?: readonly string[];
  readonly solution?: string;
  readonly choices: readonly ExerciseChoiceDto[];
  readonly correct_key?: ExerciseChoiceKey;
}

export interface ExerciseAttemptAnswerDto {
  readonly question_uuid: string | null;
  readonly choice: ExerciseChoiceKey | null;
  readonly code?: string | null;
  readonly is_correct: boolean;
}

export interface ExerciseAttemptDto {
  readonly uuid: string;
  readonly correct_count: number;
  readonly question_count: number;
  readonly submitted_at: string | null;
  readonly answers?: readonly ExerciseAttemptAnswerDto[];
}

export interface ExerciseDto {
  readonly uuid: string;
  readonly title: string;
  readonly type: ExerciseType;
  readonly source: ExerciseSource;
  readonly purpose: ExercisePurpose;
  readonly reveal_on: ExerciseRevealOn;
  readonly prompt?: string | null;
  readonly model?: string | null;
  readonly starts_on: string | null;
  readonly ends_on: string | null;
  readonly open_ended: boolean;
  readonly is_published: boolean;
  readonly window: ExerciseWindow;
  readonly question_count: number | null;
  readonly course?: { readonly uuid: string | null; readonly title: string | null };
  readonly questions?: readonly ExerciseQuestionDto[];
  readonly attempt?: ExerciseAttemptDto | null;
  readonly published_at: string | null;
  readonly created_at: string | null;
  readonly updated_at: string | null;
}

export interface ExerciseQuestionPayload {
  readonly prompt: string;
  readonly format?: ExerciseQuestionFormat;
  readonly language?: ExerciseLanguage;
  readonly starter_code?: string | null;
  readonly accepted_answers?: readonly string[] | string;
  readonly correct_key?: ExerciseChoiceKey;
  readonly choices?: readonly {
    readonly key: ExerciseChoiceKey;
    readonly label: string;
  }[];
}

export interface ExercisePayload {
  readonly title: string;
  readonly type: ExerciseType;
  readonly starts_on: string | null;
  readonly ends_on: string | null;
  readonly is_published: boolean;
  readonly purpose: ExercisePurpose;
  readonly reveal_on: ExerciseRevealOn;
  readonly questions: readonly ExerciseQuestionPayload[];
}

export interface GenerateExercisePayload {
  readonly prompt: string;
  readonly count: number;
  readonly title?: string | null;
  readonly starts_on: string | null;
  readonly ends_on: string | null;
  readonly is_published?: boolean;
  readonly purpose: ExercisePurpose;
  readonly reveal_on: ExerciseRevealOn;
  readonly type: ExerciseType;
  readonly language?: string | null;
}

export interface SubmitAttemptPayload {
  readonly answers: readonly {
    readonly question_uuid: string;
    readonly choice?: ExerciseChoiceKey;
    readonly code?: string;
  }[];
}

interface CodeCheckResponse {
  readonly data: {
    readonly is_correct: boolean;
  };
}

interface ExerciseMutationResponse {
  readonly message: string;
  readonly data: {
    readonly exercise: ExerciseDto;
    readonly attempt?: ExerciseAttemptDto;
  };
}

interface ExerciseShowResponse {
  readonly data: {
    readonly exercise: ExerciseDto;
  };
}

export interface ExercisesListResponse {
  readonly data: readonly ExerciseDto[];
  readonly meta?: {
    readonly current_page: number;
    readonly last_page: number;
    readonly per_page: number;
    readonly total: number;
  };
}

@Injectable({ providedIn: 'root' })
export class ExercisesApiService {
  private readonly http = inject(HttpClient);
  private readonly courses = `${API_BASE_URL}/api/v1/courses`;
  private readonly student = `${API_BASE_URL}/api/v1/student/exercises`;

  listForCourse(courseUuid: string, page = 1): Observable<ExercisesListResponse> {
    const params = new HttpParams().set('per_page', '20').set('page', String(page)).set('sort', 'recent');

    return this.http.get<ExercisesListResponse>(`${this.courses}/${courseUuid}/exercises`, { params });
  }

  getForCourse(courseUuid: string, exerciseUuid: string): Observable<ExerciseDto> {
    return this.http
      .get<ExerciseShowResponse>(`${this.courses}/${courseUuid}/exercises/${exerciseUuid}`)
      .pipe(map((response) => response.data.exercise));
  }

  create(courseUuid: string, payload: ExercisePayload): Observable<ExerciseMutationResponse> {
    return this.http.post<ExerciseMutationResponse>(`${this.courses}/${courseUuid}/exercises`, payload);
  }

  generate(courseUuid: string, payload: GenerateExercisePayload): Observable<ExerciseMutationResponse> {
    return this.http.post<ExerciseMutationResponse>(`${this.courses}/${courseUuid}/exercises/generate`, payload);
  }

  update(courseUuid: string, exerciseUuid: string, payload: ExercisePayload): Observable<ExerciseMutationResponse> {
    return this.http.put<ExerciseMutationResponse>(
      `${this.courses}/${courseUuid}/exercises/${exerciseUuid}`,
      payload,
    );
  }

  destroy(courseUuid: string, exerciseUuid: string): Observable<void> {
    return this.http.delete<void>(`${this.courses}/${courseUuid}/exercises/${exerciseUuid}`);
  }

  listForStudent(): Observable<readonly ExerciseDto[]> {
    return this.http.get<ExercisesListResponse>(this.student).pipe(map((response) => response.data));
  }

  getForStudent(exerciseUuid: string): Observable<ExerciseDto> {
    return this.http
      .get<ExerciseShowResponse>(`${this.student}/${exerciseUuid}`)
      .pipe(map((response) => response.data.exercise));
  }

  submitAttempt(exerciseUuid: string, payload: SubmitAttemptPayload): Observable<ExerciseMutationResponse> {
    return this.http.post<ExerciseMutationResponse>(`${this.student}/${exerciseUuid}/attempts`, payload);
  }

  checkCode(
    exerciseUuid: string,
    payload: { readonly question_uuid: string; readonly code: string },
  ): Observable<boolean> {
    return this.http
      .post<CodeCheckResponse>(`${this.student}/${exerciseUuid}/check`, payload)
      .pipe(map((response) => response.data.is_correct));
  }
}

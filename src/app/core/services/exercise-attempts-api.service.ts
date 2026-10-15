import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '@core/constants/api/api.constants';
import { ExercisePurpose } from '@core/services/exercises-api.service';
import { Observable } from 'rxjs';

export type ExerciseAttemptSort = 'latest' | 'score_asc' | 'score_desc';

export interface ExerciseAttemptSummaryDto {
  readonly uuid: string;
  readonly correct_count: number;
  readonly question_count: number;
  readonly submitted_at: string | null;
  readonly purpose: ExercisePurpose;
  readonly student: {
    readonly uuid: string | null;
    readonly name: string | null;
    readonly email: string | null;
  };
  readonly course: {
    readonly uuid: string | null;
    readonly title: string | null;
  };
  readonly exercise: {
    readonly uuid: string | null;
    readonly title: string | null;
  };
}

export interface ExerciseAttemptsListParams {
  readonly search?: string;
  readonly purpose?: ExercisePurpose | '';
  readonly course_uuid?: string;
  readonly student_uuid?: string;
  readonly from?: string;
  readonly to?: string;
  readonly sort?: ExerciseAttemptSort;
  readonly per_page?: number;
  readonly page?: number;
}

export interface ExerciseAttemptsListOptions {
  readonly purposes: readonly ExercisePurpose[];
  readonly sorts: readonly ExerciseAttemptSort[];
  readonly per_page_options: readonly number[];
}

export interface ExerciseAttemptsListResponse {
  readonly data: readonly ExerciseAttemptSummaryDto[];
  readonly meta?: {
    readonly current_page: number;
    readonly last_page: number;
    readonly per_page: number;
    readonly total: number;
    readonly from: number | null;
    readonly to: number | null;
  };
  readonly filters?: {
    readonly search: string | null;
    readonly purpose: ExercisePurpose | null;
    readonly course_uuid: string | null;
    readonly student_uuid: string | null;
    readonly from: string | null;
    readonly to: string | null;
    readonly sort: ExerciseAttemptSort;
    readonly per_page: number;
    readonly page: number;
  };
  readonly options?: ExerciseAttemptsListOptions;
}

@Injectable({ providedIn: 'root' })
export class ExerciseAttemptsApiService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${API_BASE_URL}/api/v1/exercise-attempts`;

  list(params: ExerciseAttemptsListParams = {}): Observable<ExerciseAttemptsListResponse> {
    let httpParams = new HttpParams();

    const entries: [string, string | number | undefined][] = [
      ['search', params.search],
      ['purpose', params.purpose || undefined],
      ['course_uuid', params.course_uuid || undefined],
      ['student_uuid', params.student_uuid || undefined],
      ['from', params.from || undefined],
      ['to', params.to || undefined],
      ['sort', params.sort],
      ['per_page', params.per_page ?? 15],
      ['page', params.page],
    ];

    for (const [key, value] of entries) {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    }

    return this.http.get<ExerciseAttemptsListResponse>(this.endpoint, { params: httpParams });
  }

  destroy(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${uuid}`);
  }
}

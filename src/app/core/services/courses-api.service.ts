import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '@core/constants/api/api.constants';
import { Observable, map } from 'rxjs';

export type CourseSort = 'start_date_asc' | 'start_date_desc' | 'title';
export type CourseStatusFilter = 'upcoming' | 'past';

export interface CourseDto {
  readonly id: number;
  readonly uuid: string;
  readonly title: string;
  readonly description: string;
  readonly start_date: string;
  readonly end_date: string;
  readonly schedule_start: string;
  readonly schedule_end: string;
  readonly weekdays: readonly number[];
  readonly weekdays_label: string;
  readonly price: number;
  readonly schedule: string;
  readonly is_active: boolean;
  readonly created_at: string | null;
  readonly updated_at: string | null;
}

export interface CoursesListParams {
  readonly search?: string;
  readonly is_active?: boolean | '';
  readonly status?: CourseStatusFilter | '';
  readonly sort?: CourseSort;
  readonly per_page?: number;
  readonly page?: number;
}

export interface CoursePayload {
  readonly title: string;
  readonly description: string;
  readonly start_date: string;
  readonly end_date: string;
  readonly schedule_start: string;
  readonly schedule_end: string;
  readonly weekdays: readonly number[];
  readonly price: number;
  readonly is_active?: boolean;
}

export interface CoursesListOptions {
  readonly statuses: readonly CourseStatusFilter[];
  readonly sorts: readonly CourseSort[];
  readonly per_page_options: readonly number[];
}

export interface CoursesListResponse {
  readonly data: readonly CourseDto[];
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
    readonly is_active: boolean | null;
    readonly status: CourseStatusFilter | null;
    readonly sort: CourseSort;
    readonly per_page: number;
    readonly page: number;
  };
  readonly options?: CoursesListOptions;
}

interface CourseMutationResponse {
  readonly message: string;
  readonly data: {
    readonly course: CourseDto;
  };
}

interface CourseShowResponse {
  readonly data: {
    readonly course: CourseDto;
  };
}

@Injectable({ providedIn: 'root' })
export class CoursesApiService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${API_BASE_URL}/api/v1/courses`;

  list(params: CoursesListParams = {}): Observable<CoursesListResponse> {
    let httpParams = new HttpParams();

    const entries: [string, string | number | boolean | undefined][] = [
      ['search', params.search],
      ['is_active', params.is_active === '' ? undefined : params.is_active],
      ['status', params.status || undefined],
      ['sort', params.sort],
      ['per_page', params.per_page ?? 15],
      ['page', params.page],
    ];

    for (const [key, value] of entries) {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    }

    return this.http.get<CoursesListResponse>(this.endpoint, { params: httpParams });
  }

  get(uuid: string): Observable<CourseDto> {
    return this.http
      .get<CourseShowResponse>(`${this.endpoint}/${uuid}`)
      .pipe(map((response) => response.data.course));
  }

  create(payload: CoursePayload): Observable<CourseMutationResponse> {
    return this.http.post<CourseMutationResponse>(this.endpoint, payload);
  }

  update(uuid: string, payload: Partial<CoursePayload>): Observable<CourseMutationResponse> {
    return this.http.put<CourseMutationResponse>(`${this.endpoint}/${uuid}`, payload);
  }

  destroy(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${uuid}`);
  }
}

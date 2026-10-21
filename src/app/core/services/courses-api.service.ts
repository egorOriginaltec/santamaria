import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '@core/constants/api/api.constants';
import { Observable, map } from 'rxjs';

export type CourseSort = 'start_date_asc' | 'start_date_desc' | 'title' | 'sort_order';
export type CourseStatusFilter = 'upcoming' | 'past';
export type CoursePriceUnit = 'mes' | 'hora';

export interface CourseDto {
  readonly id: number;
  readonly uuid: string;
  readonly title: string;
  readonly slug: string | null;
  readonly sort_order: number;
  readonly card_number: string;
  readonly age_range: string | null;
  readonly card_schedule_line: string | null;
  readonly landing_schedule: string;
  readonly card_summary: string | null;
  readonly description: string;
  readonly start_date: string;
  readonly end_date: string;
  readonly schedule_start: string;
  readonly schedule_end: string;
  readonly weekdays: readonly number[];
  readonly weekdays_label: string;
  readonly price: number;
  readonly price_unit: CoursePriceUnit;
  readonly price_label: string;
  readonly cover_color: string;
  readonly card_icon_url: string | null;
  readonly show_on_landing: boolean;
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
  readonly slug: string;
  readonly sort_order: number;
  readonly age_range: string | null;
  readonly card_schedule_line: string | null;
  readonly card_summary: string | null;
  readonly description: string;
  readonly start_date: string;
  readonly end_date: string;
  readonly schedule_start: string;
  readonly schedule_end: string;
  readonly weekdays: readonly number[];
  readonly price: number;
  readonly price_unit: CoursePriceUnit;
  readonly cover_color: string;
  readonly show_on_landing: boolean;
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

interface CardIconResponse {
  readonly message: string;
  readonly data: {
    readonly course: CourseDto;
  };
}

interface PublicCoursesResponse {
  readonly data: readonly CourseDto[];
}

@Injectable({ providedIn: 'root' })
export class CoursesApiService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${API_BASE_URL}/api/v1/courses`;
  private readonly publicEndpoint = `${API_BASE_URL}/api/v1/public/courses`;

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

  listPublic(): Observable<readonly CourseDto[]> {
    return this.http
      .get<PublicCoursesResponse>(this.publicEndpoint)
      .pipe(map((response) => response.data ?? []));
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

  uploadCardIcon(uuid: string, file: File): Observable<CourseDto> {
    const body = new FormData();
    body.append('file', file);

    return this.http
      .post<CardIconResponse>(`${this.endpoint}/${uuid}/card-icon`, body)
      .pipe(map((response) => response.data.course));
  }

  deleteCardIcon(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${uuid}/card-icon`);
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '@core/constants/api/api.constants';
import { Observable, map } from 'rxjs';

export type StudentSort = 'email_asc' | 'email_desc' | 'latest';

export interface StudentCourseDto {
  readonly uuid: string;
  readonly title: string;
}

export interface StudentDto {
  readonly id: number;
  readonly uuid: string;
  readonly email: string;
  readonly phone: string;
  readonly is_active: boolean;
  readonly courses: readonly StudentCourseDto[];
  readonly created_at: string | null;
  readonly updated_at: string | null;
}

export interface StudentsListParams {
  readonly search?: string;
  readonly is_active?: boolean | '';
  readonly sort?: StudentSort;
  readonly per_page?: number;
  readonly page?: number;
}

export interface StudentPayload {
  readonly email?: string;
  readonly phone?: string;
  readonly is_active?: boolean;
  readonly course_uuids?: readonly string[];
}

export interface StudentsListOptions {
  readonly sorts: readonly StudentSort[];
  readonly per_page_options: readonly number[];
}

export interface StudentsListResponse {
  readonly data: readonly StudentDto[];
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
    readonly sort: StudentSort;
    readonly per_page: number;
    readonly page: number;
  };
  readonly options?: StudentsListOptions;
}

interface StudentMutationResponse {
  readonly message: string;
  readonly data: {
    readonly student: StudentDto;
  };
}

interface StudentShowResponse {
  readonly data: {
    readonly student: StudentDto;
  };
}

@Injectable({ providedIn: 'root' })
export class StudentsApiService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${API_BASE_URL}/api/v1/students`;

  list(params: StudentsListParams = {}): Observable<StudentsListResponse> {
    let httpParams = new HttpParams();

    const entries: [string, string | number | boolean | undefined][] = [
      ['search', params.search],
      ['is_active', params.is_active === '' ? undefined : params.is_active],
      ['sort', params.sort],
      ['per_page', params.per_page ?? 15],
      ['page', params.page],
    ];

    for (const [key, value] of entries) {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    }

    return this.http.get<StudentsListResponse>(this.endpoint, { params: httpParams });
  }

  get(uuid: string): Observable<StudentDto> {
    return this.http
      .get<StudentShowResponse>(`${this.endpoint}/${uuid}`)
      .pipe(map((response) => response.data.student));
  }

  create(payload: StudentPayload): Observable<StudentMutationResponse> {
    return this.http.post<StudentMutationResponse>(this.endpoint, payload);
  }

  update(uuid: string, payload: Partial<StudentPayload>): Observable<StudentMutationResponse> {
    return this.http.put<StudentMutationResponse>(`${this.endpoint}/${uuid}`, payload);
  }

  destroy(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${uuid}`);
  }
}

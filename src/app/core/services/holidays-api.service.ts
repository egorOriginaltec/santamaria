import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '@core/constants/api/api.constants';
import { Observable, map } from 'rxjs';

export type HolidayType = 'national';
export type HolidaySort = 'date_asc' | 'date_desc' | 'name';

export interface HolidayDto {
  readonly id: number;
  readonly uuid: string;
  readonly name: string;
  readonly date: string;
  readonly year: number;
  readonly country: string;
  readonly type: HolidayType | string;
  readonly is_active: boolean;
  readonly notes: string | null;
  readonly created_at: string | null;
  readonly updated_at: string | null;
}

export interface HolidaysListParams {
  readonly search?: string;
  readonly year?: number | 'all';
  readonly month?: number | '';
  readonly is_active?: boolean | '';
  readonly sort?: HolidaySort;
  readonly per_page?: number;
  readonly page?: number;
}

export interface HolidayPayload {
  readonly name: string;
  readonly date: string;
  readonly is_active?: boolean;
  readonly notes?: string | null;
}

export interface HolidaysListOptions {
  readonly types: readonly HolidayType[];
  readonly countries: readonly string[];
  readonly years: readonly number[];
  readonly months: readonly number[];
  readonly sorts: readonly HolidaySort[];
  readonly per_page_options: readonly number[];
}

export interface HolidaysListResponse {
  readonly data: readonly HolidayDto[];
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
    readonly year: number | null;
    readonly month: number | null;
    readonly country: string;
    readonly type: string | null;
    readonly is_active: boolean | null;
    readonly sort: HolidaySort;
    readonly per_page: number;
    readonly page: number;
  };
  readonly options?: HolidaysListOptions;
}

interface HolidayMutationResponse {
  readonly message: string;
  readonly data: {
    readonly holiday: HolidayDto;
  };
}

interface HolidayShowResponse {
  readonly data: {
    readonly holiday: HolidayDto;
  };
}

@Injectable({ providedIn: 'root' })
export class HolidaysApiService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${API_BASE_URL}/api/v1/holidays`;

  list(params: HolidaysListParams = {}): Observable<HolidaysListResponse> {
    let httpParams = new HttpParams()
      .set('country', 'ES')
      .set('type', 'national');

    if (params.year === 'all') {
      httpParams = httpParams.set('year', 'all');
    } else if (params.year !== undefined && params.year !== null) {
      httpParams = httpParams.set('year', String(params.year));
    }

    const entries: [string, string | number | boolean | undefined][] = [
      ['search', params.search],
      ['month', params.month || undefined],
      ['is_active', params.is_active === '' ? undefined : params.is_active],
      ['sort', params.sort],
      ['per_page', params.per_page ?? 10],
      ['page', params.page],
    ];

    for (const [key, value] of entries) {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    }

    return this.http.get<HolidaysListResponse>(this.endpoint, { params: httpParams });
  }

  get(uuid: string): Observable<HolidayDto> {
    return this.http
      .get<HolidayShowResponse>(`${this.endpoint}/${uuid}`)
      .pipe(map((response) => response.data.holiday));
  }

  create(payload: HolidayPayload): Observable<HolidayMutationResponse> {
    return this.http.post<HolidayMutationResponse>(this.endpoint, {
      ...payload,
      country: 'ES',
      type: 'national',
    });
  }

  update(uuid: string, payload: Partial<HolidayPayload>): Observable<HolidayMutationResponse> {
    return this.http.put<HolidayMutationResponse>(`${this.endpoint}/${uuid}`, {
      ...payload,
      country: 'ES',
      type: 'national',
    });
  }

  destroy(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${uuid}`);
  }
}

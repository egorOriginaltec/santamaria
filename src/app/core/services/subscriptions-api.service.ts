import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '@core/constants/api/api.constants';
import { Observable, map } from 'rxjs';

export type SubscriptionStatus = 'active' | 'paused' | 'cancelled';
export type SubscriptionSort = 'latest' | 'amount_asc' | 'amount_desc';

export interface SubscriptionStudentDto {
  readonly uuid: string | null;
  readonly email: string | null;
  readonly phone: string | null;
}

export interface SubscriptionDto {
  readonly id: number;
  readonly uuid: string;
  readonly monthly_amount: number;
  readonly status: SubscriptionStatus;
  readonly starts_on: string | null;
  readonly student: SubscriptionStudentDto;
  readonly created_at: string | null;
  readonly updated_at: string | null;
}

export interface SubscriptionsListParams {
  readonly search?: string;
  readonly status?: SubscriptionStatus | '';
  readonly sort?: SubscriptionSort;
  readonly per_page?: number;
  readonly page?: number;
}

export interface SubscriptionPayload {
  readonly student_uuid?: string;
  readonly monthly_amount?: number;
  readonly status?: SubscriptionStatus;
  readonly starts_on?: string;
}

export interface SubscriptionsListOptions {
  readonly statuses: readonly SubscriptionStatus[];
  readonly sorts: readonly SubscriptionSort[];
  readonly per_page_options: readonly number[];
}

export interface SubscriptionsListResponse {
  readonly data: readonly SubscriptionDto[];
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
    readonly status: SubscriptionStatus | null;
    readonly sort: SubscriptionSort;
    readonly per_page: number;
    readonly page: number;
  };
  readonly options?: SubscriptionsListOptions;
}

interface SubscriptionMutationResponse {
  readonly message: string;
  readonly data: {
    readonly subscription: SubscriptionDto;
  };
}

interface SubscriptionShowResponse {
  readonly data: {
    readonly subscription: SubscriptionDto;
  };
}

@Injectable({ providedIn: 'root' })
export class SubscriptionsApiService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${API_BASE_URL}/api/v1/subscriptions`;

  list(params: SubscriptionsListParams = {}): Observable<SubscriptionsListResponse> {
    let httpParams = new HttpParams();

    const entries: [string, string | number | boolean | undefined][] = [
      ['search', params.search],
      ['status', params.status === '' ? undefined : params.status],
      ['sort', params.sort],
      ['per_page', params.per_page ?? 15],
      ['page', params.page],
    ];

    for (const [key, value] of entries) {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    }

    return this.http.get<SubscriptionsListResponse>(this.endpoint, { params: httpParams });
  }

  get(uuid: string): Observable<SubscriptionDto> {
    return this.http
      .get<SubscriptionShowResponse>(`${this.endpoint}/${uuid}`)
      .pipe(map((response) => response.data.subscription));
  }

  create(payload: SubscriptionPayload): Observable<SubscriptionMutationResponse> {
    return this.http.post<SubscriptionMutationResponse>(this.endpoint, payload);
  }

  update(uuid: string, payload: Partial<SubscriptionPayload>): Observable<SubscriptionMutationResponse> {
    return this.http.put<SubscriptionMutationResponse>(`${this.endpoint}/${uuid}`, payload);
  }

  destroy(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${uuid}`);
  }
}

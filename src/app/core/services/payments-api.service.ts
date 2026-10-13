import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '@core/constants/api/api.constants';
import { Observable, map } from 'rxjs';

export type PaymentStatus = 'pending' | 'paid' | 'refunded';
export type PaymentMethod = 'transfer' | 'card' | 'cash';
export type PaymentSort = 'latest' | 'amount_asc' | 'amount_desc';

export interface PaymentPartyDto {
  readonly uuid: string | null;
  readonly email?: string | null;
  readonly title?: string | null;
}

export interface PaymentDto {
  readonly id: number;
  readonly uuid: string;
  readonly amount: number;
  readonly status: PaymentStatus;
  readonly method: PaymentMethod;
  readonly paid_on: string | null;
  readonly notes: string | null;
  readonly student: PaymentPartyDto;
  readonly course: PaymentPartyDto;
  readonly created_at: string | null;
  readonly updated_at: string | null;
}

export interface PaymentsListParams {
  readonly search?: string;
  readonly status?: PaymentStatus | '';
  readonly sort?: PaymentSort;
  readonly per_page?: number;
  readonly page?: number;
}

export interface PaymentPayload {
  readonly student_uuid?: string;
  readonly course_uuid?: string;
  readonly amount?: number;
  readonly status?: PaymentStatus;
  readonly method?: PaymentMethod;
  readonly paid_on?: string | null;
  readonly notes?: string | null;
}

export interface PaymentsListOptions {
  readonly statuses: readonly PaymentStatus[];
  readonly methods: readonly PaymentMethod[];
  readonly sorts: readonly PaymentSort[];
  readonly per_page_options: readonly number[];
}

export interface PaymentsListResponse {
  readonly data: readonly PaymentDto[];
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
    readonly status: PaymentStatus | null;
    readonly sort: PaymentSort;
    readonly per_page: number;
    readonly page: number;
  };
  readonly options?: PaymentsListOptions;
}

interface PaymentMutationResponse {
  readonly message: string;
  readonly data: {
    readonly payment: PaymentDto;
  };
}

interface PaymentShowResponse {
  readonly data: {
    readonly payment: PaymentDto;
  };
}

@Injectable({ providedIn: 'root' })
export class PaymentsApiService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${API_BASE_URL}/api/v1/payments`;

  list(params: PaymentsListParams = {}): Observable<PaymentsListResponse> {
    let httpParams = new HttpParams();

    const entries: [string, string | number | boolean | undefined][] = [
      ['search', params.search],
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

    return this.http.get<PaymentsListResponse>(this.endpoint, { params: httpParams });
  }

  get(uuid: string): Observable<PaymentDto> {
    return this.http
      .get<PaymentShowResponse>(`${this.endpoint}/${uuid}`)
      .pipe(map((response) => response.data.payment));
  }

  create(payload: PaymentPayload): Observable<PaymentMutationResponse> {
    return this.http.post<PaymentMutationResponse>(this.endpoint, payload);
  }

  update(uuid: string, payload: PaymentPayload): Observable<PaymentMutationResponse> {
    return this.http.put<PaymentMutationResponse>(`${this.endpoint}/${uuid}`, payload);
  }

  destroy(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${uuid}`);
  }
}

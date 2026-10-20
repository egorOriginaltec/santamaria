import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '@core/constants/api/api.constants';
import { Observable, map } from 'rxjs';

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed';
export type LeadPeriod = 'week' | 'month' | 'all';
export type LeadSort = 'priority' | 'latest';
export type LeadSource = 'landing' | 'contact' | 'website';

export interface LeadChallenge {
  readonly question: string;
  readonly token: string;
}

export interface CreateLeadPayload {
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
  readonly message: string;
  readonly source?: string;
  /** Honeypot — must stay empty. */
  readonly website?: string;
  readonly captcha_token: string;
  readonly captcha_answer: number;
}

export interface UpdateLeadPayload {
  readonly name?: string;
  readonly email?: string;
  readonly phone?: string | null;
  readonly message?: string;
  readonly status?: LeadStatus;
  readonly source?: string;
}

export interface LeadDto {
  readonly id: number;
  readonly uuid: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string | null;
  readonly message: string;
  readonly status: LeadStatus | string;
  readonly source: string;
  readonly contacted_at: string | null;
  readonly created_at: string | null;
  readonly updated_at: string | null;
}

export interface LeadsListParams {
  readonly search?: string;
  readonly status?: LeadStatus | '';
  readonly source?: LeadSource | '';
  readonly period?: LeadPeriod;
  readonly from?: string;
  readonly to?: string;
  readonly sort?: LeadSort;
  readonly per_page?: number;
  readonly page?: number;
}

export interface LeadsListFilters {
  readonly search: string | null;
  readonly status: LeadStatus | null;
  readonly source: string | null;
  readonly period: LeadPeriod | null;
  readonly from: string | null;
  readonly to: string | null;
  readonly sort: LeadSort;
  readonly per_page: number;
  readonly page: number;
}

export interface LeadsListOptions {
  readonly statuses: readonly LeadStatus[];
  readonly sources: readonly LeadSource[];
  readonly periods: readonly LeadPeriod[];
  readonly sorts: readonly LeadSort[];
  readonly per_page_options: readonly number[];
}

interface CreateLeadResponse {
  readonly message: string;
  readonly data: {
    readonly lead: LeadDto;
  };
}

interface UpdateLeadResponse {
  readonly message: string;
  readonly data: {
    readonly lead: LeadDto;
  };
}

interface LeadChallengeResponse {
  readonly data: LeadChallenge;
}

export interface LeadsListResponse {
  readonly data: readonly LeadDto[];
  readonly meta?: {
    readonly current_page: number;
    readonly last_page: number;
    readonly per_page: number;
    readonly total: number;
    readonly from: number | null;
    readonly to: number | null;
  };
  readonly filters?: LeadsListFilters;
  readonly options?: LeadsListOptions;
}

@Injectable({ providedIn: 'root' })
export class LeadsApiService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${API_BASE_URL}/api/v1/leads`;

  challenge(): Observable<LeadChallenge> {
    return this.http
      .get<LeadChallengeResponse>(`${this.endpoint}/challenge`)
      .pipe(map((response) => response.data));
  }

  create(payload: CreateLeadPayload): Observable<CreateLeadResponse> {
    return this.http.post<CreateLeadResponse>(this.endpoint, payload);
  }

  list(params: LeadsListParams = {}): Observable<LeadsListResponse> {
    let httpParams = new HttpParams();

    const entries: [string, string | number | undefined][] = [
      ['search', params.search],
      ['status', params.status || undefined],
      ['source', params.source || undefined],
      ['period', params.period],
      ['from', params.from],
      ['to', params.to],
      ['sort', params.sort],
      ['per_page', params.per_page],
      ['page', params.page],
    ];

    for (const [key, value] of entries) {
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    }

    return this.http.get<LeadsListResponse>(this.endpoint, { params: httpParams });
  }

  update(uuid: string, payload: UpdateLeadPayload): Observable<UpdateLeadResponse> {
    return this.http.put<UpdateLeadResponse>(`${this.endpoint}/${uuid}`, payload);
  }

  destroy(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${uuid}`);
  }
}

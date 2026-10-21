import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '@core/constants/api/api.constants';
import { Observable, map } from 'rxjs';

export type JobApplicationStatus =
  | 'new'
  | 'reviewing'
  | 'interview'
  | 'rejected'
  | 'hired';

export type JobApplicationPeriod = 'week' | 'month' | 'all';
export type JobApplicationSort = 'priority' | 'latest';

export interface JobApplicationMediaDto {
  readonly uuid: string;
  readonly name: string;
  readonly mime_type: string | null;
  readonly size: number | null;
}

export interface JobApplicationDto {
  readonly id: number;
  readonly uuid: string;
  readonly name: string;
  readonly email: string;
  readonly phone: string | null;
  readonly position: string | null;
  readonly linkedin_url: string | null;
  readonly portfolio_url: string | null;
  readonly cover_letter: string;
  readonly status: JobApplicationStatus | string;
  readonly admin_notes: string | null;
  readonly reviewed_at: string | null;
  readonly cv?: JobApplicationMediaDto | null;
  readonly attachments?: readonly JobApplicationMediaDto[] | null;
  readonly created_at: string | null;

  readonly updated_at: string | null;
}

export interface JobApplicationChallenge {
  readonly question: string;
  readonly token: string;
}

export interface CreateJobApplicationPayload {
  readonly name: string;
  readonly email: string;
  readonly phone?: string;
  readonly position?: string;
  readonly linkedin_url?: string;
  readonly portfolio_url?: string;
  readonly cover_letter: string;
  readonly cv: File;
  readonly attachments?: readonly File[];
  /** Honeypot — must stay empty. */
  readonly website?: string;
  readonly captcha_token: string;
  readonly captcha_answer: number;
}

export interface CreateJobApplicationResponse {
  readonly message: string;
  readonly data: {
    readonly job_application: {
      readonly uuid: string;
      readonly status: string;
    };
  };
}

export interface UpdateJobApplicationPayload {
  readonly status?: JobApplicationStatus;
  readonly admin_notes?: string | null;
  readonly reviewed_at?: string | null;
}

export interface JobApplicationsListParams {
  readonly search?: string;
  readonly status?: JobApplicationStatus | '';
  readonly position?: string;
  readonly period?: JobApplicationPeriod;
  readonly from?: string;
  readonly to?: string;
  readonly sort?: JobApplicationSort;
  readonly per_page?: number;
  readonly page?: number;
}

export interface JobApplicationsListFilters {
  readonly search: string | null;
  readonly status: JobApplicationStatus | null;
  readonly position: string | null;
  readonly period: JobApplicationPeriod | null;
  readonly from: string | null;
  readonly to: string | null;
  readonly sort: JobApplicationSort;
  readonly per_page: number;
  readonly page: number;
}

export interface JobApplicationsListOptions {
  readonly statuses: readonly JobApplicationStatus[];
  readonly periods: readonly JobApplicationPeriod[];
  readonly sorts: readonly JobApplicationSort[];
  readonly per_page_options: readonly number[];
}

export interface JobApplicationsListResponse {
  readonly data: readonly JobApplicationDto[];
  readonly meta?: {
    readonly current_page: number;
    readonly last_page: number;
    readonly per_page: number;
    readonly total: number;
    readonly from: number | null;
    readonly to: number | null;
  };
  readonly filters?: JobApplicationsListFilters;
  readonly options?: JobApplicationsListOptions;
}

interface JobApplicationChallengeResponse {
  readonly data: JobApplicationChallenge;
}

interface UpdateJobApplicationResponse {
  readonly message: string;
  readonly data: {
    readonly job_application: JobApplicationDto;
  };
}

@Injectable({ providedIn: 'root' })
export class JobApplicationsApiService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${API_BASE_URL}/api/v1/job-applications`;

  challenge(): Observable<JobApplicationChallenge> {
    return this.http
      .get<JobApplicationChallengeResponse>(`${this.endpoint}/challenge`)
      .pipe(map((response) => response.data));
  }

  create(payload: CreateJobApplicationPayload): Observable<CreateJobApplicationResponse> {
    const body = new FormData();

    body.append('name', payload.name);
    body.append('email', payload.email);
    body.append('cover_letter', payload.cover_letter);
    body.append('cv', payload.cv, payload.cv.name);
    body.append('captcha_token', payload.captcha_token);
    body.append('captcha_answer', String(payload.captcha_answer));

    if (payload.phone) {
      body.append('phone', payload.phone);
    }
    if (payload.position) {
      body.append('position', payload.position);
    }
    if (payload.linkedin_url) {
      body.append('linkedin_url', payload.linkedin_url);
    }
    if (payload.portfolio_url) {
      body.append('portfolio_url', payload.portfolio_url);
    }
    if (payload.website !== undefined) {
      body.append('website', payload.website);
    }

    for (const file of payload.attachments ?? []) {
      body.append('attachments[]', file, file.name);
    }

    return this.http.post<CreateJobApplicationResponse>(this.endpoint, body);
  }

  list(params: JobApplicationsListParams = {}): Observable<JobApplicationsListResponse> {
    let httpParams = new HttpParams();

    const entries: [string, string | number | undefined][] = [
      ['search', params.search],
      ['status', params.status || undefined],
      ['position', params.position],
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

    return this.http.get<JobApplicationsListResponse>(this.endpoint, { params: httpParams });
  }

  update(
    uuid: string,
    payload: UpdateJobApplicationPayload,
  ): Observable<UpdateJobApplicationResponse> {
    return this.http.put<UpdateJobApplicationResponse>(`${this.endpoint}/${uuid}`, payload);
  }

  destroy(uuid: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${uuid}`);
  }

  downloadMedia(applicationUuid: string, mediaUuid: string): Observable<Blob> {
    return this.http.get(
      `${this.endpoint}/${applicationUuid}/media/${mediaUuid}/download`,
      { responseType: 'blob' },
    );
  }
}

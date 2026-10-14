import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { API_BASE_URL } from '@core/constants/api/api.constants';
import { Observable, map } from 'rxjs';

export interface DashboardSeriesPoint {
  readonly label: string;
  readonly paid: number;
  readonly previous_paid: number;
  readonly students: number;
  readonly previous_students: number;
}

export interface DashboardCourseSlice {
  readonly title: string;
  readonly paid: number;
  readonly students: number;
}

export interface DashboardRecentPayment {
  readonly uuid: string;
  readonly email: string | null;
  readonly course: string | null;
  readonly amount: number;
  readonly status: 'paid';
  readonly paid_on: string;
}

export interface DashboardRecentStudent {
  readonly uuid: string;
  readonly email: string | null;
  readonly is_active: boolean;
  readonly courses: readonly string[];
  readonly created_at: string | null;
  readonly paid: number;
}

export interface DashboardSubscriptionItem {
  readonly uuid: string;
  readonly email: string | null;
  readonly monthly_amount: number;
  readonly due: number;
  readonly months: number;
  readonly status: 'active' | 'paused' | 'cancelled';
  readonly starts_on: string;
}

export interface DashboardSubscriptions {
  readonly count: number;
  readonly months: number;
  readonly due: number;
  readonly paid: number;
  readonly outstanding: number;
  readonly coverage: number;
  readonly items: readonly DashboardSubscriptionItem[];
}

export interface DashboardSummary {
  readonly label: string;
  readonly comparison: {
    readonly current: string;
    readonly previous: string;
  };
  readonly range: {
    readonly from: string | null;
    readonly to: string | null;
  };
  readonly billing: {
    readonly paid: number;
    readonly pending: number;
    readonly refunded: number;
    readonly net: number;
    readonly count: number;
    readonly paid_count: number;
    readonly payers: number;
    readonly average: number;
    readonly previous_paid: number | null;
    readonly delta: number | null;
  };
  readonly subscriptions: DashboardSubscriptions;
  readonly students: {
    readonly new: number;
    readonly active: number;
    readonly inactive: number;
    readonly previous_new: number | null;
    readonly delta: number | null;
  };
  readonly enrollments: {
    readonly count: number;
    readonly previous: number | null;
    readonly delta: number | null;
  };
  readonly courses_active: number;
  readonly leads: {
    readonly open: number;
    readonly previous: number;
    readonly delta: number;
  };
  readonly series: readonly DashboardSeriesPoint[];
  readonly courses: readonly DashboardCourseSlice[];
  readonly recent_payments: readonly DashboardRecentPayment[];
  readonly recent_students: readonly DashboardRecentStudent[];
}

interface DashboardResponse {
  readonly data: DashboardSummary;
}

@Injectable({ providedIn: 'root' })
export class DashboardApiService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = `${API_BASE_URL}/api/v1/dashboard`;

  summary(from: string, to: string): Observable<DashboardSummary> {
    const params = new HttpParams().set('from', from).set('to', to);

    return this.http
      .get<DashboardResponse>(this.endpoint, { params })
      .pipe(map((response) => response.data));
  }
}

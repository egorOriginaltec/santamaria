import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { API_BASE_URL } from '@core/constants/api/api.constants';
import { Observable, catchError, map, of, switchMap, tap, throwError } from 'rxjs';

export interface AuthUser {
  readonly id: number;
  readonly name: string;
  readonly email: string;
  readonly roles: readonly string[];
  readonly permissions: readonly string[];
}

interface AuthUserResponse {
  readonly data: {
    readonly user: AuthUser;
  };
}

interface LoginResponse {
  readonly message: string;
  readonly data: {
    readonly user: AuthUser;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly http = inject(HttpClient);
  private readonly base = API_BASE_URL;

  readonly user = signal<AuthUser | null>(null);

  ensureCsrf(): Observable<void> {
    return this.http
      .get(`${this.base}/sanctum/csrf-cookie`, {
        responseType: 'text',
        withCredentials: true,
      })
      .pipe(map(() => undefined));
  }

  login(email: string, password: string, remember = true): Observable<AuthUser> {
    return this.ensureCsrf().pipe(
      switchMap(() =>
        this.http.post<LoginResponse>(
          `${this.base}/api/v1/auth/login`,
          { email, password, remember },
          { withCredentials: true },
        ),
      ),
      map((response) => response.data.user),
      tap((user) => this.user.set(user)),
    );
  }

  me(): Observable<AuthUser | null> {
    return this.http.get<AuthUserResponse>(`${this.base}/api/v1/auth/me`).pipe(
      map((response) => response.data.user),
      tap((user) => this.user.set(user)),
      catchError(() => {
        this.user.set(null);
        return of(null);
      }),
    );
  }

  logout(): Observable<void> {
    return this.http.post(`${this.base}/api/v1/auth/logout`, {}).pipe(
      map(() => undefined),
      tap(() => this.user.set(null)),
      catchError((error: unknown) => {
        this.user.set(null);
        return throwError(() => error);
      }),
    );
  }
}

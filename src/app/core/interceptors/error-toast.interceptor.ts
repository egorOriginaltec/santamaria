import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { readApiError } from '@core/services/course-sessions-api.service';
import { ToastService } from '@core/services/toast.service';
import { catchError, throwError } from 'rxjs';

function shouldSkipToast(url: string, status: number): boolean {
  const path = url.replace(/^https?:\/\/[^/]+/i, '');

  if (path.includes('/sanctum/csrf-cookie')) {
    return true;
  }

  if (path.includes('/api/v1/auth/me')) {
    return true;
  }

  // Login page owns the credentials messaging
  if (path.includes('/api/v1/auth/login')) {
    return true;
  }

  // Silent probe / session check noise
  if (status === 401 && path.includes('/api/v1/auth/')) {
    return true;
  }

  return false;
}

export const errorToastInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((err: unknown) => {
      if (err instanceof HttpErrorResponse && !shouldSkipToast(req.url, err.status)) {
        toast.error(readApiError(err, 'Algo ha fallado. Inténtalo de nuevo.'));
      }

      return throwError(() => err);
    }),
  );
};

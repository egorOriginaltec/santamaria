import { HttpInterceptorFn } from '@angular/common/http';

/** Send cookies on every API call (Sanctum SPA session). */
export const credentialsInterceptor: HttpInterceptorFn = (req, next) =>
  next(
    req.clone({
      withCredentials: true,
      setHeaders: {
        Accept: req.headers.get('Accept') ?? 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    }),
  );

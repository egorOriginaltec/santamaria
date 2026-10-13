import { HttpInterceptorFn } from '@angular/common/http';

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${name}=`));

  if (!match) {
    return null;
  }

  return decodeURIComponent(match.slice(name.length + 1));
}

/**
 * Laravel Sanctum CSRF: Angular skips XSRF headers on absolute URLs.
 * Read XSRF-TOKEN (set by /sanctum/csrf-cookie) and send X-XSRF-TOKEN.
 */
export const xsrfInterceptor: HttpInterceptorFn = (req, next) => {
  const method = req.method.toUpperCase();
  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') {
    return next(req);
  }

  const token = readCookie('XSRF-TOKEN');
  if (!token || req.headers.has('X-XSRF-TOKEN')) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        'X-XSRF-TOKEN': token,
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    }),
  );
};

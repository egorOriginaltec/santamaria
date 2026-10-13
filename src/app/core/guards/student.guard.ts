import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthApiService } from '@core/services/auth-api.service';
import { map } from 'rxjs';

export const studentGuard: CanActivateFn = () => {
  const auth = inject(AuthApiService);
  const router = inject(Router);

  return auth.me().pipe(
    map((user) => {
      const roles = user?.roles ?? [];

      if (roles.includes('student') && !roles.includes('administrator')) {
        return true;
      }

      if (roles.includes('administrator')) {
        return router.createUrlTree(['/dashboard']);
      }

      return router.createUrlTree(['/login']);
    }),
  );
};

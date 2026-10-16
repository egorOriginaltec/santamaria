import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthApiService } from '@core/services/auth-api.service';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthApiService);
  const router = inject(Router);

  return auth.me().pipe(
    map((user) => {
      const roles = user?.roles ?? [];

      if (roles.includes('administrator')) {
        return true;
      }

      if (roles.includes('student')) {
        return router.createUrlTree(['/student']);
      }

      return router.createUrlTree(['/acceso']);
    }),
  );
};

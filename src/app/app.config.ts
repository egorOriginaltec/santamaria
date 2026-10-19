import {
  provideHttpClient,
  withFetch,
  withInterceptors,
  withXsrfConfiguration,
} from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { credentialsInterceptor } from '@core/interceptors/credentials.interceptor';
import { errorToastInterceptor } from '@core/interceptors/error-toast.interceptor';
import { xsrfInterceptor } from '@core/interceptors/xsrf.interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
    ),
    // Noop: menos JS en runtime; las páginas públicas no usan animaciones Angular.
    provideNoopAnimations(),
    provideHttpClient(
      withFetch(),
      withXsrfConfiguration({
        cookieName: 'XSRF-TOKEN',
        headerName: 'X-XSRF-TOKEN',
      }),
      withInterceptors([
        credentialsInterceptor,
        xsrfInterceptor,
        errorToastInterceptor,
      ]),
    ),
  ],
};

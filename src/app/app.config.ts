import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor, backendInterceptor, errorInterceptor } from '../tools/backend.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: "enabled" })),
  provideHttpClient(withInterceptors([
    backendInterceptor,
    authInterceptor,
    errorInterceptor
  ]))
  ]

};
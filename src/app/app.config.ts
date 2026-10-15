import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';

import { FleetRepository } from '@/core/repositories/fleet.repository';
import { LocalStorageFleetRepository } from '@/data/repositories/local-storage-fleet.repository';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions(), withComponentInputBinding()),
    {
      provide: FleetRepository,
      useClass: LocalStorageFleetRepository,
    },
  ],
};

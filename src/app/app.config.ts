import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { FleetRepository } from '@/core/repositories/fleet.repository';
import { LocalStorageFleetRepository } from '@/core/repositories/local-storage-fleet.repository';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions()),
    {
      provide: FleetRepository,
      useClass: LocalStorageFleetRepository,
    },
  ],
};

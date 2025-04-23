import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { TMDB_CONFIG } from '@biskop-monorepo/main';
import { stateManagementConfig } from '@biskop-monorepo/state-management';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    ...stateManagementConfig,
    {
      provide: TMDB_CONFIG,
      useValue:{
        tmbdbApiKey: '73b2fc9fab947354d61cb3faa1a40405',
      }
    },
  ],
};

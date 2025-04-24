import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/layouts/main/app.component';
import { provideHttpClient } from '@angular/common/http';
import { stateManagementConfig } from '@biskop-monorepo/state-management';
import { TMDB_CONFIG } from '@biskop-monorepo/main';


bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    ...stateManagementConfig,
    {
      provide: TMDB_CONFIG,
      useValue:{
        tmbdbApiKey: '',//use own APIKEY
      }
    },
],
});

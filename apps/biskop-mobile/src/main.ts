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
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { stateManagementConfig } from '../../../libs/state/state-management';
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
        tmbdbApiKey: '73b2fc9fab947354d61cb3faa1a40405',
      }
    },
],
});

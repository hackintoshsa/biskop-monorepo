import { ActionReducer, MetaReducer, provideStore } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { environment } from '@env/environment.development';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: ['feature', 'login', 'register', 'forgotPassword', 'resetPassword', 'isLoggedIn', 'token', 'watchLater'],
    rehydrate: true,
    storage: sessionStorage,
    checkStorageAvailability: false,
  })(reducer);
}

// Meta reducers
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

export const stateManagementConfig = [
  provideStore({},
    {
      metaReducers,
    }
  ),
  provideEffects([]),
  provideStoreDevtools({
    maxAge: 25,
    logOnly: environment.production,
    features: {
      pause: false,
      lock: true,
      persist: true,
    },
  }),
]

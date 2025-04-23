import { InjectionToken } from '@angular/core';

export interface TmdbConfig {
  tmbdbApiKey: string;
}

export const TMDB_CONFIG = new InjectionToken<TmdbConfig>('TMDB_CONFIG');

import { InjectionToken } from '@angular/core';

export function utils(): string {
  return 'utils';
}


export interface TmdbConfig {
  tmbdbApiKey: string;
}
export const TMDB_CONFIG = new InjectionToken<TmdbConfig>('TMDB_CONFIG');

export interface EnvironmentConfiguration {
  production: boolean;
}

export const ENVIRONMENT = new InjectionToken<EnvironmentConfiguration>('ENVIRONMENT');

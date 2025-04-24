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

export const getGenreById = (genreIds: number[]): string => {
  const genres: { [key: number]: string } = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
    // Add more genres as needed
  };

  // Return the first genre from the list of genreIds
  return genreIds.length > 0 ? genres[genreIds[0]] || 'Unknown' : 'Unknown';
};

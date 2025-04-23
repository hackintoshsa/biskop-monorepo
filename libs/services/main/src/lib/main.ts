import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { TMDB_CONFIG } from './tmdbConfig';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  date = new Date();
  http = inject(HttpClient);
  config = inject(TMDB_CONFIG);

  private apiUrl = 'http://localhost:8080/auth/userInfo';

  getUserInfo(token: string) {
    return this.http.get('http://localhost:8080/auth/loginSuccess', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getExID(tmdbID?: any, type?: any): Observable<any> {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/${type}/${tmdbID}/external_ids?api_key=${this.config.tmbdbApiKey}`
    );
  }

  getPopularTvShows(numberOfPages: any): Observable<any> {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/tv/popular?api_key=${this.config.tmbdbApiKey}&language=en-US&page=${numberOfPages}`
    );
  }

  getTopRatedTvShows(numberOfPages: any): Observable<any> {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${this.config.tmbdbApiKey}&language=en-US&page=${numberOfPages}`
    );
  }

  getPopularMovies(numberOfPages: any): Observable<any> {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/movie/popular?api_key=${this.config.tmbdbApiKey}&language=en-US&page=${numberOfPages}`
    );
  }

  getTopMovies(numberOfPages: any): Observable<any> {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.config.tmbdbApiKey}&language=en-US&page=${numberOfPages}`
    );
  }

  getVideo(id: any, identifier?: any): Observable<any> {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/${identifier}/${id}/videos?api_key=${this.config.tmbdbApiKey}&language=en-US`
    );
  }

  getTrending(identifier: any): Observable<any> {
    return forkJoin([
      this.http.get<any>(
        `https://api.themoviedb.org/3/trending/movie/${identifier}?api_key=${this.config.tmbdbApiKey}`
      ),
      this.http.get<any>(
        `https://api.themoviedb.org/3/trending/tv/${identifier}?api_key=${this.config.tmbdbApiKey}`
      ),
    ]);
  }

  getTvShowDetails(seriesId: any): Observable<any> {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/tv/${seriesId}?api_key=${this.config.tmbdbApiKey}`
    );
  }

  getYearSortedMovies(movieDate: any, numberOfPages?: any): Observable<any> {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/discover/movie?primary_release_year=${movieDate}&api_key=${this.config.tmbdbApiKey}&page=${numberOfPages}&sort_by=popularity.desc&language=en-US`
    );
  }

  nowPlayingMovies(numberOfPages: any): Observable<any> {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.config.tmbdbApiKey}&language=en-US&page=${numberOfPages}`
    );
  }

  upComingMovies(numberOfPages: any): Observable<any> {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/discover/movie?api_key=${
        this.config.tmbdbApiKey
      }&language=en-US&page=${numberOfPages}&primary_release_year=${this.date.getFullYear()}&sort_by=popularity.desc&with_original_language=en`
    );
  }

  onAirToday(firstAirDate: any, numberOfPages: any): Observable<any> {
    return this.http.get<any>(
      `https://api.themoviedb.org/3/discover/tv?first_air_date_year=${firstAirDate}&sort_by=popularity.desc&with_original_language=en&api_key=${this.config.tmbdbApiKey}&page=${numberOfPages}`
    );
  }
}

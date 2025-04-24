import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../../blocks/home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'movies',
        loadComponent: () =>
          import('../../blocks/movies/movies.page').then((m) => m.MoviesPage),
      },
      {
        path: 'series',
        loadComponent: () =>
          import('../../blocks/series/series.page').then((m) => m.SeriesPage),
      },
      {
        path: 'search',
        loadComponent: () =>
          import('../../blocks/search/search.page').then((m) => m.SearchPage),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/series',
    pathMatch: 'full',
  },
];

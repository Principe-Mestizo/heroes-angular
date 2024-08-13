import { Routes } from '@angular/router';

export const HEROES_ROUTES: Routes = [
  {
    path: 'list',
    loadComponent: () => import('./pages/list-page/list-page.component'),
  },
  {
    path: 'new-hero',
    loadComponent: () => import('./pages/new-page/new-page.component'),
  },

  {
    path: 'search',
    loadComponent: () => import('./pages/search-page/search-page.component'),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./pages/new-page/new-page.component'),
  },

  {
    path: ':id',
    loadComponent: () => import('./pages/hero-page/hero-page.component'),
  },

  {
    path: '**',
    redirectTo: 'list',
  },
];

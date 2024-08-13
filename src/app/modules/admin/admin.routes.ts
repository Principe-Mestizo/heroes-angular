import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./../dashboard/dashboard.routes').then((m) => m.routes),
        title: 'App - Dashboard',
      },
      {
        path: 'heroes',
        loadChildren: () =>
          import('./../heroes/heroes.routes').then((m) => m.HEROES_ROUTES),
        title: ' App - Heroes',
      },
    ],
  },
];

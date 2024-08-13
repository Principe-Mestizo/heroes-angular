import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login/login.component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
];

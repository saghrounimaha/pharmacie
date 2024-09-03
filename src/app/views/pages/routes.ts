import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '404',
    loadComponent: () => import('./page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'forgot',
    loadComponent: () => import('./forgotpassword/forgotpassword.component').then(m => m.ForgotpasswordComponent),
    data: {
      title: 'Forgot Page'
    }
  },
  {
    path: 'reset/:token',
    loadComponent: () => import('./resetpassword/resetpassword.component').then(m => m.ResetpasswordComponent),
    data: {
      title: 'Reset Page'
    }
  },
  
];

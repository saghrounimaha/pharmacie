import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/routes').then((m) => m.routes)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/routes').then((m) => m.routes)
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/routes').then((m) => m.routes)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/routes').then((m) => m.routes)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/routes').then((m) => m.routes)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/routes').then((m) => m.routes)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/charts/routes').then((m) => m.routes)
      },
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
      }
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'forgot',
    loadComponent: () => import('./views/pages/forgotpassword/forgotpassword.component').then(m => m.ForgotpasswordComponent),
    data: {
      title: 'Forgot Page'
    }
  },
  {
    path: 'reset/:token',
    loadComponent: () => import('./views/pages/resetpassword/resetpassword.component').then(m => m.ResetpasswordComponent),
    data: {
      title: 'Reset Page'
    }
  },
  {
    path: 'addProduit',
    loadComponent: () => import('./views/base/addproduit/addproduit.component').then(m => m.AddproduitComponent),
    data: {
      title: 'Add Product '
    }
  },
  {
    path: 'Annonces',
    loadComponent: () => import('./views/base/add-annonces/add-annonces.component').then(m => m.AddAnnoncesComponent),
    data: {
      title: 'Add Annonces '
    }
  },
  {
    path: 'addCommande',
    loadComponent: () => import('./views/base/addcommande/addcommande.component').then(m => m.AddcommandeComponent),
    data: {
      title: 'Add Commandes '
    }
  },

  

  

  
  { path: '**', redirectTo: 'dashboard' }
];
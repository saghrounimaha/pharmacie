import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Elements'
    },
    children: [
      {
        path: '',
        redirectTo: 'cards',
        pathMatch: 'full'
      },
      {
        path: 'accordion',
        loadComponent: () => import('./accordion/accordions.component').then(m => m.AccordionsComponent),
        data: {
          title: 'utilisateur '
        }
      },
      {
        path: 'breadcrumbs',
        loadComponent: () => import('./breadcrumbs/breadcrumbs.component').then(m => m.BreadcrumbsComponent),
        data: {
          title: 'depot'
        },
        canActivate: ['Admin Depot'] // Apply guard here if needed

      },
      {
        path: 'cards',
        loadComponent: () => import('./cards/cards.component').then(m => m.CardsComponent),
        data: {
          title: 'Privilges'
        }
      },
      {
        path: 'carousel',
        loadComponent: () => import('./carousels/carousels.component').then(m => m.CarouselsComponent),
        data: {
          title: 'Privilges Roles'
        }
      },
      {
        path: 'collapse',
        loadComponent: () => import('./collapses/collapses.component').then(m => m.CollapsesComponent),
        data: {
          title: 'Commande'
        }
      },
      {
        path: 'list-group',
        loadComponent: () => import('./list-groups/list-groups.component').then(m => m.ListGroupsComponent),
        data: {
          title: 'Client'
        }
      },
      {
        path: 'navs',
        loadComponent: () => import('./navs/navs.component').then(m => m.NavsComponent),
        data: {
          title: 'Produits'
        }
      },
      {
        path: 'pagination',
        loadComponent: () => import('./paginations/paginations.component').then(m => m.PaginationsComponent),
        data: {
          title: 'Groupe'
        }
      },
      {
        path: 'placeholder',
        loadComponent: () => import('./placeholders/placeholders.component').then(m => m.PlaceholdersComponent),
        data: {
          title: 'Groupe Clts'
        }
      },
      {
        path: 'popovers',
        loadComponent: () => import('./popovers/popovers.component').then(m => m.PopoversComponent),
        data: {
          title: 'Static Component'
        }
      },
      {
        path: 'progress',
        loadComponent: () => import('./progress/progress.component').then(m => m.ProgressComponent),
        data: {
          title: 'Setting'
        }
      },
      {
        path: 'spinners',
        loadComponent: () => import('./spinners/spinners.component').then(m => m.SpinnersComponent),
        data: {
          title: 'Email Template'
        }
      },

      {
        path: 'emailQueues',
        loadComponent: () => import('./email-queues/email-queues.component').then(m => m.EmailQueuesComponent),
        data: {
          title: 'Email Queues'
        }
      },


      {
        path: 'tables',
        loadComponent: () => import('./tables/tables.component').then(m => m.TablesComponent),
        data: {
          title: 'Mode de Paiement'
        }
      },
      {
        path: 'tabs',
        loadComponent: () => import('./tabs/tabs.component').then(m => m.AppTabsComponent),
        data: {
          title: 'Section'
        }
      },
      {
        path: 'tooltips',
        loadComponent: () => import('./tooltips/tooltips.component').then(m => m.TooltipsComponent),
        data: {
          title: 'Depot Sections'
        }
      },
      {
        path: 'bon-liv',
        loadComponent: () => import('./bon-liv/bon-liv.component').then(m => m.BonLivComponent),
        data: {
          title: 'Bon liv'
        }
      },
      {
        path: 'bon-liv-lg',
        loadComponent: () => import('./bon-liv-lg/bon-liv-lg.component').then(m => m.BonLivLGComponent),
        data: {
          title: 'Bon liv LG'
        }
      },
      {
        path: 'lignecommande',
        loadComponent: () => import('./ligne-commande/ligne-commande.component').then(m => m.LigneCommandeComponent),
        data: {
          title: 'Ligne de Commandes'
        }
      },
      {
        path: 'typecommande',
        loadComponent: () => import('./type-commande/type-commande.component').then(m => m.TypeCommandeComponent),
        data: {
          title: 'Type de Commandes'
        }
      },
      {
        path: 'statuscommande',
        loadComponent: () => import('./status-commande/status-commande.component').then(m => m.StatusCommandeComponent),
        data: {
          title: 'Status de Commandes'
        }
      },
      {
        path: 'statuscmds',
        loadComponent: () => import('./status-cmds/status-cmds.component').then(m => m.StatusCmdsComponent),
        data: {
          title: 'Status de Cmds'
        }
      },
      {
        path: 'reclamation',
        loadComponent: () => import('./reclamations/reclamations.component').then(m => m.ReclamationsComponent),
        data: {
          title: 'Reclamations'
        }
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
        data: {
          title: 'Dashboard'
        }
      },

      {
        path: 'notifications',
        loadComponent: () => import('./notifications/notifications.component').then(m => m.NotificationsComponent),
        data: {
          title: 'notifications'
        }
      },
      {
        path: 'cmsnotifications',
        loadComponent: () => import('./cms-notifications/cms-notifications.component').then(m => m.CmsNotificationsComponent),
        data: {
          title: 'cms Notifications'
        }
      },
      {
        path: 'notificationsfcms',
        loadComponent: () => import('./notifications-fcms/notifications-fcms.component').then(m => m.NotificationsFcmsComponent),
        data: {
          title: 'Notifications FCMS'
        }
      },

      {
        path: 'parametreCommande',
        loadComponent: () => import('./parametre-commande/parametre-commande.component').then(m => m.ParametreCommandeComponent),
        data: {
          title: 'Parametre Commande '
        }
      },
      {
        path: 'annonces',
        loadComponent: () => import('./annonces/annonces.component').then(m => m.AnnoncesComponent),
        data: {
          title: 'Annonces '
        }
      },

      {
        path: 'calendrier',
        loadComponent: () => import('./calendrier/calendrier.component').then(m => m.CalendrierComponent),
        data: {
          title: 'Calendrier '
        }
      },
      {
        path: 'emailQueues',
        loadComponent: () => import('./email-queues/email-queues.component').then(m => m.EmailQueuesComponent),
        data: {
          title: 'emailQueues '
        }
      },

      {
        path: 'menus',
        loadComponent: () => import('./menus/menus.component').then(m => m.MenusComponent),
        data: {
          title: 'Menus '
        }
      },
      {
        path: 'livraison',
        loadComponent: () => import('./jour-livraision/jour-livraision.component').then(m => m.JourLivraisionComponent),
        data: {
          title: 'Livraison '
        }
      },

      {
        path: 'apiCustom',
        loadComponent: () => import('./api-custom/api-custom.component').then(m => m.ApiCustomComponent),
        data: {
          title: 'Customer '
        }
      },
      {
        path: 'addProduit',
        loadComponent: () => import('./addproduit/addproduit.component').then(m => m.AddproduitComponent),
        data: {
          title: 'add Product '
        }
      },
      {
        path: 'Annonces',
        loadComponent: () => import('./add-annonces/add-annonces.component').then(m => m.AddAnnoncesComponent),
        data: {
          title: 'add Annonce '
        }
      },
      {
        path: 'addCommande',
        loadComponent: () => import('./addcommande/addcommande.component').then(m => m.AddcommandeComponent),
        data: {
          title: 'add Commande '
        }
      },























    ]
  }
];



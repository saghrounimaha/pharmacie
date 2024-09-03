import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: 'info',
      text: 'NEW'
    }
  },
  
  // {
  //   title: true,
  //   name: 'Theme'
  // },
  // {
  //   name: 'Colors',
  //   url: '/theme/colors',
  //   iconComponent: { name: 'cil-drop' }
  // },
  // {
  //   name: 'Typography',
  //   url: '/theme/typography',
  //   linkProps: { fragment: 'headings' },
  //   iconComponent: { name: 'cil-pencil' }
  // },
  {
    name: 'Components',
    title: true
  },
  {
    name: 'Elements',
    url: '/base',
    iconComponent: { name: 'cil-puzzle' },
    children: [
      {
        name: 'Utilisateur',
        url: '/base/accordion',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Depot',
        url: '/base/breadcrumbs',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Privileges',
        url: '/base/cards',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Privileges Role',
        url: '/base/carousel',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Commande',
        url: '/base/collapse',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Client',
        url: '/base/list-group',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Produits',
        url: '/base/navs',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Groupe',
        url: '/base/pagination',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Groupe Clts',
        url: '/base/placeholder',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Static Component',
        url: '/base/popovers',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Settings',
        url: '/base/progress',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Email Template',
        url: '/base/spinners',
        icon: 'nav-icon-bullet'
      },

      {
        name: 'Email Queues',
        url: '/base/emailQueues',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Mode de Payement',
        url: '/base/tables',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Sections',
        url: '/base/tabs',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Depot Sections',
        url: '/base/tooltips',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Bon liv',
        url: '/base/bon-liv',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Bon LIV LG ',
        url: '/base/bon-liv-lg',
        icon: 'nav-icon-bullet'
      },

      
      {
        name: 'ligne commande',
        url: '/base/lignecommande',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'type commande',
        url: '/base/typecommande',
        icon: 'nav-icon-bullet'
      }
      ,
      {
        name: 'status commande',
        url: '/base/statuscommande',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'status cmds',
        url: '/base/statuscmds',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Reclamations',
        url: '/base/reclamation',
        icon: 'nav-icon-bullet'
      },
      
      {
        name: 'Dashboard',
        url: '/base/dashboard',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Notifications',
        url: '/base/notifications',
        icon: 'nav-icon-bullet'
      },
      
      {
        name: 'CMS Notifications',
        url: '/base/cmsnotifications',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Notifications FCMS',
        url: '/base/notificationsfcms',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Parametre Commande',
        url: '/base/parametreCommande',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Liste des Annonces',
        url: '/base/annonces',
        icon: 'nav-icon-bullet'
      },

      {
        name: 'Calendrier',
        url: '/base/calendrier',
        icon: 'nav-icon-bullet'
      },

      {
        name: 'Menus',
        url: '/base/menus',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Livraison',
        url: '/base/livraison',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Customer',
        url: '/base/apiCustom',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Annonces',
        url: '/base/Annonces',
        icon: 'nav-icon-bullet'
      },

      {
        name: 'Add Commandes',
        url: '/base/addCommande',
        icon: 'nav-icon-bullet'
      },

      
      
      

    ]
  },
  // elements for the create and update items 
  
  // {
  //   name: 'Elements',
  //   url: '/base',
  //   iconComponent: { name: 'cil-puzzle' },
  //   children: [
  //     {
  //       name: 'Utilisateur',
  //       url: '/base/accordion',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Depot',
  //       url: '/base/breadcrumbs',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Cards',
  //       url: '/base/cards',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Carousel',
  //       url: '/base/carousel',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Collapse',
  //       url: '/base/collapse',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'List Group',
  //       url: '/base/list-group',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Navs & Tabs',
  //       url: '/base/navs',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Pagination',
  //       url: '/base/pagination',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Placeholder',
  //       url: '/base/placeholder',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Popovers',
  //       url: '/base/popovers',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Progress',
  //       url: '/base/progress',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Spinners',
  //       url: '/base/spinners',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Tables',
  //       url: '/base/tables',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Tabs',
  //       url: '/base/tabs',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Tooltips',
  //       url: '/base/tooltips',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
  // {
  //   name: 'Buttons',
  //   url: '/buttons',
  //   iconComponent: { name: 'cil-cursor' },
  //   children: [
  //     {
  //       name: 'Buttons',
  //       url: '/buttons/buttons',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Button groups',
  //       url: '/buttons/button-groups',
  //       icon: 'nav-icon-bullet'
  //     },
  //     {
  //       name: 'Dropdowns',
  //       url: '/buttons/dropdowns',
  //       icon: 'nav-icon-bullet'
  //     }
  //   ]
  // },
//   {
//     name: 'Forms',
//     url: '/forms',
//     iconComponent: { name: 'cil-notes' },
//     children: [
//       {
//         name: 'Form Control',
//         url: '/forms/form-control',
//         icon: 'nav-icon-bullet'
//       },
//       {
//         name: 'Select',
//         url: '/forms/select',
//         icon: 'nav-icon-bullet'
//       },
//       {
//         name: 'Checks & Radios',
//         url: '/forms/checks-radios',
//         icon: 'nav-icon-bullet'
//       },
//       {
//         name: 'Range',
//         url: '/forms/range',
//         icon: 'nav-icon-bullet'
//       },
//       {
//         name: 'Input Group',
//         url: '/forms/input-group',
//         icon: 'nav-icon-bullet'
//       },
//       {
//         name: 'Floating Labels',
//         url: '/forms/floating-labels',
//         icon: 'nav-icon-bullet'
//       },
//       {
//         name: 'Layout',
//         url: '/forms/layout',
//         icon: 'nav-icon-bullet'
//       },
//       {
//         name: 'Validation',
//         url: '/forms/validation',
//         icon: 'nav-icon-bullet'
//       }
//     ]
//   },
//   {
//     name: 'Charts',
//     iconComponent: { name: 'cil-chart-pie' },
//     url: '/charts'
//   },
//   {
//     name: 'Icons',
//     iconComponent: { name: 'cil-star' },
//     url: '/icons',
//     children: [
//       {
//         name: 'CoreUI Free',
//         url: '/icons/coreui-icons',
//         icon: 'nav-icon-bullet',
//         badge: {
//           color: 'success',
//           text: 'FREE'
//         }
//       },
//       {
//         name: 'CoreUI Flags',
//         url: '/icons/flags',
//         icon: 'nav-icon-bullet'
//       },
//       {
//         name: 'CoreUI Brands',
//         url: '/icons/brands',
//         icon: 'nav-icon-bullet'
//       }
//     ]
//   },
//   {
//     name: 'Notifications',
//     url: '/notifications',
//     iconComponent: { name: 'cil-bell' },
//     children: [
//       {
//         name: 'Alerts',
//         url: '/notifications/alerts',
//         icon: 'nav-icon-bullet'
//       },
//       {
//         name: 'Badges',
//         url: '/notifications/badges',
//         icon: 'nav-icon-bullet'
//       },
//       {
//         name: 'Modal',
//         url: '/notifications/modal',
//         icon: 'nav-icon-bullet'
//       },
//       {
//         name: 'Toast',
//         url: '/notifications/toasts',
//         icon: 'nav-icon-bullet'
//       }
//     ]
//   },
//   {
//     name: 'Widgets',
//     url: '/widgets',
//     iconComponent: { name: 'cil-calculator' },
//     badge: {
//       color: 'info',
//       text: 'NEW'
//     }
//   },
//   {
//     title: true,
//     name: 'Extras'
//   },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'forgot',
        url: '/forgot',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'reset',
        url: '/reset',
        icon: 'nav-icon-bullet'
      },

      {
        name: 'Error 404',
        url: '/404',
        icon: 'nav-icon-bullet'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'nav-icon-bullet'
      }
    ]
  },
   {
     title: true,
     name: 'Links',
     class: 'mt-auto'
   },
   {
     name: 'Docs',
     url: 'https://coreui.io/angular/docs/5.x/',
     iconComponent: { name: 'cil-description' },
     attributes: { target: '_blank' }
   }

]

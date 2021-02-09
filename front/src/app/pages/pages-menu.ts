import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Accueil',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'ADMIN',
    group: true,
  },
  {
    title: 'Utilisateur',
    icon: 'people-outline',
    children: [
      {
        title: 'Création',
        link: '/pages/quotation/create',
      },
      {
        title: 'Consultation',
        link: '/pages/users',
      },
    ],
  },
  {
    title: 'ESPACE COMMERCIAL',
    group: true,
  },
  {
    title: 'Devis',
    icon: 'folder-outline',
    children: [
      {
        title: 'Création',
        link: '/pages/quotation/create',
      },
      {
        title: 'Consultation',
        link: '/pages/devis/list',
      },
    ],
  },
  {
    title: 'Clients',
    icon: 'person-outline',
    children: [
      {
        title: 'Création',
        link: '/pages/customers/create',
      },
      {
        title: 'Consultation',
        link: '/pages/customers/list',
      },
    ],
  },
  {
    title: 'ESPACE GESTION',
    group: true,
  },
  {
    title: 'Modules',
    icon: 'npm-outline',
    children: [
      {
        title: 'Création',
        link: '/pages/modules/create',
      },
      {
        title: 'Consultation',
        link: '/pages/modules/list',
      },
    ],
  },
  {
    title: 'Composant',
    icon: 'pantone-outline',
    children: [
      {
        title: 'Création',
        link: '/pages/composant/create',
      },
      {
        title: 'Consultation',
        link: '/pages/composant/list',
      },
    ],
  },
  {
    title: 'Stock',
    icon: 'car-outline',
    link: '/pages/stocks',
    home: true,
  },
];

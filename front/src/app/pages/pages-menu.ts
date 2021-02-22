import { NbMenuItem } from '@nebular/theme';

// Menu par de tout le monde
export const DEFAULT_MENU: NbMenuItem[] = [
  {
    title: 'Accueil',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
];

// Menu du rôle default
export const MENU_USER: NbMenuItem[] = [
  ...DEFAULT_MENU,
];

// Menu du rôle commercial
export const MENU_COMMERCIAL: NbMenuItem[] = [
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
        link: '/pages/quotation',
      },
    ],
  },
  {
    title: 'Clients',
    icon: 'person-outline',
    link: '/pages/customers',
  },
];

// Menu du rôle stock
export const MENU_STOCK: NbMenuItem[] = [
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
        link: '/pages/modules',
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
        link: '/pages/composant',
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

// Menu du rôle admin
export const MENU_ADMIN: NbMenuItem[] = [
  {
    title: 'ADMIN',
    group: true,
  },
  {
    title: 'Utilisateur',
    icon: 'people-outline',
    link: '/pages/users',
  },
  ...MENU_COMMERCIAL,
  ...MENU_STOCK,
];


import { menuItems, MENU_CODES } from '@baseUtils/constants';

export const menus = [
  {
    name: 'Dashboard',
    path: '/',
    icon: 'icons/dashboard.svg',
    submenu: []
  },
  // Inject Menu Item!
  ...menuItems
];

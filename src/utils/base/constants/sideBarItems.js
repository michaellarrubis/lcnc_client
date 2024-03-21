import { MENU_CODES } from './menuCodes';

export const menuItems = [
  {
    name: 'Cost Center',
    path: '/#',
    icon: 'icons/cost-center.svg',
    submenu: [
      {
        name: 'Cost Center',
        path: '/cost-center',
        code: MENU_CODES.COST_CENTER
      },
      {
        name: 'Division',
        path: '/cost-center/division',
        code: MENU_CODES.DIVISION
      },
      {
        name: 'Department',
        path: '/cost-center/department',
        code: MENU_CODES.DEPARTMENT
      },
      {
        name: 'Section',
        path: '/cost-center/section',
        code: MENU_CODES.SECTION
      },
      {
        name: 'Sub Section',
        path: '/cost-center/sub-section',
        code: MENU_CODES.SUB_SECTION
      }
    ]
  },
  {
    name: 'System',
    path: '/#',
    icon: 'icons/projects.svg',
    submenu: [
      {
        name: 'User List',
        path: '/users',
        code: MENU_CODES.userList
      },
      {
        name: 'User Access',
        path: '/users-access',
        code: MENU_CODES.groupList
      },
      {
        name: 'Company Information',
        path: '/company-information',
        code: MENU_CODES.companyInformation
      }
    ]
  }
];

import usersReducer from './users/userReducers';
import userGroupReducer from './userGroups/userGroupReducers';
import costCenterListReducer from './costcenter/costcenterReducers';
import departmentsReducer from './departments/departmentsReducers';
import datatableSelectedIds from './datatable/datatableReducers';
import divisionsReducer from './divisions/divisionsReducers';
import sectionsReducer from './sections/sectionsReducers';
import subsectionsReducer from './subsections/subsectionsReducers';
import positionsReducer from './positions/positionsReducers';
import menuReducer from './menus/menuReducers';
import userMenuReducers from './userMenus/userMenuReducers';
import CompanyReducers from './companyInfo/companyInfoReducers';

export const baseReducers = {
  user: usersReducer,
  userGroup: userGroupReducer,
  userMenu: userMenuReducers,
  userCompany: CompanyReducers,
  costCenter: costCenterListReducer,
  departments: departmentsReducer,
  datatable: datatableSelectedIds,
  divisions: divisionsReducer,
  sections: sectionsReducer,
  subSections: subsectionsReducer,
  positions: positionsReducer,
  menu: menuReducer
};

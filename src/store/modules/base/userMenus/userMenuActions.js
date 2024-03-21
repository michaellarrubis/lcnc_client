import { getUserMenusService } from 'src/api/modules/base/userMenus';
import { SET_USER_MENUS } from './userMenuTypes';

export function setUserMenus(payload) {
  return { type: SET_USER_MENUS, payload };
}

export function getUserMenus() {
  return async dispatch => {
    const response = await getUserMenusService();
    if (response?.data) dispatch(setUserMenus(response.data));
  };
}

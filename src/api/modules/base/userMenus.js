import { USER_MENUS, MENUS } from 'src/api/endpoints';
import { fetchAPI } from 'src/api/fetchAPI';

export const getUserMenusService = async () => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: USER_MENUS
    });
  } catch (error) {
    return error;
  }
};

export const getUserMenusServiceByMenuCode = async menuCode => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: `${USER_MENUS}/?code=${menuCode}`
    });
  } catch (error) {
    return error;
  }
};

export const getUserMenusServiceByCode = async code => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: `${MENUS}?search=${code}`
    });
  } catch (error) {
    return error;
  }
};

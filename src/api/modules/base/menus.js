import { MENUS } from 'src/api/endpoints';
import { fetchAPI } from 'src/api/fetchAPI';

export const getAllMenusService = async () => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: `${MENUS}/all`
    });
  } catch (error) {
    return error;
  }
};

export const getMenusService = async () => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: MENUS
    });
  } catch (error) {
    return error;
  }
};

export const getSearchMenusService = async data => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: `${MENUS}?search=${data}`
    });
  } catch (error) {
    return error;
  }
};

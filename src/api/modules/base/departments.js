import { MENU_CODES, MENU_ACTIONS } from '@baseUtils/constants';
import { DEPARTMENTS } from 'src/api/endpoints';
import { fetchAPI } from 'src/api/fetchAPI';
import { queryParamsBuilder } from '@baseUtils';

export const getDepartmentsService = async () => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: DEPARTMENTS
    });
  } catch (error) {
    return error;
  }
};

export const addDepartmentService = async data => {
  try {
    return await fetchAPI({
      method: 'POST',
      endpoint: DEPARTMENTS,
      body: data,
      headers: {
        'menu-code': MENU_CODES.DEPARTMENT,
        'menu-action': MENU_ACTIONS.CRUD
      }
    });
  } catch (error) {
    return error.response;
  }
};

export const getDepartmentsServiceByPage = async (page, searchParams) => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: queryParamsBuilder(DEPARTMENTS, page, searchParams)
    });
  } catch (error) {
    return error;
  }
};

export const getDepartmentByIDService = async (id, method) => {
  try {
    return await fetchAPI({
      method,
      endpoint: `${DEPARTMENTS}/${id}`
    });
  } catch (error) {
    return error;
  }
};

export const updateDepartmentByIDService = async (code, data) => {
  try {
    return await fetchAPI({
      method: 'PUT',
      endpoint: `${DEPARTMENTS}/${code}`,
      body: data
    });
  } catch (error) {
    return error;
  }
};

export const getAllDepartmentItemService = async () => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: `${DEPARTMENTS}?all=true`
    });
  } catch (error) {
    return error;
  }
};

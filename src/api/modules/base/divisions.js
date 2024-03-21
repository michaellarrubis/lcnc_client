import { MENU_CODES, MENU_ACTIONS } from '@baseUtils/constants';
import { DIVISIONS } from 'src/api/endpoints';
import { fetchAPI } from 'src/api/fetchAPI';
import { queryParamsBuilder } from '@baseUtils';

export const getDivisionsService = async () => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: DIVISIONS
    });
  } catch (error) {
    return error;
  }
};

export const addDivisionService = async data => {
  try {
    return await fetchAPI({
      method: 'POST',
      endpoint: DIVISIONS,
      body: data,
      headers: {
        'menu-code': MENU_CODES.DIVISION,
        'menu-action': MENU_ACTIONS.CRUD
      }
    });
  } catch (error) {
    return error.response;
  }
};

export const getDivisionItemsService = async (page, searchParams) => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: queryParamsBuilder(DIVISIONS, page, searchParams)
    });
  } catch (error) {
    return error;
  }
};

export const getDivisionByIDService = async code => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: `${DIVISIONS}/${code}`
    });
  } catch (error) {
    return error;
  }
};

export const deleteDivisionById = async code => {
  try {
    return await fetchAPI({
      method: 'DELETE',
      endpoint: `${DIVISIONS}/${code}`
    });
  } catch (error) {
    return error;
  }
};

export const updateDivisionById = async (code, data) => {
  try {
    return await fetchAPI({
      method: 'PUT',
      endpoint: `${DIVISIONS}/${code}`,
      body: data
    });
  } catch (error) {
    return error;
  }
};

export const getAllDivisionItemService = async () => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: `${DIVISIONS}?all=true`
    });
  } catch (error) {
    return error;
  }
};

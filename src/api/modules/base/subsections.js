import { MENU_CODES, MENU_ACTIONS } from '@baseUtils/constants';
import { SUB_SECTIONS } from 'src/api/endpoints';
import { fetchAPI } from 'src/api/fetchAPI';
import { queryParamsBuilder } from '@baseUtils';

export const getSubSectionsService = async () => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: SUB_SECTIONS
    });
  } catch (error) {
    return error;
  }
};

export const getSubSectionList = async (page, searchParams) => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: queryParamsBuilder(SUB_SECTIONS, page, searchParams)
    });
  } catch (error) {
    return error;
  }
};

export const getSubSectionService = async (code, method) => {
  try {
    return await fetchAPI({
      method,
      endpoint: `${SUB_SECTIONS}/${code}`
    });
  } catch (error) {
    return error;
  }
};

export const addSubSectionService = async data => {
  try {
    return await fetchAPI({
      method: 'POST',
      endpoint: SUB_SECTIONS,
      body: data,
      headers: {
        'menu-code': MENU_CODES.SUB_SECTION,
        'menu-action': MENU_ACTIONS.CRUD
      }
    });
  } catch (error) {
    return error.response;
  }
};

export const updateSubSectionService = async (code, data) => {
  try {
    return await fetchAPI({
      method: 'PUT',
      endpoint: `${SUB_SECTIONS}/${code}`,
      body: data
    });
  } catch (error) {
    return error;
  }
};

export const getAllSubSectionService = async () => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: `${SUB_SECTIONS}?all=true`
    });
  } catch (error) {
    return error;
  }
};

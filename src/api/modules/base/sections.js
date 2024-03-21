import { SECTIONS } from 'src/api/endpoints';
import { fetchAPI } from 'src/api/fetchAPI';
import { queryParamsBuilder } from '@baseUtils';

export const getAllSectionService = async () => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: SECTIONS
    });
  } catch (error) {
    return error;
  }
};

export const getSectionsService = async (page, searchParams) => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: queryParamsBuilder(SECTIONS, page, searchParams)
    });
  } catch (error) {
    return error;
  }
};

export const getSectionByIDService = async (code, method) => {
  try {
    return await fetchAPI({
      method,
      endpoint: `${SECTIONS}/${code}`
    });
  } catch (error) {
    return error;
  }
};

export const addSectionService = async data => {
  try {
    return await fetchAPI({
      method: 'POST',
      endpoint: SECTIONS,
      body: data
    });
  } catch (error) {
    return error.response;
  }
};

export const updateSectionById = async (code, data) => {
  try {
    return await fetchAPI({
      method: 'PUT',
      endpoint: `${SECTIONS}/${code}`,
      body: data
    });
  } catch (error) {
    return error.response;
  }
};

export const getAllItemSectionService = async () => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: `${SECTIONS}?all=true`
    });
  } catch (error) {
    return error;
  }
};

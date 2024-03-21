import { COST_CENTER, UPDATE_COST_CENTER_BY_USER } from 'src/api/endpoints';
import { fetchAPI } from 'src/api/fetchAPI';
import { queryParamsBuilder } from '@baseUtils';

export const getCostCenterService = async () => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: COST_CENTER
    });
  } catch (error) {
    return error;
  }
};

export const getAllCostCenterItemService = async () => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: `${COST_CENTER}?all=true`
    });
  } catch (error) {
    return error;
  }
};

export const getCostCenterDataItems = async (page, searchParams) => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: queryParamsBuilder(COST_CENTER, page, searchParams)
    });
  } catch (error) {
    return error;
  }
};

export const updateCostCenterByUserId = async data => {
  try {
    return await fetchAPI({
      method: 'PUT',
      endpoint: UPDATE_COST_CENTER_BY_USER,
      body: data
    });
  } catch (error) {
    return error;
  }
};

export const getCostCenterByIDService = async code => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: `${COST_CENTER}/${code}`
    });
  } catch (error) {
    return error;
  }
};

export const updateCostCenterService = async (code, data) => {
  try {
    return await fetchAPI({
      method: 'PUT',
      endpoint: `${COST_CENTER}/${code}`,
      body: data
    });
  } catch (error) {
    return error.response;
  }
};

export const addCostCenterService = async data => {
  try {
    return await fetchAPI({
      method: 'POST',
      endpoint: COST_CENTER,
      body: data
    });
  } catch (error) {
    return error.response;
  }
};

export const deleteCostCenterService = async code => {
  try {
    return await fetchAPI({
      method: 'DELETE',
      endpoint: `${COST_CENTER}/${code}`
    });
  } catch (error) {
    return error;
  }
};

export const deleteBulkCostCenter = async (ids, endpoint) => {
  try {
    return await fetchAPI({
      method: 'DELETE',
      endpoint,
      body: { ids }
    });
  } catch (error) {
    return error.response;
  }
};

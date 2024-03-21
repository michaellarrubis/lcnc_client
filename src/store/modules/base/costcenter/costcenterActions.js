/* eslint-disable func-names */
import {
  getCostCenterService,
  getCostCenterByIDService,
  getCostCenterDataItems,
  getAllCostCenterItemService
} from 'src/api/modules/base/costCenter';
import {
  GET_COST_CENTER_LIST,
  GET_ALL_COST_CENTER,
  GET_ALL_ITEMS
} from './costcenterTypes';

export function setCostCenterList(data) {
  return { type: GET_COST_CENTER_LIST, payload: data };
}

export function setAllCostCenterList(data) {
  return { type: GET_ALL_COST_CENTER, payload: data };
}

export function setAllCostCenterItems(data) {
  return { type: GET_ALL_ITEMS, payload: data };
}

export function getCostCenterItems(objectList) {
  return function setUserDataListAction(dispatch) {
    dispatch(setCostCenterList(objectList));
  };
}

export function getCostCenterList() {
  return async function (dispatch) {
    const response = await getCostCenterService();
    if (response?.success && response?.data)
      dispatch(setCostCenterList(response.data));
  };
}

export function getAllCostCenterItems() {
  return async function (dispatch) {
    const response = await getAllCostCenterItemService();
    if (response?.success && response?.data) {
      dispatch(setAllCostCenterItems(response.data));
    }
  };
}

export function getAllCostCenterService() {
  return async function (dispatch) {
    const response = await getCostCenterDataItems(1);
    if (response?.success && response?.data)
      dispatch(setAllCostCenterList(response.data));
  };
}

export function getCostCenterById(costCenterId) {
  return async function () {
    return getCostCenterByIDService(costCenterId);
  };
}

/* eslint-disable func-names */
import {
  getDivisionsService,
  getDivisionByIDService,
  getAllDivisionItemService
} from 'src/api/modules/base/divisions';
import { GET_DIVISIONS_LIST, GET_ALL_DIVISION_ITEM } from './divisionsTypes';

export function setDivisions(data) {
  return { type: GET_DIVISIONS_LIST, payload: data };
}

export function setAllDivisions(data) {
  return { type: GET_ALL_DIVISION_ITEM, payload: data };
}

export function getDivisions() {
  return async function (dispatch) {
    const response = await getDivisionsService();
    if (response?.success && response?.data)
      dispatch(setDivisions(response.data));
  };
}

export function getDivisionsList(objectList) {
  return function setDivisionListAction(dispatch) {
    dispatch(setDivisions(objectList));
  };
}

export function getDivisionsByID(divisionId) {
  return async function () {
    return getDivisionByIDService(divisionId);
  };
}

export function getAllDivision() {
  return async function (dispatch) {
    const response = await getAllDivisionItemService();
    if (response?.success && response?.data)
      dispatch(setAllDivisions(response.data));
  };
}

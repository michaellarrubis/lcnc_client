/* eslint-disable func-names */
import {
  getDepartmentsService,
  getDepartmentByIDService,
  getAllDepartmentItemService
} from 'src/api/modules/base/departments';
import {
  GET_DEPARTMENTS_LIST,
  GET_ALL_DEPARTMENTS_LIST
} from './departmentsTypes';

export function setDepartments(data) {
  return { type: GET_DEPARTMENTS_LIST, payload: data };
}

export function setAllDepartments(data) {
  return { type: GET_ALL_DEPARTMENTS_LIST, payload: data };
}

export function getDepartments() {
  return async function (dispatch) {
    const response = await getDepartmentsService();
    if (response?.success && response?.data)
      dispatch(setDepartments(response.data));
  };
}

export function getAllDepartment() {
  return async function (dispatch) {
    const response = await getAllDepartmentItemService();
    if (response?.success && response?.data)
      dispatch(setAllDepartments(response.data));
  };
}

export function getDepartmentsByID(departmentId) {
  return async function () {
    return getDepartmentByIDService(departmentId);
  };
}

export function getDepartmentList(objectList) {
  return function setUserDataListAction(dispatch) {
    dispatch(setDepartments(objectList));
  };
}

/* eslint-disable func-names */
import {
  getAllMenusService,
  getMenusService
} from 'src/api/modules/base/menus';
import { SET_MENUS } from './menuTypes';

export function setMenus(payload) {
  return { type: SET_MENUS, payload };
}

export function getAllMenus() {
  return async function (dispatch) {
    const response = await getAllMenusService();
    if (response?.data) dispatch(setMenus(response.data));
  };
}

export function getMenus() {
  return async function (dispatch) {
    const response = await getMenusService();
    if (response?.data) dispatch(setMenus(response.data));
  };
}

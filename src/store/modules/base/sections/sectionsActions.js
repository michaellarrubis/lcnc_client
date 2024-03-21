import {
  getSectionByIDService,
  getAllSectionService,
  getAllItemSectionService
} from 'src/api/modules/base/sections';
import { GET_ADMIN_SECTIONS_LIST, GET_ALL_SECTION } from './sectionsTypes';

export function setSections(data) {
  return { type: GET_ADMIN_SECTIONS_LIST, payload: data };
}

export function setAllSections(data) {
  return { type: GET_ALL_SECTION, payload: data };
}

export function getSections() {
  return async function (dispatch) {
    const response = await getAllSectionService();
    if (response?.success && response?.data)
      dispatch(setSections(response.data));
  };
}

export function getSectionByID(sectionId) {
  return async function () {
    return getSectionByIDService(sectionId);
  };
}

export function getAllSection() {
  return async function (dispatch) {
    const response = await getAllItemSectionService();
    if (response?.success && response?.data)
      dispatch(setAllSections(response.data));
  };
}

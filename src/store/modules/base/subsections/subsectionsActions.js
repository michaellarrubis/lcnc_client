/* eslint-disable func-names */
import {
  getSubSectionsService,
  getAllSubSectionService
} from 'src/api/modules/base/subsections';
import {
  GET_ADMIN_SUB_SECTIONS_LIST,
  GET_ALL_SUB_SECTION
} from './subsectionsTypes';

export function setSubSections(data) {
  return { type: GET_ADMIN_SUB_SECTIONS_LIST, payload: data };
}

export function setAllSubSection(data) {
  return { type: GET_ALL_SUB_SECTION, payload: data };
}

export function getSubSections() {
  return async function (dispatch) {
    const response = await getSubSectionsService();
    if (response?.success && response?.data)
      dispatch(setSubSections(response.data));
  };
}

export function getAllSubSection() {
  return async function (dispatch) {
    const response = await getAllSubSectionService();
    if (response?.success && response?.data)
      dispatch(setAllSubSection(response.data));
  };
}

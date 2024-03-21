import { GET_DATATABLE_SELECTED_IDS } from './datatableTypes';

export function setIdSelection(data) {
  return { type: GET_DATATABLE_SELECTED_IDS, payload: data };
}

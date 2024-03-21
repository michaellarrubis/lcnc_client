import { GET_DATATABLE_SELECTED_IDS } from './datatableTypes';

const INITIAL_STATE = {
  ids: []
};

export default function datatableSelectedIds(
  state = INITIAL_STATE,
  { type, payload } = {}
) {
  switch (type) {
    case GET_DATATABLE_SELECTED_IDS:
      return {
        ...state,
        ids: payload
      };
    default:
      return state;
  }
}

import {
  GET_ADMIN_SUB_SECTIONS_LIST,
  GET_ALL_SUB_SECTION
} from './subsectionsTypes';

const INITIAL_STATE = {
  subSections: [],
  all: []
};

export default function sectionsReducer(
  state = INITIAL_STATE,
  { type, payload } = {}
) {
  switch (type) {
    case GET_ADMIN_SUB_SECTIONS_LIST:
      return {
        ...state,
        subSections: payload
      };
    case GET_ALL_SUB_SECTION:
      return {
        ...state,
        all: payload
      };
    default:
      return state;
  }
}

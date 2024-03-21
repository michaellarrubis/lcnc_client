import { GET_ADMIN_SECTIONS_LIST, GET_ALL_SECTION } from './sectionsTypes';

const INITIAL_STATE = {
  sections: [],
  all: []
};

export default function sectionsReducer(
  state = INITIAL_STATE,
  { type, payload } = {}
) {
  switch (type) {
    case GET_ADMIN_SECTIONS_LIST:
      return {
        ...state,
        sections: payload
      };
    case GET_ALL_SECTION:
      return {
        ...state,
        all: payload
      };
    default:
      return state;
  }
}

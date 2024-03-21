import {
  GET_DEPARTMENTS_LIST,
  GET_ALL_DEPARTMENTS_LIST
} from './departmentsTypes';

const INITIAL_STATE = {
  departments: [],
  all: []
};

export default function departmentsReducer(
  state = INITIAL_STATE,
  { type, payload } = {}
) {
  switch (type) {
    case GET_DEPARTMENTS_LIST:
      return {
        ...state,
        departments: payload
      };
    case GET_ALL_DEPARTMENTS_LIST:
      return {
        ...state,
        all: payload
      };
    default:
      return state;
  }
}

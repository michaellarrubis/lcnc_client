import { GET_DIVISIONS_LIST, GET_ALL_DIVISION_ITEM } from './divisionsTypes';

const INITIAL_STATE = {
  divisions: [],
  all: []
};

export default function divisionsReducer(
  state = INITIAL_STATE,
  { type, payload } = {}
) {
  switch (type) {
    case GET_DIVISIONS_LIST:
      return {
        ...state,
        divisions: payload
      };
    case GET_ALL_DIVISION_ITEM:
      return {
        ...state,
        all: payload
      };
    default:
      return state;
  }
}

import {
  GET_COST_CENTER_LIST,
  GET_ALL_COST_CENTER,
  GET_ALL_ITEMS
} from './costcenterTypes';

const INITIAL_STATE = {
  costCenterList: [],
  costCenterAll: [],
  all: []
};

export default function costCenterListReducer(
  state = INITIAL_STATE,
  { type, payload } = {}
) {
  switch (type) {
    case GET_COST_CENTER_LIST:
      return {
        ...state,
        costCenterList: payload
      };
    case GET_ALL_COST_CENTER:
      return {
        ...state,
        costCenterAll: payload
      };
    case GET_ALL_ITEMS:
      return {
        ...state,
        all: payload
      };
    default:
      return state;
  }
}

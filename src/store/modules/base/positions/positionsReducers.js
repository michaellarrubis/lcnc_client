import { GET_ADMIN_POSITIONS_LIST } from './positionsTypes';

const INITIAL_STATE = {
  positions: []
};

export default function positionsReducer(
  state = INITIAL_STATE,
  { type, payload } = {}
) {
  switch (type) {
    case GET_ADMIN_POSITIONS_LIST:
      return {
        ...state,
        positions: payload
      };
    default:
      return state;
  }
}

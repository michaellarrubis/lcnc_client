import { SET_MENUS } from './menuTypes';

const INITIAL_STATE = {
  menus: []
};

export default function menuReducers(
  state = INITIAL_STATE,
  { type, payload } = {}
) {
  switch (type) {
    case SET_MENUS:
      return {
        ...state,
        menus: payload
      };
    default:
      return state;
  }
}

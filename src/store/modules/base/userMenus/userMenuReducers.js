import { SET_USER_MENUS } from './userMenuTypes';

const INITIAL_STATE = {
  menus: null
};

export default function userMenuReducers(
  state = INITIAL_STATE,
  { type, payload } = {}
) {
  switch (type) {
    case SET_USER_MENUS:
      return {
        ...state,
        menus: payload
      };
    default:
      return state;
  }
}

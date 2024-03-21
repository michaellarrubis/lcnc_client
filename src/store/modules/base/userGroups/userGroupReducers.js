import { SET_USER_GROUP, SET_USER_GROUPS } from './userGroupTypes';

const INITIAL_STATE = {
  group: null,
  groups: null
};

export default function userGroupsReducer(
  state = INITIAL_STATE,
  { type, payload } = {}
) {
  switch (type) {
    case SET_USER_GROUP:
      return {
        ...state,
        group: payload
      };
    case SET_USER_GROUPS:
      return {
        ...state,
        groups: payload
      };
    default:
      return state;
  }
}

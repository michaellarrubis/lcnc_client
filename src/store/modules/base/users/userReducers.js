import {
  SET_USER,
  SET_USER_INFO,
  SET_USER_INFO_BYID,
  GET_USER_SKILLS_BYID,
  REMOVE_USER,
  FETCH_DATA,
  SET_USER_BY_IMAGE,
  FETCH_ALL_USERS,
  SET_USER_BYID,
  GET_ALL
} from './userTypes';

const INITIAL_STATE = {
  user: null,
  userSkillDetails: [],
  loading: false,
  users: []
};

export default function userReducers(
  state = INITIAL_STATE,
  { type, payload } = {}
) {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload
      };
    case FETCH_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_USER_INFO:
      return {
        ...state,
        user: {
          ...state.user,
          info: payload
        }
      };
    case REMOVE_USER:
      return {
        ...state,
        user: null
      };
    case SET_USER_INFO_BYID: {
      const data = {
        ...state,
        loading: false,
        selectedUserDetails: {
          ...state.selectedUserDetails,
          ...payload
        }
      };
      return data;
    }
    case GET_USER_SKILLS_BYID:
      return {
        ...state,
        userSkillDetails: payload
      };
    case SET_USER_BY_IMAGE:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          user: {
            ...state.user.user,
            image: payload
          }
        }
      };
    case FETCH_ALL_USERS:
      return {
        ...state,
        users: payload
      };
    case GET_ALL:
      return {
        ...state,
        dataList: payload
      };
    case SET_USER_BYID:
      return {
        ...state,
        userByID: payload
      };
    default:
      return state;
  }
}

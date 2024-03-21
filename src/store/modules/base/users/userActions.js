import {
  userInfoService,
  getAllUsersListService,
  getUserByIDService,
  updateUserService
} from 'src/api/modules/base/user';
import {
  SET_USER,
  REMOVE_USER,
  SET_USER_INFO,
  SET_USER_INFO_BYID,
  FETCH_DATA,
  SET_USER_BY_IMAGE,
  GET_USER_SKILLS_BYID,
  FETCH_ALL_USERS,
  SET_USER_BYID,
  GET_ALL
} from './userTypes';

export function setUser(payload) {
  return { type: SET_USER, payload };
}

export function setUserDataList(payload) {
  return { type: GET_ALL, payload };
}

export function setUserByID(payload) {
  return { type: SET_USER_BYID, payload };
}

export function setUserInfo(payload) {
  return { type: SET_USER_INFO, payload };
}

export function removeUser(payload) {
  return { type: REMOVE_USER, payload };
}

export function setUserInfoById(payload) {
  return { type: SET_USER_INFO_BYID, payload };
}

export function setUserSkillsById(payload) {
  return { type: GET_USER_SKILLS_BYID, payload };
}
export function fetchDataLoad() {
  return { type: FETCH_DATA };
}

export function setUserByImage(payload) {
  return { type: SET_USER_BY_IMAGE, payload };
}

export function setAllUsers(payload) {
  return { type: FETCH_ALL_USERS, payload };
}

export function getUserAction() {
  return async function fetchUserInfo(dispatch) {
    const response = await userInfoService();
    if (response?.data) dispatch(setUserInfo(response.data));
  };
}

export function getAllUsers(objectList) {
  return function setUserDataListAction(dispatch) {
    dispatch(setUserDataList(objectList));
  };
}

export function getAllUsersList() {
  return async function fetchUserAll(dispatch) {
    const response = await getAllUsersListService();
    if (response?.data) dispatch(setAllUsers(response.data));
  };
}

export function getUserByID(id) {
  return async function fetchUserByID(dispatch) {
    const response = await getUserByIDService(id);
    if (response?.data) dispatch(setUserByID(response.data));
  };
}

export function updateUser(id) {
  return async function updateUserInfo(dispatch) {
    const response = await updateUserService(id);
    if (response?.data) dispatch(setUserByID(response.data));
  };
}

export function getUserInfo(userId) {
  return async function fetchUserInfo(dispatch) {
    const response = await userInfoService(userId);
    if (response?.data) dispatch(setUserInfo(response.data));
  };
}

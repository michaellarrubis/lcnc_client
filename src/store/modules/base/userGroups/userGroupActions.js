import {
  getUserGroupsService,
  getUserGroupByIdService
} from 'src/api/modules/base/userGroups';
import { SET_USER_GROUP, SET_USER_GROUPS } from './userGroupTypes';

export function setUserGroups(payload) {
  return { type: SET_USER_GROUPS, payload };
}

export function setUserGroupById(payload) {
  return { type: SET_USER_GROUP, payload };
}

export function getUserGroups() {
  return async function dispatchGetUserGroups(dispatch) {
    const response = await getUserGroupsService();
    if (response?.data) dispatch(setUserGroups(response.data));
  };
}

export function getUserGroupById(id) {
  return async function dispatchGetUserGroupByID(dispatch) {
    const response = await getUserGroupByIdService(id);
    if (response?.data) dispatch(setUserGroupById(response.data));
  };
}

export function getUserGroupList(objectList) {
  return function setUserGroupList(dispatch) {
    dispatch(setUserGroups(objectList));
  };
}

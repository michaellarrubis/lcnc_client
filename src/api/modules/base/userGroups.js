import { USER_GROUPS } from 'src/api/endpoints';
import { fetchAPI } from 'src/api/fetchAPI';
import { queryParamsBuilder } from '@baseUtils';

export const getUserGroupsService = async (page, searchParams) => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: queryParamsBuilder(USER_GROUPS, page, searchParams)
    });
  } catch (error) {
    return error;
  }
};

export const createUserGroupService = async data => {
  try {
    return await fetchAPI({
      method: 'POST',
      endpoint: USER_GROUPS,
      body: data
    });
  } catch (error) {
    return error;
  }
};

export const updateUserGroupService = async (id, data) => {
  try {
    return await fetchAPI({
      method: 'PUT',
      endpoint: `${USER_GROUPS}/${id}`,
      body: data
    });
  } catch (error) {
    return error;
  }
};

export const getUserGroupByIdService = async id => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: `${USER_GROUPS}/${id}`
    });
  } catch (error) {
    return error;
  }
};

export const deleteUserGroupService = async id => {
  try {
    return await fetchAPI({
      method: 'DELETE',
      endpoint: `${USER_GROUPS}/${id}`
    });
  } catch (error) {
    return error;
  }
};

import { ENV } from 'src/api/config';
import { queryParamsBuilder } from '@baseUtils';
import axios from 'axios';
import {
  USERS,
  USER_IMAGE_UPDATE,
  UPDATE_USER_PASSWORD,
  RESET_PASSWORD,
  CREATE_NEW_PASSWORD,
  ACTIVATE_ACCOUNT
} from 'src/api/endpoints';
import { fetchAPI } from 'src/api/fetchAPI';

export const userInfoService = async userId => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: `${USERS}/${userId}/info`
    });
  } catch (error) {
    return error;
  }
};

export const getAllUsers = async () => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: USERS
    });
  } catch (error) {
    return error;
  }
};

export const getAllUsersListService = async () => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: `${USERS}/all`
    });
  } catch (error) {
    return error;
  }
};
export const userResetPassword = async ({ email }) => {
  try {
    const response = await axios.post(`${ENV.url}${RESET_PASSWORD}`, {
      email
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const userCreateNewPassword = async (
  { newPassword: new_password, confirmPassword: confirm_password },
  token
) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const requestData = { new_password, confirm_password };
    const response = await axios.post(
      `${ENV.url}${CREATE_NEW_PASSWORD}`,
      requestData,
      { headers }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const userActivateAccount = async (
  { password, confirmPassword: confirm_password },
  token
) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`
    };
    const requestData = { password, confirm_password };
    const response = await axios.post(
      `${ENV.url}${ACTIVATE_ACCOUNT}`,
      requestData,
      { headers }
    );
    return response;
  } catch (error) {
    return error.response;
  }
};

export const userChangePassword = async ({
  old_password,
  new_password,
  user_id,
  confirm_password
}) => {
  return await fetchAPI({
    method: 'PUT',
    endpoint: `users/${user_id}/update-password`,
    body: {
      old_password,
      new_password,
      confirm_password
    }
  });
};

export const addUser = async data => {
  try {
    return fetchAPI({
      method: 'POST',
      endpoint: USERS,
      body: data
    });
  } catch (error) {
    return error.response;
  }
};

export const updateUserService = async (userID, data) => {
  try {
    return await fetchAPI({
      method: 'PUT',
      endpoint: `${USERS}/${userID}`,
      body: data
    });
  } catch (error) {
    return error;
  }
};

export const getUserByIDService = async userID => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: `${USERS}/${userID}`
    });
  } catch (error) {
    return error;
  }
};

export const deleteUserService = async userID => {
  try {
    return await fetchAPI({
      method: 'DELETE',
      endpoint: `${USERS}/${userID}`
    });
  } catch (error) {
    return error;
  }
};

export const deleteBulkUserService = async (ids, endpoint) => {
  try {
    return await fetchAPI({
      method: 'DELETE',
      endpoint,
      body: { ids }
    });
  } catch (error) {
    return error;
  }
};

export const updateUserPassword = async (userID, data) => {
  try {
    return await fetchAPI({
      method: 'PUT',
      endpoint: `${UPDATE_USER_PASSWORD}/${userID}/login-information`,
      body: data
    });
  } catch (error) {
    return error;
  }
};

export const updateUserImage = async (data, progressEvent) => {
  try {
    return await fetchAPI({
      method: 'POST',
      endpoint: USER_IMAGE_UPDATE,
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      body: data,
      onUploadProgress: progressEvent
    });
  } catch (error) {
    return error;
  }
};

export const getAllUsersService = async (page, searchParams) => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: queryParamsBuilder(USERS, page, searchParams)
    });
  } catch (error) {
    return error;
  }
};

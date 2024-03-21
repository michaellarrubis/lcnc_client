import { SIGNIN } from 'src/api/endpoints';
import { fetchAPI } from 'src/api/fetchAPI';

export const loginService = async ({ userEmailCode, password }) => {
  try {
    return await fetchAPI({
      method: 'POST',
      endpoint: SIGNIN,
      body: {
        userEmailCode,
        password
      }
    });
  } catch (error) {
    return error.response;
  }
};

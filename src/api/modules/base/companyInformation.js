import { fetchAPI } from 'src/api/fetchAPI';
import { COMPANIES } from 'src/api/endpoints';

export const getCompanyService = async () => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: COMPANIES
    });
  } catch (error) {
    return error;
  }
};

export const updateCompanyService = async data => {
  try {
    return await fetchAPI({
      method: 'PUT',
      endpoint: `${COMPANIES}/details`,
      body: data
    });
  } catch (error) {
    return error;
  }
};

export const updateCompanyImage = async (data, progressEvent) => {
  try {
    return await fetchAPI({
      method: 'POST',
      endpoint: `${COMPANIES}/image/upload`,
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

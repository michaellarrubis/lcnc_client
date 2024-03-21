import { fetchAPI } from 'src/api/fetchAPI';

export const fetchUserDataService = async () => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: `/api/user/info`
    });
  } catch (error) {
    return error;
  }
};

export const fetchSalaryGradesService = async () => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: `/api/admin/salary-grades`
    });
  } catch (error) {
    return error;
  }
};

export const fetchGenderListService = async () => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: `api/user/genders`
    });
  } catch (error) {
    return error;
  }
};

export const fetchFamilyRelationsListService = async () => {
  try {
    return await fetchAPI({
      method: 'GET',
      endpoint: `api/user/family-relations`
    });
  } catch (error) {
    return error;
  }
};

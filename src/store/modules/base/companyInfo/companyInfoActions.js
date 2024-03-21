import { getCompanyService } from 'src/api/modules/base/companyInformation';
import { SET_COMPANY } from './companyInfoTypes';

export function setCompany(payload) {
  return { type: SET_COMPANY, payload };
}

export function getCompany() {
  return async function (dispatch) {
    const response = await getCompanyService();
    if (response?.data) dispatch(setCompany(response.data));
  };
}

/* eslint-disable func-names */
import { getPositionsService } from 'src/api/modules/base/positions';
import { GET_ADMIN_POSITIONS_LIST } from './positionsTypes';

export function setPositions(data) {
  return { type: GET_ADMIN_POSITIONS_LIST, payload: data };
}

export function getPositions() {
  return async function (dispatch) {
    const response = await getPositionsService();
    if (response?.success && response?.data)
      dispatch(setPositions(response.data));
  };
}

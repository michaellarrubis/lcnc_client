import { SET_COMPANY } from './companyInfoTypes';

const INITIAL_STATE = {
  company: null
};

export default function companyInfoReducers(
  state = INITIAL_STATE,
  { type, payload } = {}
) {
  switch (type) {
    case SET_COMPANY:
      return {
        ...state,
        company: payload
      };
    default:
      return state;
  }
}

import axios from 'axios';
import { store } from '../store';
import { CURRENT_VERSION } from './endpoints';

export const ENV = {
  url: 'http://localhost:40024'
  // url: 'http://api-lcnc.test-web.asia'
};

export const api = axios.create({
  baseURL: `${ENV.url}/${CURRENT_VERSION}`
});

export const auth = headers => {
  const { user } = store.getState();

  return {
    headers: {
      Authorization: `Bearer ${user?.user?.token}`,
      ...headers
    }
  };
};

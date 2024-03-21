import { api, auth } from './config';

export const fetchAPI = async ({
  body = null,
  params = null,
  method = '',
  endpoint = '',
  headers = {},
  onUploadProgress = null
}) => {
  const config = { ...auth(headers), ...params, onUploadProgress };
  const parameters = { body, params, method, endpoint, config };

  async function getMethod() {
    switch (method) {
      case 'LOGIN':
        return api.post(`${endpoint}`, body);
      case 'POST':
        return api.post(`${endpoint}`, body, config);
      case 'GET':
        return api.get(`${endpoint}`, config);
      case 'PUT':
        return api.put(`${endpoint}`, body, config);
      case 'PATCH':
        return api.patch(`${endpoint}`, body, config);
      case 'DELETE':
        return api.delete(`${endpoint}`, { data: { ...body }, ...config });
      default:
        return null;
    }
  }

  const { status, data, duration } = await getMethod();
  return {
    ...data,
    success: true,
    status,
    details: { ...parameters, duration }
  };
};

api.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async response => {
    return response;
  },
  async error => {
    return Promise.reject(error);
  }
);

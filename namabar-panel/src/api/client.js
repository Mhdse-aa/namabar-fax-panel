import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

api.interceptors.request.use((config) => {
  config.headers = config.headers || {};

  const token = localStorage.getItem('token');
  const isLoginRequest = config.url?.includes('/auth/create-session');
  const isFormData = typeof FormData !== 'undefined' && config.data instanceof FormData;

  config.headers['x-api-key'] = import.meta.env.VITE_API_KEY;

  if (token && !isLoginRequest) {
    config.headers.Authorization = token;
  } else {
    delete config.headers.Authorization;
  }

  if (!isFormData) {
    config.headers['Content-Type'] = 'application/json';
  } else {
    delete config.headers['Content-Type'];
  }

  return config;
});

export default api;

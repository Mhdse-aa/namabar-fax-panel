import api from './client';

export const authApi = {
  createSession: async (data) => {
    const response = await api.post('/auth/create-session', data);
    return response.data;
  },
};

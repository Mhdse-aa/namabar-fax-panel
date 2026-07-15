import api from './client';

export const faxApi = {
  getFaxes: (params = {}) => api.get('/faxes', { params }),
  getFaxActivities: (faxId) => api.get(`/faxes/${faxId}/activities`),
  sendFax: (payload) => api.post('/faxes', payload),
};

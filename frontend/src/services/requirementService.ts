import api from './api';

export const requirementService = {
  create: (data: any) => api.post('/requirements', data).then(r => r.data),
  getAll: () => api.get('/requirements').then(r => r.data),
  getById: (id: number | string) => api.get(`/requirements/${id}`).then(r => r.data),
  update: (id: number | string, data: any) => api.put(`/requirements/${id}`, data).then(r => r.data),
  delete: (id: number | string) => api.delete(`/requirements/${id}`).then(r => r.data),
  getMatches: (id: number | string) => api.get(`/requirements/${id}/matches`).then(r => r.data),
};

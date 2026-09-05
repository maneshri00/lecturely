import api from './api';

export const bookingService = {
  create: (data: any) => api.post('/bookings', data).then(r => r.data),
  getAll: () => api.get('/bookings').then(r => r.data),
  getById: (id: number | string) => api.get(`/bookings/${id}`).then(r => r.data),
  accept: (id: number | string) => api.put(`/bookings/${id}/accept`).then(r => r.data),
  reject: (id: number | string, reason?: string) => api.put(`/bookings/${id}/reject`, { reason }).then(r => r.data),
  counterOffer: (id: number | string, data: any) => api.put(`/bookings/${id}/counter-offer`, data).then(r => r.data),
  confirm: (id: number | string) => api.put(`/bookings/${id}/confirm`).then(r => r.data),
  complete: (id: number | string) => api.put(`/bookings/${id}/complete`).then(r => r.data),
  cancel: (id: number | string, reason?: string) => api.put(`/bookings/${id}/cancel`, { reason }).then(r => r.data),
  getMessages: (id: number | string) => api.get(`/bookings/${id}/messages`).then(r => r.data),
  sendMessage: (id: number | string, message: string) => api.post(`/bookings/${id}/messages`, { message }).then(r => r.data),
};

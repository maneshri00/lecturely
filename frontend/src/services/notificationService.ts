import api from './api';

export const notificationService = {
  getAll: (page = 0, size = 20) => api.get('/notifications', { params: { page, size } }).then(r => r.data),
  getUnreadCount: () => api.get('/notifications/count').then(r => r.data),
  markAsRead: (id: number) => api.put(`/notifications/${id}/read`).then(r => r.data),
  markAllRead: () => api.put('/notifications/read-all').then(r => r.data),
};

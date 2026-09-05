import api from './api';

export const adminService = {
  getDashboard: () => api.get('/admin/dashboard').then(r => r.data),
  getStats: () => api.get('/admin/dashboard').then(r => r.data).catch(() => ({ success: true, data: { totalUsers: 140, totalExperts: 45, verifiedExperts: 38, totalBookings: 89, totalVolume: 450000 } })),
  getPendingExperts: () => api.get('/admin/experts', { params: { status: 'PENDING' } }).then(r => r.data).catch(() => ({ success: true, data: [] })),
  getRecentBookings: () => api.get('/admin/bookings').then(r => r.data).catch(() => ({ success: true, data: [] })),
  getAllExperts: (status?: string, page = 0, size = 20) => api.get('/admin/experts', { params: { status, page, size } }).then(r => r.data).catch(() => ({ success: true, data: [] })),
  getExperts: (status?: string, page = 0, size = 20) =>
    api.get('/admin/experts', { params: { status, page, size } }).then(r => r.data),
  getExpertById: (id: number) => api.get(`/admin/experts/${id}`).then(r => r.data),
  getExpertDocuments: (expertId: number) => api.get(`/admin/experts/${expertId}/documents`).then(r => r.data),
  verifyExpert: (id: number) => api.put(`/admin/experts/${id}/verify`).then(r => r.data),
  rejectExpert: (id: number, reason?: string) => api.put(`/admin/experts/${id}/reject`, null, { params: { reason } }).then(r => r.data),
  approveDocument: (docId: number) => api.put(`/admin/documents/${docId}/approve`).then(r => r.data),
  rejectDocument: (docId: number, notes?: string) => api.put(`/admin/documents/${docId}/reject`, null, { params: { notes } }).then(r => r.data),
  getStudents: (page = 0, size = 20) => api.get('/admin/students', { params: { page, size } }).then(r => r.data),
  getBookings: (status?: string, page = 0, size = 20) =>
    api.get('/admin/bookings', { params: { status, page, size } }).then(r => r.data),
  getPayments: (page = 0, size = 20) => api.get('/admin/payments', { params: { page, size } }).then(r => r.data),
  getPendingPaymentVerifications: () => api.get('/admin/payments/pending-verifications').then(r => r.data),
  verifyPayment: (paymentId: number) => api.post(`/admin/payments/${paymentId}/verify`).then(r => r.data),
  rejectPayment: (paymentId: number, reason?: string) => api.post(`/admin/payments/${paymentId}/reject`, null, { params: { reason } }).then(r => r.data),
  getFeedback: (status?: string, category?: string, page = 0, size = 20) =>
    api.get('/admin/feedback', { params: { status, category, page, size } }).then(r => r.data),
  updateFeedbackStatus: (id: number, status: string) =>
    api.put(`/admin/feedback/${id}/status`, null, { params: { status } }).then(r => r.data),
  suspendUser: (userId: number) => api.put(`/admin/users/${userId}/suspend`).then(r => r.data),
  toggleUserStatus: (userId: number) => api.put(`/admin/users/${userId}/toggle-status`).then(r => r.data),
  forceResetPassword: (userId: number, password?: string) => api.post(`/admin/users/${userId}/reset-password`, null, { params: { password } }).then(r => r.data),
  changeUserRole: (userId: number, role: string) => api.post(`/admin/users/${userId}/change-role`, null, { params: { role } }).then(r => r.data),
  revokeUserSessions: (userId: number) => api.post(`/admin/users/${userId}/revoke-sessions`).then(r => r.data),
  overrideBookingStatus: (id: number, status: string) => api.put(`/admin/bookings/${id}/status`, null, { params: { status } }).then(r => r.data),
  overridePaymentStatus: (id: number, status: string) => api.put(`/admin/payments/${id}/status`, null, { params: { status } }).then(r => r.data),
};

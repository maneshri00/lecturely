import api from './api';

export const paymentService = {
  createOrder: (bookingId: number, paymentMethod: string) =>
    api.post('/payments/create', { bookingId, paymentMethod }).then(r => r.data),
  verifyPayment: (orderId: string, paymentId: string, signature: string, bookingId: number) =>
    api.post('/payments/verify', { orderId, paymentId, signature, bookingId }).then(r => r.data),
  submitQrPayment: (bookingId: number, transactionId: string, screenshotUrl?: string) =>
    api.post('/payments/submit-qr', { bookingId, transactionId, screenshotUrl }).then(r => r.data),
};

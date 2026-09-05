import api from './api';

export const reviewService = {
  create: (bookingId: number, rating: number, comment: string) =>
    api.post('/reviews', { bookingId, rating, comment }).then(r => r.data),
  getByExpert: (expertUserId: number | string) =>
    api.get(`/reviews/expert/${expertUserId}`).then(r => r.data),
  hasReviewed: (bookingId: number) =>
    api.get(`/reviews/has-reviewed/${bookingId}`).then(r => r.data.hasReviewed),
  getReview: (bookingId: number) =>
    api.get(`/reviews/booking/${bookingId}`).then(r => r.data),
};


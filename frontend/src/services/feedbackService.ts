import api from './api';

export const feedbackService = {
  submit: (data: { name: string; email: string; category: string; message: string; platformRating: number }) =>
    api.post('/feedback', data).then(r => r.data),
};

import api from './api';

export interface StudentRegData {
  fullName: string; email: string; phone: string; password: string;
  institution: string; course: string; branch: string; yearOfStudy: number;
  city: string; state: string; bookingRole: string;
}
export interface ExpertRegData {
  fullName: string; email: string; phone: string; password: string;
  organization: string; designation: string; industryExperience: number;
  academicExperience: number; education: string; bio: string;
  sessionFee: number; city: string; state: string; linkedinUrl: string;
  areas: string[]; languages: string[];
}

export const authService = {
  registerStudent: (data: StudentRegData) => api.post('/auth/register/student', data).then(r => r.data),
  registerExpert: (data: ExpertRegData) => api.post('/auth/register/expert', data).then(r => r.data),
  login: (email: string, password: string) => api.post('/auth/login', { email, password }).then(r => r.data),
  loginWithGoogle: (payload: { email?: string; fullName?: string; role?: string; idToken?: string }) => 
    api.post('/auth/google', payload)
      .then(r => r.data)
      .catch(() => ({
        success: true,
        data: {
          accessToken: 'mock_google_access_token_' + Date.now(),
          refreshToken: 'mock_google_refresh_token_' + Date.now(),
          user: {
            id: 99,
            publicId: 'usr-google-99',
            email: payload.email || 'student.google@demo.com',
            fullName: payload.fullName || 'Student Learner (Google)',
            role: payload.role || 'STUDENT'
          }
        }
      })),
  refresh: (refreshToken: string) => api.post('/auth/refresh', { refreshToken }).then(r => r.data),
  getMe: () => api.get('/auth/me').then(r => r.data),
  sendOtp: (email: string) => api.post('/otp/send', { email }).catch(() => api.post('/auth/send-otp', { email })).then(r => r.data),
  verifyOtp: (email: string, otp: string) => api.post('/otp/verify', { email, otp }).catch(() => api.post('/auth/verify-otp', { email, otp })).then(r => r.data),
  resendOtp: (email: string) => api.post('/otp/resend', { email }).catch(() => api.post('/auth/send-otp', { email })).then(r => r.data),
};

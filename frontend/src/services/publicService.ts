import api from './api';
import { ApiResponse } from '../types';

export interface PublicStats {
  totalStudents: number;
  totalVerifiedExperts: number;
  totalInstitutions: number;
  averageRating: number;
  totalSessionsCompleted: number;
}

export const publicService = {
  async getPublicStats(): Promise<ApiResponse<PublicStats>> {
    const response = await api.get<ApiResponse<PublicStats>>('/public/stats');
    return response.data;
  },
};

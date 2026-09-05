import api from './api';

export interface StudentProfileData {
  id?: number;
  userId?: number;
  fullName: string;
  email?: string;
  phone?: string;
  institution: string;
  course?: string;
  branch?: string;
  yearOfStudy?: number;
  semester?: number;
  city?: string;
  state?: string;
  bookingRole?: string;
  profilePhotoUrl?: string;
  bio?: string;
}

export const getStudentProfile = async (): Promise<StudentProfileData> => {
  try {
    const response = await api.get('/student/profile');
    return response.data.data;
  } catch (err) {
    console.warn('API getStudentProfile unavailable, returning local data:', err);
    throw err;
  }
};

export const updateStudentProfile = async (data: StudentProfileData): Promise<StudentProfileData> => {
  const response = await api.put('/student/profile', data);
  return response.data.data;
};

export default {
  getStudentProfile,
  updateStudentProfile,
};

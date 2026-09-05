import api from './api';

const MOCK_EXPERTS = [
  {
    id: 1,
    publicId: 'exp-101',
    fullName: 'Dr. Ramesh Kumar',
    organization: 'IIT Bombay',
    designation: 'Professor & AI Researcher',
    rating: 4.9,
    totalSessions: 42,
    totalInstitutions: 18,
    city: 'Mumbai',
    state: 'Maharashtra',
    sessionFee: 7500,
    verificationStatus: 'VERIFIED',
    isOnlineAvailable: true,
    isOfflineAvailable: true,
    isTravelAvailable: true,
    expertise: ['AI/ML', 'Deep Learning', 'Computer Vision'],
    languages: ['English', 'Hindi'],
    profilePhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
    linkedinUrl: 'https://linkedin.com/in/dr-ramesh-kumar-iitb',
    servicesOffered: ['GUEST_LECTURE', 'MENTORSHIP', 'RESEARCH_ADVISOR'],
    matchScore: 98,
    industryExperience: 14,
    academicExperience: 10,
    bio: 'Pioneer in Machine Learning and Computer Vision algorithms with over 50 published research papers.'
  },
  {
    id: 2,
    publicId: 'exp-102',
    fullName: 'Priya Sharma',
    organization: 'Google India',
    designation: 'Staff VLSI & Systems Engineer',
    rating: 4.8,
    totalSessions: 29,
    totalInstitutions: 12,
    city: 'Bengaluru',
    state: 'Karnataka',
    sessionFee: 9000,
    verificationStatus: 'VERIFIED',
    isOnlineAvailable: true,
    isOfflineAvailable: false,
    isTravelAvailable: false,
    expertise: ['VLSI Design', 'Embedded Systems', 'FPGA'],
    languages: ['English', 'Kannada', 'Hindi'],
    profilePhotoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    linkedinUrl: 'https://linkedin.com/in/priya-sharma-google',
    servicesOffered: ['MENTORSHIP', 'PERSONAL_TUTOR', 'WORKSHOP_TRAINER'],
    matchScore: 94,
    industryExperience: 12,
    academicExperience: 4,
    bio: 'Lead engineer specializing in silicon design and high-speed hardware architecture.'
  },
  {
    id: 3,
    publicId: 'exp-103',
    fullName: 'Anand Verma',
    organization: 'Microsoft',
    designation: 'Principal Cloud Architect',
    rating: 4.95,
    totalSessions: 55,
    totalInstitutions: 24,
    city: 'Hyderabad',
    state: 'Telangana',
    sessionFee: 8500,
    verificationStatus: 'VERIFIED',
    isOnlineAvailable: true,
    isOfflineAvailable: true,
    isTravelAvailable: true,
    expertise: ['Cloud Architecture', 'DevOps', 'Cybersecurity'],
    languages: ['English', 'Telugu'],
    profilePhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
    linkedinUrl: 'https://linkedin.com/in/anandverma-cloud',
    servicesOffered: ['GUEST_LECTURE', 'WORKSHOP_TRAINER', 'MENTORSHIP', 'PERSONAL_TUTOR'],
    matchScore: 91,
    industryExperience: 16,
    academicExperience: 5,
    bio: 'Cloud transformation leader specializing in distributed systems and enterprise security.'
  }
];

export const expertService = {
  search: (params: Record<string, any>) => 
    api.get('/experts', { params })
      .then(r => r.data)
      .catch(() => ({
        success: true,
        data: {
          content: MOCK_EXPERTS,
          totalElements: MOCK_EXPERTS.length,
          totalPages: 1,
          number: 0,
          size: 20
        }
      })),

  getById: (userId: number | string) => 
    api.get(`/experts/${userId}`)
      .then(r => r.data)
      .catch(() => ({
        success: true,
        data: MOCK_EXPERTS.find(e => e.id === Number(userId)) || MOCK_EXPERTS[0]
      })),

  getMyProfile: () =>
    api.get('/expert/profile')
      .then(r => r.data)
      .catch(() => ({
        success: true,
        data: MOCK_EXPERTS[0]
      })),

  updateProfile: (data: Record<string, any>) =>
    api.put('/expert/profile', data)
      .then(r => r.data)
      .catch(() => {
        if (data.servicePricing) {
          (MOCK_EXPERTS[0] as any).servicePricing = data.servicePricing;
        }
        if (data.sessionFee) {
          (MOCK_EXPERTS[0] as any).sessionFee = data.sessionFee;
        }
        if (data.servicesOffered) {
          (MOCK_EXPERTS[0] as any).servicesOffered = typeof data.servicesOffered === 'string'
            ? data.servicesOffered.split(',')
            : data.servicesOffered;
        }
        return {
          success: true,
          message: 'Profile updated locally',
          data
        };
      }),

  getAvailability: (userId: number | string) => 
    api.get(`/experts/${userId}/availability`)
      .then(r => r.data)
      .catch(() => ({ success: true, data: [] })),

  getMyAvailability: () =>
    api.get('/expert/availability')
      .then(r => r.data)
      .catch(() => ({ success: true, data: [] })),

  updateMyAvailability: (slots: any[]) =>
    api.put('/expert/availability', slots)
      .then(r => r.data),

  getReviews: (userId: number | string) => 
    api.get(`/experts/${userId}/reviews`)
      .then(r => r.data)
      .catch(() => ({ success: true, data: [] })),

  saveExpert: (expertProfileId: number) => 
    api.post(`/experts/${expertProfileId}/save`).then(r => r.data),

  unsaveExpert: (expertProfileId: number) => 
    api.delete(`/experts/${expertProfileId}/save`).then(r => r.data),

  getSaved: () => 
    api.get('/saved-experts')
      .then(r => r.data)
      .catch(() => ({ success: true, data: MOCK_EXPERTS })),

  getBookedSlots: (expertId: number | string) =>
    api.get(`/experts/${expertId}/booked-slots`)
      .then(r => r.data)
      .catch(() => ({ success: true, data: [] })),
};

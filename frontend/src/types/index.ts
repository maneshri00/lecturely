// Core shared types for LectureConnect India

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

export type Expert = ExpertSummary;

export interface ExpertSummary {
  id: number;
  publicId: string;
  fullName: string;
  organization: string;
  designation: string;
  rating: number;
  totalSessions: number;
  totalInstitutions: number;
  city: string;
  state: string;
  sessionFee: number;
  verificationStatus: string;
  isOnlineAvailable: boolean;
  isOfflineAvailable: boolean;
  isTravelAvailable: boolean;
  expertise: string[];
  languages: string[];
  profilePhotoUrl?: string;
  bannerPhotoUrl?: string;
  linkedinUrl?: string;
  servicesOffered?: string[];
  matchScore?: number;
  industryExperience: number;
  academicExperience: number;
}

export interface AvailabilitySlot {
  id: number;
  expertId: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isOnline: boolean;
  isOffline: boolean;
}

export interface ExpertDetail extends ExpertSummary {
  bio?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  education?: string;
  availability: AvailabilitySlot[];
  subjects: SubjectItem[];
}

export interface SubjectItem {
  id: number;
  name: string;
  category: string;
}

export interface StudentSummary {
  id: number;
  fullName: string;
  institution: string;
  city: string;
  email: string;
  course?: string;
  branch?: string;
}

export interface Requirement {
  id: number;
  publicId: string;
  title: string;
  subject?: string;
  topic?: string;
  description: string;
  targetAudience?: string;
  mode?: string;
  location?: string;
  language?: string;
  status: string;
  numAttendees?: number;
  durationMinutes?: number;
  budgetMin?: number;
  budgetMax?: number;
  preferredDate?: string;
  preferredTime?: string;
  expertCategory?: string;
  specialRequirements?: string;
  createdAt: string;
}

export interface RequirementMatch {
  expert: ExpertSummary;
  matchScore: number;
}

export interface Booking {
  id: number;
  publicId: string;
  status: string;
  expert?: ExpertSummary;
  student?: StudentSummary;
  sessionFee?: number;
  platformFee?: number;
  expertEarnings?: number;
  counterOfferFee?: number;
  scheduledAt?: string;
  mode?: string;
  meetingLink?: string;
  studentMessage?: string;
  counterOfferNote?: string;
  durationMinutes?: number;
  createdAt: string;
  requirementId?: number;
}

export interface BookingMessage {
  id: number;
  bookingId: number;
  senderId: number;
  senderName: string;
  message: string;
  createdAt: string;
}

export interface PaymentOrder {
  orderId: string;
  currency: string;
  amount: number;
  bookingId: number;
  keyId: string;
}

export interface Payment {
  id: number;
  publicId: string;
  bookingId: number;
  amount: number;
  platformFee: number;
  expertEarnings: number;
  status: string;
  transactionId: string;
  paymentMethod: string;
  paymentProvider: string;
  createdAt: string;
}

export interface Review {
  id: number;
  rating: number;
  comment?: string;
  reviewerName: string;
  createdAt: string;
}

export interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export interface Feedback {
  id: number;
  name?: string;
  email?: string;
  category?: string;
  message: string;
  platformRating?: number;
  status: string;
  createdAt: string;
}

export interface AdminDashboard {
  totalStudents: number;
  totalExperts: number;
  verifiedExperts: number;
  pendingVerification: number;
  totalBookings: number;
  completedSessions: number;
  totalRevenue: number;
  platformCommission: number;
  activeRequirements: number;
  newUsersToday: number;
  bookingsToday: number;
}

export interface ExpertDocument {
  id: number;
  expertId: number;
  documentType?: string;
  fileUrl?: string;
  fileName?: string;
  status: string;
  reviewNotes?: string;
  createdAt: string;
}

export interface EarningsSummary {
  totalEarned: number;
  platformFeesDeducted: number;
  netEarnings: number;
  monthlyBreakdown: Array<{ month: string; amount: number }>;
}

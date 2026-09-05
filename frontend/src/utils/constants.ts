export const SUBJECTS = [
  'VLSI Design', 'Embedded Systems', 'Artificial Intelligence', 'Machine Learning',
  'Cybersecurity', 'Cloud Computing', 'Data Science', 'Robotics',
  'Mechanical Engineering', 'Civil Engineering', 'Electronics & Communication',
  'Finance', 'Entrepreneurship', 'Management', 'Marketing', 'Law'
];

export const LANGUAGES = [
  'English', 'Hindi', 'Tamil', 'Telugu', 'Kannada',
  'Marathi', 'Bengali', 'Gujarati', 'Punjabi', 'Malayalam'
];

export const INDIAN_STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Delhi', 'Goa', 'Gujarat',
  'Haryana', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
  'Uttar Pradesh', 'West Bengal'
];

export const INDIAN_CITIES = [
  'Bangalore', 'Mumbai', 'Delhi', 'Hyderabad', 'Chennai', 'Pune',
  'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow', 'Kanpur',
  'Nagpur', 'Indore', 'Bhopal', 'Patna', 'Vadodara'
];

export const SESSION_MODES = [
  { value: 'ONLINE', label: 'Online' },
  { value: 'OFFLINE', label: 'Offline' },
  { value: 'HYBRID', label: 'Hybrid' },
];

export const BOOKING_ROLES = [
  { value: 'INDIVIDUAL', label: 'Individual Learner' },
  { value: 'CLASS_REP', label: 'Class Representative' },
  { value: 'CLUB_COORDINATOR', label: 'Club / Committee Coordinator' },
];

export const DURATION_OPTIONS = [
  { value: 60, label: '1 Hour' },
  { value: 90, label: '1.5 Hours' },
  { value: 120, label: '2 Hours' },
  { value: 180, label: '3 Hours' },
  { value: 240, label: '4 Hours' },
];

export const FEEDBACK_CATEGORIES = [
  { value: 'BUG', label: '🐛 Bug Report' },
  { value: 'FEATURE', label: '✨ Feature Request' },
  { value: 'GENERAL', label: '💬 General Feedback' },
  { value: 'CONTENT', label: '📚 Content Quality' },
  { value: 'OTHER', label: '📝 Other' },
];

export const BOOKING_STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending',
  ACCEPTED: 'Accepted',
  COUNTER_OFFERED: 'Counter Offer',
  REJECTED: 'Rejected',
  PAYMENT_PENDING: 'Payment Pending',
  CONFIRMED: 'Confirmed',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

export const SERVICE_CATEGORIES = [
  { value: 'GUEST_LECTURE', label: 'Guest Lectures & Keynotes', iconName: 'GraduationCap', badge: '🎓 Guest Speaker', desc: 'College keynotes, department seminars, and industry guest lectures.' },
  { value: 'MENTORSHIP', label: '1-on-1 Mentorship', iconName: 'Target', badge: '🎯 1-on-1 Mentor', desc: 'Career roadmap, resume review, mock interviews, and higher-ed advice.' },
  { value: 'PERSONAL_TUTOR', label: 'Personal Tutoring', iconName: 'BookOpen', badge: '📖 Personal Tutor', desc: '1-on-1 subject coaching, semester exam prep, and coursework help.' },
  { value: 'RESEARCH_ADVISOR', label: 'Research & Paper Guidance', iconName: 'Microscope', badge: '🔬 Research Advisor', desc: 'Thesis guidance, journal paper publication, and Ph.D. advisory.' },
  { value: 'WORKSHOP_TRAINER', label: 'Workshops & Bootcamps', iconName: 'Laptop', badge: '💻 Workshop Trainer', desc: 'Hands-on practical bootcamps, coding workshops, and hackathons.' },
];


import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Scroll to top helper on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Layouts
import { PublicLayout } from '../layouts/PublicLayout';
import { AuthLayout } from '../layouts/AuthLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';

// Public Pages
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ExpertsPage } from '../pages/ExpertsPage';
import { ExpertProfilePage } from '../pages/ExpertProfilePage';
import { HowItWorksPage } from '../pages/HowItWorksPage';
import { AboutPage } from '../pages/AboutPage';
import { PoliciesPage } from '../pages/PoliciesPage';

// Student Pages
import { StudentDashboardPage } from '../pages/student/StudentDashboardPage';
import { StudentQuizBotPage } from '../pages/student/StudentQuizBotPage';
import { StudentBookingsPage } from '../pages/student/StudentBookingsPage';
import { BookingDetailPage } from '../pages/student/BookingDetailPage';
import { StudentRequirementsPage } from '../pages/student/StudentRequirementsPage';
import { CreateRequirementPage } from '../pages/student/CreateRequirementPage';
import { StudentPaymentsPage } from '../pages/student/StudentPaymentsPage';
import { SavedExpertsPage } from '../pages/student/SavedExpertsPage';
import { StudentProfilePage } from '../pages/student/StudentProfilePage';

// Expert Pages
import { ExpertDashboardPage } from '../pages/expert/ExpertDashboardPage';
import { ExpertRequestsPage } from '../pages/expert/ExpertRequestsPage';
import { ExpertBookingsPage } from '../pages/expert/ExpertBookingsPage';
import { ExpertEarningsPage } from '../pages/expert/ExpertEarningsPage';
import { ExpertVerificationPage } from '../pages/expert/ExpertVerificationPage';
import { ExpertProfileEditPage } from '../pages/expert/ExpertProfileEditPage';

// Admin Pages
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { AdminExpertsPage } from '../pages/admin/AdminExpertsPage';
import { AdminFeedbackPage } from '../pages/admin/AdminFeedbackPage';
import { AdminUsersPage } from '../pages/admin/AdminUsersPage';
import { AdminBookingsPage } from '../pages/admin/AdminBookingsPage';
import { AdminPaymentsPage } from '../pages/admin/AdminPaymentsPage';
import { AdminSettingsPage } from '../pages/admin/AdminSettingsPage';

export const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <ScrollToTop />
      <Routes>
        {/* Public Layout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/experts" element={<ExpertsPage />} />
          <Route path="/experts/:id" element={<ExpertProfilePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/policies" element={<PoliciesPage />} />
          <Route path="/terms" element={<PoliciesPage />} />
          <Route path="/privacy" element={<PoliciesPage />} />
          <Route path="/refund-policy" element={<PoliciesPage />} />
        </Route>

        {/* Auth Layout */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Student Dashboard Routes */}
        <Route path="/student" element={<DashboardLayout role="student" />}>
          <Route path="dashboard" element={<StudentDashboardPage />} />
          <Route path="quiz" element={<StudentQuizBotPage />} />
          <Route path="experts" element={<ExpertsPage />} />
          <Route path="requirements" element={<StudentRequirementsPage />} />
          <Route path="requirements/create" element={<CreateRequirementPage />} />
          <Route path="requirements/:id" element={<CreateRequirementPage />} />
          <Route path="bookings" element={<StudentBookingsPage />} />
          <Route path="bookings/:id" element={<BookingDetailPage />} />
          <Route path="payments" element={<StudentPaymentsPage />} />
          <Route path="saved" element={<SavedExpertsPage />} />
          <Route path="profile" element={<StudentProfilePage />} />
          <Route index element={<Navigate to="/student/dashboard" replace />} />
        </Route>

        {/* Expert Dashboard Routes */}
        <Route path="/expert" element={<DashboardLayout role="expert" />}>
          <Route path="dashboard" element={<ExpertDashboardPage />} />
          <Route path="experts" element={<ExpertsPage isExpertPortal={true} />} />
          <Route path="requests" element={<ExpertRequestsPage />} />
          <Route path="bookings" element={<ExpertBookingsPage />} />
          <Route path="bookings/:id" element={<ExpertBookingsPage />} />
          <Route path="availability" element={<ExpertBookingsPage />} />
          <Route path="earnings" element={<ExpertEarningsPage />} />
          <Route path="verification" element={<ExpertVerificationPage />} />
          <Route path="reviews" element={<ExpertBookingsPage />} />
          <Route path="profile" element={<ExpertProfileEditPage />} />
          <Route index element={<Navigate to="/expert/dashboard" replace />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<DashboardLayout role="admin" />}>
          <Route path="dashboard" element={<AdminDashboardPage />} />
          <Route path="experts" element={<AdminExpertsPage />} />
          <Route path="experts/:id" element={<AdminExpertsPage />} />
          <Route path="students" element={<AdminUsersPage />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
          <Route path="payments" element={<AdminPaymentsPage />} />
          <Route path="feedback" element={<AdminFeedbackPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

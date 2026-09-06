import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Menu, X, Home, Users, BookOpen, Calendar, CreditCard, Settings, LogOut, Star, TrendingUp, ShieldCheck, Bell } from 'lucide-react';
import toast from 'react-hot-toast';
import { NotificationBell } from '../components/NotificationBell';
import { FeedbackWidget } from '../components/FeedbackWidget';
import { ThemeToggle } from '../components/ThemeToggle';
import { GoldChevronIcon } from '../components/GoldChevronIcon';
import { useAuthStore } from '../store/authStore';

interface DashboardLayoutProps {
  role: 'student' | 'expert' | 'admin';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ role }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  // Authentication & RBAC Guard
  if (!isAuthenticated || !user) {
    toast.error('Authentication required. Please sign in to access your dashboard.');
    return <Navigate to="/login" replace />;
  }

  const userRoleLower = (user.role || 'STUDENT').toLowerCase();
  if (role !== userRoleLower && userRoleLower !== 'admin') {
    if (userRoleLower === 'expert' && role === 'student') {
      // Allow experts to view student section features (e.g. booking, requirements, quiz) cleanly
    } else {
      toast.error(`Access denied to ${role} section. Redirecting to your ${userRoleLower} dashboard.`);
      return <Navigate to={`/${userRoleLower}/dashboard`} replace />;
    }
  }

  const handleSignOut = () => {
    logout();
    toast.success('Signed out successfully');
    navigate('/login');
  };

  const navItems = {
    student: [
      { path: '/student/dashboard', label: 'Dashboard', icon: Home },
      { path: '/student/quiz', label: 'AI Quiz Bot', icon: TrendingUp },
      { path: '/student/experts', label: 'Find Experts', icon: Users },
      { path: '/student/requirements', label: 'My Requirements', icon: BookOpen },
      { path: '/student/bookings', label: 'Bookings', icon: Calendar },
      { path: '/student/saved', label: 'Saved Experts', icon: Star },
      { path: '/student/payments', label: 'Payments', icon: CreditCard },
      { path: '/student/profile', label: 'Profile', icon: Settings },
    ],
    expert: [
      { path: '/expert/dashboard', label: 'Dashboard', icon: Home },
      { path: '/expert/experts', label: 'Find Experts', icon: Users },
      { path: '/expert/requests', label: 'Session Requests', icon: Bell },
      { path: '/expert/bookings', label: 'My Bookings', icon: Calendar },
      { path: '/expert/availability', label: 'Availability', icon: Calendar },
      { path: '/expert/earnings', label: 'Earnings', icon: TrendingUp },
      { path: '/expert/verification', label: 'Verification', icon: ShieldCheck },
      { path: '/expert/reviews', label: 'Reviews', icon: Star },
      { path: '/expert/profile', label: 'My Profile', icon: Settings },
    ],
    admin: [
      { path: '/admin/dashboard', label: 'Dashboard', icon: Home },
      { path: '/admin/experts', label: 'Experts', icon: Users },
      { path: '/admin/students', label: 'Students', icon: Users },
      { path: '/admin/bookings', label: 'Bookings', icon: Calendar },
      { path: '/admin/payments', label: 'Payments', icon: CreditCard },
      { path: '/admin/feedback', label: 'Feedback', icon: BookOpen },
      { path: '/admin/settings', label: 'Settings', icon: Settings },
    ]
  };

  const currentNav = navItems[role];

  return (
    <div className="min-h-screen flex flex-col bg-[#010101] text-white selection:bg-[#0a2540] selection:text-[#ffebbf]">
      {/* Top Navbar */}
      <header className="sticky top-0 z-50 bg-[#090e18]/95 backdrop-blur-xl border-b border-[#0a2540] shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-9 h-9 rounded-xl bg-[#090e18] border border-[#b58153]/60 flex items-center justify-center p-1.5 shadow-ns-gold transition-transform group-hover:scale-105">
                <GoldChevronIcon size={20} />
              </div>
              <span className="text-xl font-extrabold text-gold-gradient tracking-tight font-display">
                Lecturely
              </span>
            </Link>

            {/* Desktop Horizontal Navigation Links */}
            <nav className="hidden md:flex items-center gap-1.5 overflow-x-auto py-1">
              {currentNav.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 whitespace-nowrap ${
                      isActive ? 'nav-pill-active' : 'nav-pill-inactive'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Icons */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <ThemeToggle />
              <NotificationBell />

              <button
                onClick={() => navigate(`/${role === 'admin' ? 'admin/settings' : role + '/profile'}`)}
                title="View My Profile"
                className="h-9 w-9 rounded-full bg-gradient-to-br from-[#ffebbf] to-[#b58153] flex items-center justify-center text-[#010101] font-black text-xs shadow-ns-gold border border-[#ffebbf] hover:scale-110 transition-transform cursor-pointer overflow-hidden flex-shrink-0"
              >
                {(user as any)?.profilePhotoUrl ? (
                  <img src={(user as any).profilePhotoUrl} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  role === 'student' ? 'ST' : role === 'expert' ? 'EX' : 'AD'
                )}
              </button>

              <button
                onClick={handleSignOut}
                title="Sign Out"
                className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-rose-400 hover:text-white bg-[#010101] hover:bg-rose-950/60 border border-[#0a2540] hover:border-rose-500/40 rounded-xl transition uppercase tracking-wider"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-[#0a2540]"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Nav Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#090e18] border-b border-[#0a2540] px-4 pt-2 pb-4 space-y-1">
            {currentNav.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition ${
                    isActive 
                      ? 'bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101]' 
                      : 'text-slate-300 hover:bg-[#0a2540] hover:text-[#ffebbf]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
            <button
              onClick={() => { setMobileMenuOpen(false); handleSignOut(); }}
              className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs font-bold text-rose-400 rounded-xl hover:bg-rose-950/40 transition uppercase tracking-wider mt-2 border border-rose-500/20"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        )}
      </header>

      {/* Main Page Content */}
      <main className="flex-1 bg-[#010101] p-2 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      <FeedbackWidget />
    </div>
  );
};

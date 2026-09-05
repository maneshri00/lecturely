import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, Sparkles, LayoutDashboard, LogOut } from 'lucide-react';
import { NotificationBell } from './NotificationBell';
import { ThemeToggle } from './ThemeToggle';
import { GoldChevronIcon } from './GoldChevronIcon';
import { useAuthStore } from '../store/authStore';

export const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  
  const { user, isAuthenticated, logout } = useAuthStore();
  const isLoggedIn = isAuthenticated && !!user;

  const dashboardPath = user?.role === 'EXPERT' ? '/expert/dashboard' : user?.role === 'ADMIN' ? '/admin/dashboard' : '/student/dashboard';
  const profilePath = user?.role === 'EXPERT' ? '/expert/profile' : '/student/profile';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? 'bg-[#010101]/90 backdrop-blur-2xl border-b border-[#0a2540] shadow-md py-3' : 'bg-[#010101] border-b border-[#0a2540]/80 py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        
        {/* Brand Logo - Lecturely */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-[#090e18] border-2 border-[#b58153]/60 flex items-center justify-center shadow-ns-gold transition-all duration-300 group-hover:scale-105 p-1.5">
              <GoldChevronIcon size={24} />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[#ffebbf] animate-ping opacity-75"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black font-display text-gold-shiny tracking-tight leading-none">
              Lecturely
            </span>
            <span className="text-[10px] font-bold text-[#ffebbf] tracking-[0.25em] uppercase mt-0.5 flex items-center gap-1">
              India <Sparkles size={10} className="text-[#b58153] inline" />
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/experts" className="text-sm font-semibold text-slate-300 hover:text-[#ffebbf] transition-colors duration-200">Find Experts</Link>
          <Link to="/how-it-works" className="text-sm font-semibold text-slate-300 hover:text-[#ffebbf] transition-colors duration-200">How It Works</Link>
          <Link to="/about" className="text-sm font-semibold text-slate-300 hover:text-[#ffebbf] transition-colors duration-200">About Us</Link>
          
          <ThemeToggle />

          {isLoggedIn ? (
            <div className="flex items-center space-x-4 pl-4 border-l border-[#0a2540]">
              <Link 
                to={dashboardPath}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#ffebbf] hover:text-white bg-[#0a2540] px-3.5 py-2 rounded-xl border border-[#b58153]/40 hover:border-[#ffebbf] transition"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-[#b58153]" />
                <span>Dashboard</span>
              </Link>
              <NotificationBell />
              <Link 
                to={profilePath} 
                title={`View ${user.fullName}'s Profile`}
                className="w-10 h-10 bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] rounded-full flex items-center justify-center font-black text-sm hover:scale-105 border-2 border-[#ffebbf] transition shadow-md"
              >
                {user.fullName ? user.fullName.substring(0, 2).toUpperCase() : 'ME'}
              </Link>
              <button
                onClick={handleLogout}
                title="Log Out"
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-xl transition"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4 pl-4 border-l border-[#0a2540]">
              <Link to="/login" className="text-sm font-semibold text-slate-300 hover:text-[#ffebbf] transition-colors duration-200">Log in</Link>
              <Link to="/register" className="btn-primary text-xs px-6 py-2.5 shadow-ns-gold">
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-[#ffebbf] p-2 rounded-xl bg-[#0a2540] border border-[#b58153]/30" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      
      {/* Mobile Navigation Dropdown */}
      {mobileMenu && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#090e18] border-b border-[#0a2540] shadow-2xl px-6 py-8 space-y-4 animate-slide-down">
          <Link to="/experts" onClick={() => setMobileMenu(false)} className="block text-slate-200 font-semibold py-2 hover:text-[#ffebbf]">Find Experts</Link>
          <Link to="/how-it-works" onClick={() => setMobileMenu(false)} className="block text-slate-200 font-semibold py-2 hover:text-[#ffebbf]">How It Works</Link>
          <Link to="/about" onClick={() => setMobileMenu(false)} className="block text-slate-200 font-semibold py-2 hover:text-[#ffebbf]">About Us</Link>
          
          <div className="pt-4 border-t border-[#0a2540] flex flex-col space-y-3">
            {isLoggedIn ? (
              <>
                <Link to={dashboardPath} onClick={() => setMobileMenu(false)} className="block text-center btn-primary py-3 font-bold uppercase tracking-wider text-xs">
                  Go to Dashboard
                </Link>
                <Link to={profilePath} onClick={() => setMobileMenu(false)} className="block text-center text-slate-200 font-semibold py-3 border border-[#0a2540] rounded-xl hover:border-[#b58153]">
                  My Profile ({user.fullName})
                </Link>
                <button onClick={() => { setMobileMenu(false); handleLogout(); }} className="w-full text-rose-400 font-semibold py-2 text-center">
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenu(false)} className="block text-center text-slate-200 font-semibold py-3 border border-[#0a2540] rounded-xl hover:border-[#b58153]">Log in</Link>
                <Link to="/register" onClick={() => setMobileMenu(false)} className="block text-center btn-primary py-3">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import { BOOKING_ROLES } from '../utils/constants';
import { GraduationCap, Award, Eye, EyeOff } from 'lucide-react';
import { GoogleSignInButton } from '../components/GoogleSignInButton';
import { GoogleAccountChooserModal } from '../components/GoogleAccountChooserModal';

import { OtpVerificationModal } from '../components/OtpVerificationModal';

export const RegisterPage: React.FC = () => {
  const [role, setRole] = useState<'STUDENT' | 'EXPERT'>('STUDENT');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [areas, setAreas] = useState<string[]>([]);
  const [areaInput, setAreaInput] = useState('');
  
  // OTP Verification state
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [pendingUserAuth, setPendingUserAuth] = useState<any>(null);
  const [otpCode, setOtpCode] = useState<string>('');

  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleAddArea = () => {
    if (areaInput.trim() && !areas.includes(areaInput.trim())) {
      setAreas([...areas, areaInput.trim()]);
      setAreaInput('');
    }
  };

  const handleRemoveArea = (item: string) => {
    setAreas(areas.filter((a) => a !== item));
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      let res;
      if (role === 'STUDENT') {
        res = await authService.registerStudent({
          ...data,
          yearOfStudy: Number(data.yearOfStudy) || 1,
        });
      } else {
        res = await authService.registerExpert({
          ...data,
          industryExperience: Number(data.industryExperience) || 0,
          academicExperience: Number(data.academicExperience) || 0,
          sessionFee: Number(data.sessionFee) || 0,
          areas,
          languages: ['English', 'Hindi'],
        });
      }

      if (res.success && res.data) {
        setPendingUserAuth(res.data);

        // Send 6-digit OTP code to registered email
        const otpRes = await authService.sendOtp(data.email);
        const code = otpRes?.data?.otp || '';
        setOtpCode(code);
        setIsOtpModalOpen(true);
        toast.success(`6-Digit OTP Code sent to ${data.email}`);
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Registration failed. Please check inputs.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerified = () => {
    if (!pendingUserAuth) return;
    const { user, accessToken, refreshToken } = pendingUserAuth;
    setAuth(user, accessToken, refreshToken);
    setIsOtpModalOpen(false);
    toast.success(`Welcome to Lecturely India! Registration completed.`);
    navigate(role === 'STUDENT' ? '/student/dashboard' : '/expert/dashboard');
  };

  const handleSelectGoogleAccount = async (email: string, fullName: string) => {
    setIsGoogleModalOpen(false);
    setGoogleLoading(true);
    try {
      const res = await authService.loginWithGoogle({
        email,
        fullName,
        role,
      });
      if (res.success && res.data) {
        setAuth(res.data.user, res.data.accessToken, res.data.refreshToken);
        toast.success(`Welcome to Lecturely! Registered with Google as ${fullName}.`);
        navigate(role === 'STUDENT' ? '/student/dashboard' : '/expert/dashboard');
      }
    } catch (err: any) {
      toast.error('Google Sign-In failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="glass-card-premium p-8 md:p-10 border border-[#0a2540] shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black font-display text-white tracking-tight">Create Your Account</h1>
        <p className="text-sm font-semibold text-[#ffebbf] mt-1 tracking-wide">Join India's premier learning marketplace</p>
      </div>

      {/* Role Selection Tabs */}
      <div className="flex bg-[#010101] p-1.5 rounded-xl border border-[#0a2540] mb-6">
        <button
          type="button"
          onClick={() => setRole('STUDENT')}
          className={`flex-1 py-3 px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 ${
            role === 'STUDENT'
              ? 'bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] shadow-ns-gold'
              : 'text-slate-300 hover:text-[#ffebbf]'
          }`}
        >
          <GraduationCap className="w-4 h-4" /> Student / Institution
        </button>
        <button
          type="button"
          onClick={() => setRole('EXPERT')}
          className={`flex-1 py-3 px-4 rounded-lg font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 ${
            role === 'EXPERT'
              ? 'bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] shadow-ns-gold'
              : 'text-slate-300 hover:text-[#ffebbf]'
          }`}
        >
          <Award className="w-4 h-4" /> Teacher / Expert
        </button>
      </div>

      {/* Official Native Google Identity Sign-In (Students Only) */}
      {role === 'STUDENT' && (
        <div className="mb-6 space-y-3">
          <GoogleSignInButton
            onSuccess={(email, fullName) => handleSelectGoogleAccount(email, fullName)}
            text="Continue with Google"
            role="STUDENT"
          />

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-[#0a2540]"></div>
            <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase tracking-widest">or register with email</span>
            <div className="flex-grow border-t border-[#0a2540]"></div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Full Name</label>
            <input
              {...register('fullName', { required: 'Name is required' })}
              className="w-full px-4 py-3 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white placeholder:text-slate-400 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#b58153]/40 transition shadow-inner"
              placeholder="e.g. Dr. Ramesh Kumar"
            />
            {errors.fullName && <p className="text-rose-400 text-xs mt-1">{String(errors.fullName.message)}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Email Address</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full px-4 py-3 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white placeholder:text-slate-400 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#b58153]/40 transition shadow-inner"
              placeholder="name@example.com"
            />
            {errors.email && <p className="text-rose-400 text-xs mt-1">{String(errors.email.message)}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Mobile Phone (WhatsApp)</label>
            <input
              {...register('phone', { required: 'Phone is required' })}
              className="w-full px-4 py-3 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white placeholder:text-slate-400 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#b58153]/40 transition shadow-inner"
              placeholder="+91 98765 43210"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: 'Password required', minLength: { value: 8, message: 'Min 8 chars' } })}
                className="w-full pl-4 pr-11 py-3 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white placeholder:text-slate-400 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#b58153]/40 transition shadow-inner"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-rose-400 text-xs mt-1">{String(errors.password.message)}</p>}
          </div>
        </div>

        {role === 'STUDENT' ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">College / Institution Name</label>
                <input
                  {...register('institution', { required: 'Institution is required' })}
                  className="w-full px-4 py-3 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white placeholder:text-slate-400 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#b58153]/40 transition shadow-inner"
                  placeholder="e.g. BITS Pilani / IIT Madras"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Booking Capacity / Role</label>
                <select
                  {...register('bookingRole')}
                  className="w-full px-4 py-3 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#b58153]/40 transition"
                >
                  {BOOKING_ROLES.map((r) => (
                    <option key={r.value} value={r.value} className="bg-[#090e18] text-white">{r.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Course</label>
                <input {...register('course')} className="w-full px-4 py-3 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white placeholder:text-slate-400 rounded-xl text-sm font-medium focus:outline-none" placeholder="B.Tech / MBA" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Branch</label>
                <input {...register('branch')} className="w-full px-4 py-3 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white placeholder:text-slate-400 rounded-xl text-sm font-medium focus:outline-none" placeholder="ECE / CSE" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Year of Study</label>
                <select {...register('yearOfStudy')} className="w-full px-4 py-3 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white rounded-xl text-sm font-medium focus:outline-none">
                  {[1, 2, 3, 4, 5].map((y) => <option key={y} value={y} className="bg-[#090e18] text-white">Year {y}</option>)}
                </select>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Current Organization</label>
                <input
                  {...register('organization', { required: 'Organization required' })}
                  className="w-full px-4 py-3 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white placeholder:text-slate-400 rounded-xl text-sm font-medium focus:outline-none"
                  placeholder="e.g. Google / IIT Delhi / TCS"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Designation</label>
                <input
                  {...register('designation', { required: 'Designation required' })}
                  className="w-full px-4 py-3 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white placeholder:text-slate-400 rounded-xl text-sm font-medium focus:outline-none"
                  placeholder="e.g. Senior Architect / Professor"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Industry Exp (Yrs)</label>
                <input type="number" {...register('industryExperience')} className="w-full px-4 py-3 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white rounded-xl text-sm font-medium focus:outline-none" defaultValue={5} />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Academic Exp (Yrs)</label>
                <input type="number" {...register('academicExperience')} className="w-full px-4 py-3 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white rounded-xl text-sm font-medium focus:outline-none" defaultValue={2} />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Session Fee (₹/hr)</label>
                <input type="number" step="500" {...register('sessionFee')} className="w-full px-4 py-3 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white rounded-xl text-sm font-medium focus:outline-none" defaultValue={5000} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Expertise / Specializations</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={areaInput}
                  onChange={(e) => setAreaInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white placeholder:text-slate-400 rounded-xl text-sm font-medium focus:outline-none"
                  placeholder="Type area e.g. VLSI, Machine Learning..."
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddArea(); } }}
                />
                <button type="button" onClick={handleAddArea} className="btn-secondary text-xs px-5 py-2.5">Add</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {areas.map((a) => (
                  <span key={a} className="inline-flex items-center gap-1.5 bg-[#0a2540] text-[#ffebbf] border border-[#b58153]/40 text-xs px-3 py-1 rounded-full font-semibold">
                    {a}
                    <button type="button" onClick={() => handleRemoveArea(a)} className="text-slate-400 hover:text-white">×</button>
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">City</label>
            <input {...register('city', { required: 'City required' })} className="w-full px-4 py-3 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white placeholder:text-slate-400 rounded-xl text-sm font-medium focus:outline-none" placeholder="Bangalore" />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">State</label>
            <input {...register('state', { required: 'State required' })} className="w-full px-4 py-3 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white placeholder:text-slate-400 rounded-xl text-sm font-medium focus:outline-none" placeholder="Karnataka" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full mt-6 py-3.5 text-base shadow-ns-gold font-black uppercase tracking-wider"
        >
          {loading ? 'Creating Account...' : `Register as ${role === 'STUDENT' ? 'Student' : 'Expert'}`}
        </button>

        <div className="text-center mt-6 text-sm text-slate-400 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-[#ffebbf] hover:underline">
            Sign In
          </Link>
        </div>
      </form>

      {/* Google Account Chooser Modal */}
      <GoogleAccountChooserModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        onSelectAccount={handleSelectGoogleAccount}
      />

      {/* 6-Digit OTP Verification Modal */}
      <OtpVerificationModal
        isOpen={isOtpModalOpen}
        email={pendingUserAuth?.user?.email || ''}
        initialOtpCode={otpCode}
        onClose={() => setIsOtpModalOpen(false)}
        onSuccess={handleOtpVerified}
      />
    </div>
  );
};

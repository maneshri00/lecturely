import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { authService } from '../services/authService';
import { useAuthStore } from '../store/authStore';
import { Eye, EyeOff } from 'lucide-react';
import { GoogleSignInButton } from '../components/GoogleSignInButton';
import { GoogleAccountChooserModal } from '../components/GoogleAccountChooserModal';

export const LoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isGoogleModalOpen, setIsGoogleModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const onSubmit = async (data: any) => {
    try {
      // Direct Authentication for Login (No OTP prompt on returning logins)
      const res = await authService.login(data.email, data.password);
      if (res.success && res.data) {
        const { user, accessToken, refreshToken } = res.data;
        setAuth(user, accessToken, refreshToken);
        toast.success(`Welcome back, ${user.fullName || user.role}! 🎉`);

        if (user.role === 'ADMIN') navigate('/admin/dashboard');
        else if (user.role === 'EXPERT') navigate('/expert/dashboard');
        else navigate('/student/dashboard');
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Login failed. Please check your email and password.');
    }
  };

  const handleSelectGoogleAccount = async (email: string, fullName: string) => {
    setIsGoogleModalOpen(false);
    setGoogleLoading(true);
    try {
      const res = await authService.loginWithGoogle({
        email,
        fullName,
        role: 'STUDENT',
      });
      if (res.success && res.data) {
        setAuth(res.data.user, res.data.accessToken, res.data.refreshToken);
        toast.success(`Signed in with Google as ${fullName}!`);
        navigate('/student/dashboard');
      }
    } catch (err: any) {
      toast.error('Google Sign-In failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="glass-card-premium p-8 md:p-10 border border-[#0a2540] shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-black font-display text-white tracking-tight">Welcome Back</h2>
        <p className="mt-2 text-sm text-slate-300 font-medium">
          Don't have an account?{' '}
          <Link to="/register" className="font-bold text-[#ffebbf] hover:underline">
            Sign up today
          </Link>
        </p>
      </div>

      {/* Official Native Google Identity Sign-In */}
      <div className="mb-6 space-y-3">
        <GoogleSignInButton
          onSuccess={(email, fullName) => handleSelectGoogleAccount(email, fullName)}
          text="Continue with Google"
        />

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-[#0a2540]"></div>
          <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase tracking-widest">or sign in with email</span>
          <div className="flex-grow border-t border-[#0a2540]"></div>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Email address</label>
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
            className="w-full px-4 py-3 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white placeholder:text-slate-400 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#b58153]/40 transition shadow-inner"
            placeholder="name@example.com"
          />
          {errors.email && <p className="mt-1.5 text-xs text-rose-400 font-semibold">{errors.email.message as string}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Password</label>
          <div className="relative">
            <input
              {...register('password', { required: 'Password is required' })}
              type={showPassword ? 'text' : 'password'}
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
          {errors.password && <p className="mt-1.5 text-xs text-rose-400 font-semibold">{errors.password.message as string}</p>}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input id="remember-me" type="checkbox" className="h-4 w-4 text-[#b58153] focus:ring-[#b58153] border-[#0a2540] rounded bg-[#010101]" />
            <label htmlFor="remember-me" className="ml-2 block text-xs font-semibold text-slate-300">Remember me</label>
          </div>
          <div className="text-xs font-semibold">
            <a href="#" className="text-[#ffebbf] hover:underline">Forgot password?</a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full py-3.5 text-base shadow-ns-gold font-black uppercase tracking-wider disabled:opacity-50"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </form>

      {/* Google Account Chooser Modal */}
      <GoogleAccountChooserModal
        isOpen={isGoogleModalOpen}
        onClose={() => setIsGoogleModalOpen(false)}
        onSelectAccount={handleSelectGoogleAccount}
      />
    </div>
  );
};

export default LoginPage;

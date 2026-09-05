import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, RefreshCw, X, CheckCircle } from 'lucide-react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

interface OtpVerificationModalProps {
  isOpen: boolean;
  email: string;
  onClose: () => void;
  onSuccess: () => void;
  initialOtpCode?: string;
}

export const OtpVerificationModal: React.FC<OtpVerificationModalProps> = ({
  isOpen,
  email,
  onClose,
  onSuccess,
  initialOtpCode = '',
}) => {
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [demoOtp, setDemoOtp] = useState<string>(initialOtpCode);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (initialOtpCode) {
      setDemoOtp(initialOtpCode);
    }
  }, [initialOtpCode]);

  useEffect(() => {
    if (!isOpen) return;

    // Focus first input box
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 150);

    // Resend countdown timer
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (index: number, value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, '');
    if (!cleanValue) {
      const updated = [...otpDigits];
      updated[index] = '';
      setOtpDigits(updated);
      return;
    }

    const updated = [...otpDigits];
    updated[index] = cleanValue[cleanValue.length - 1];
    setOtpDigits(updated);

    // Auto-focus next input box
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    if (!pasted) return;

    const digits = pasted.split('');
    const updated = [...otpDigits];
    digits.forEach((d, i) => {
      if (i < 6) updated[i] = d;
    });
    setOtpDigits(updated);

    const targetIndex = Math.min(digits.length, 5);
    inputRefs.current[targetIndex]?.focus();
  };

  const handleVerify = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const fullOtp = otpDigits.join('');
    if (fullOtp.length !== 6) {
      toast.error('Please enter all 6 digits of the OTP code.');
      return;
    }

    setLoading(true);
    try {
      await authService.verifyOtp(email, fullOtp);
      toast.success('OTP verified successfully! 🎉');
      onSuccess();
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || 'Invalid or expired 6-digit OTP code.';
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await authService.resendOtp(email);
      setResendTimer(60);
      toast.success(`New OTP code sent to ${email}`);
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || 'Failed to resend OTP code.';
      toast.error(errMsg);
    }
  };

  const autofillDemoOtp = () => {
    if (demoOtp && demoOtp.length === 6) {
      const digits = demoOtp.split('');
      setOtpDigits(digits);
      toast.success('OTP code autofilled!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-card-premium max-w-md w-full border border-[#0a2540] p-6 sm:p-8 space-y-6 shadow-2xl relative bg-[#090e18]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-[#0a2540] border border-[#b58153]/40 text-[#ffebbf] flex items-center justify-center mx-auto shadow-ns-gold">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-black font-display text-white">Check Your Email Inbox</h2>
          <p className="text-xs text-slate-300">
            We sent a 6-digit verification code to <span className="text-[#ffebbf] font-bold">{email}</span>. Please open your email inbox to retrieve your code.
          </p>
        </div>

        {/* 6 Segmented Input Boxes */}
        <form onSubmit={handleVerify} className="space-y-6">
          <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
            {otpDigits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-mono font-black text-white bg-[#010101] border border-[#0a2540] rounded-xl focus:border-[#b58153] focus:ring-1 focus:ring-[#b58153] focus:outline-none transition shadow-inner"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || otpDigits.join('').length !== 6}
            className="w-full py-3.5 btn-primary font-black uppercase text-xs tracking-wider shadow-ns-gold disabled:opacity-50"
          >
            {loading ? 'Verifying OTP...' : 'Verify & Continue'}
          </button>
        </form>

        {/* Resend Section */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-[#0a2540]">
          <span>Didn't receive code?</span>
          {resendTimer > 0 ? (
            <span className="font-mono text-slate-400">Resend in {resendTimer}s</span>
          ) : (
            <button
              onClick={handleResend}
              type="button"
              className="font-bold text-[#ffebbf] hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

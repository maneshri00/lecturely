import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { GoldChevronIcon } from '../components/GoldChevronIcon';
import { CheckCircle2, Sparkles } from 'lucide-react';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#010101] text-white selection:bg-[#0a2540] selection:text-[#ffebbf]">

      {/* LEFT PANEL — always dark, never affected by light mode */}
      <div className="auth-panel hidden md:flex md:w-1/2 text-white p-12 flex-col justify-between border-r border-[#0a2540] relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0a2540 0%, #090e18 60%, #010101 100%)' }}>

        {/* Glow accents */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#b58153]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-[#ffebbf]/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#090e18] border border-[#b58153]/60 flex items-center justify-center p-1.5 shadow-ns-gold transition-transform group-hover:scale-105">
              <GoldChevronIcon size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight leading-none" style={{ background: 'linear-gradient(180deg, #ffebbf, #b58153)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Lecturely</h1>
              <p className="text-[#ffebbf] font-bold tracking-widest text-[10px] mt-0.5 uppercase flex items-center gap-1">India <Sparkles size={9} className="text-[#b58153]" /></p>
            </div>
          </Link>

          <div className="mt-20 max-w-lg">
            <div className="inline-block px-3 py-1 bg-[#0a2540] border border-[#b58153]/40 text-[#ffebbf] text-xs font-bold uppercase tracking-wider rounded-full mb-5">
              Never Settle For Ordinary
            </div>
            <h2 className="text-4xl font-extrabold leading-tight mb-5 font-display" style={{ color: '#ffffff' }}>
              Connect with <span style={{ background: 'linear-gradient(135deg, #ffebbf, #b58153)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>India's top</span> industry leaders &amp; educators
            </h2>
            <p className="text-slate-300 text-base mb-8 leading-relaxed">
              Bridge academic theory with real-world industry expertise through verified guest lectures, workshops, and mentoring.
            </p>
            <ul className="space-y-4">
              {[
                'Verified industry experts & faculty',
                'Transparent Razorpay payment escrow',
                'Online Google Meet & Offline campus delivery',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#ffebbf] shrink-0" />
                  <span className="text-slate-200 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-slate-500 text-xs relative z-10">
          &copy; {new Date().getFullYear()} Lecturely India. All rights reserved.
        </div>
      </div>

      {/* RIGHT PANEL — form area */}
      <div className="w-full md:w-1/2 bg-[#090e18] flex flex-col min-h-screen justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:hidden text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-[#090e18] border border-[#b58153]/60 flex items-center justify-center p-1.5 shadow-ns-gold">
              <GoldChevronIcon size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-black" style={{ background: 'linear-gradient(180deg, #ffebbf, #b58153)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Lecturely</h1>
              <p className="text-[#ffebbf] font-bold tracking-widest text-[10px] uppercase">India</p>
            </div>
          </Link>
        </div>
        <div className="max-w-md w-full mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

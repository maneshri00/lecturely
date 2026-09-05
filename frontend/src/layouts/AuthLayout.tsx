import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { GoldChevronIcon } from '../components/GoldChevronIcon';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#010101] text-white selection:bg-[#0a2540] selection:text-[#ffebbf]">
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#0a2540] via-[#090e18] to-[#010101] text-white p-12 flex-col justify-between border-r border-[#0a2540] relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#b58153]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#090e18] border border-[#b58153]/60 flex items-center justify-center p-1.5 shadow-ns-gold transition-transform group-hover:scale-105">
              <GoldChevronIcon size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gold-gradient tracking-tight leading-none">Lecturely</h1>
              <p className="text-[#ffebbf] font-bold tracking-widest text-[10px] mt-0.5 uppercase">India</p>
            </div>
          </Link>
          <div className="mt-24 max-w-lg">
            <div className="inline-block px-3 py-1 bg-[#0a2540] border border-[#b58153]/40 text-[#ffebbf] text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              Never Settle For Ordinary
            </div>
            <h2 className="text-4xl font-extrabold leading-tight mb-6 text-white font-display">
              Connect with India's top industry leaders & educators
            </h2>
            <p className="text-slate-300 text-base mb-8 leading-relaxed">
              Bridge academic theory with real-world industry expertise through verified guest lectures, workshops, and mentoring.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center font-medium">
                <span className="w-8 h-8 rounded-full bg-[#0a2540] text-[#ffebbf] border border-[#b58153]/40 flex items-center justify-center mr-3 font-bold">✓</span>
                <span className="text-slate-200">Verified industry experts & faculty</span>
              </li>
              <li className="flex items-center font-medium">
                <span className="w-8 h-8 rounded-full bg-[#0a2540] text-[#ffebbf] border border-[#b58153]/40 flex items-center justify-center mr-3 font-bold">✓</span>
                <span className="text-slate-200">Transparent Razorpay payment escrow</span>
              </li>
              <li className="flex items-center font-medium">
                <span className="w-8 h-8 rounded-full bg-[#0a2540] text-[#ffebbf] border border-[#b58153]/40 flex items-center justify-center mr-3 font-bold">✓</span>
                <span className="text-slate-200">Online Google Meet & Offline campus delivery</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-slate-500 text-xs relative z-10">
          &copy; {new Date().getFullYear()} Lecturely India. All rights reserved.
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-[#090e18] flex flex-col min-h-screen justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="md:hidden text-center mb-8">
           <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-[#090e18] border border-[#b58153]/60 flex items-center justify-center p-1.5 shadow-ns-gold">
              <GoldChevronIcon size={20} />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gold-gradient">Lecturely</h1>
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

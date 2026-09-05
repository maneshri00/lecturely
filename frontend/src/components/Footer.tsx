import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';
import { GoldChevronIcon } from './GoldChevronIcon';

export const Footer = () => (
  <footer className="bg-[#010101] text-white pt-16 pb-8 border-t border-[#0a2540] relative overflow-hidden">
    {/* Radial gold glow element */}
    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#b58153]/5 rounded-full blur-3xl pointer-events-none"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-[#090e18] border-2 border-[#b58153]/60 flex items-center justify-center shadow-ns-gold p-1.5">
              <GoldChevronIcon size={22} />
            </div>
            <div>
              <span className="text-xl font-extrabold text-gold-gradient tracking-tight block leading-none">Lecturely</span>
              <span className="text-[10px] font-bold text-[#ffebbf] tracking-widest uppercase mt-0.5 block">India</span>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Bridging academia & industry through guest lectures, workshops, mentoring, and masterclasses across India.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-9 h-9 rounded-full bg-[#0a2540]/60 border border-[#0a2540] flex items-center justify-center text-slate-400 hover:text-[#ffebbf] hover:border-[#b58153]/40 transition"><Facebook className="w-4 h-4" /></a>
            <a href="#" className="w-9 h-9 rounded-full bg-[#0a2540]/60 border border-[#0a2540] flex items-center justify-center text-slate-400 hover:text-[#ffebbf] hover:border-[#b58153]/40 transition"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="w-9 h-9 rounded-full bg-[#0a2540]/60 border border-[#0a2540] flex items-center justify-center text-slate-400 hover:text-[#ffebbf] hover:border-[#b58153]/40 transition"><Instagram className="w-4 h-4" /></a>
            <a href="#" className="w-9 h-9 rounded-full bg-[#0a2540]/60 border border-[#0a2540] flex items-center justify-center text-slate-400 hover:text-[#ffebbf] hover:border-[#b58153]/40 transition"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-4 text-[#ffebbf]">For Students</h3>
          <ul className="space-y-3">
            <li><Link to="/experts" className="text-slate-400 hover:text-[#ffebbf] transition text-sm">Find Experts</Link></li>
            <li><Link to="/how-it-works" className="text-slate-400 hover:text-[#ffebbf] transition text-sm">How it Works</Link></li>
            <li><Link to="/student/requirements/new" className="text-slate-400 hover:text-[#ffebbf] transition text-sm">Post a Requirement</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-4 text-[#ffebbf]">For Experts</h3>
          <ul className="space-y-3">
            <li><Link to="/register" className="text-slate-400 hover:text-[#ffebbf] transition text-sm">Join as an Expert</Link></li>
            <li><Link to="/expert/dashboard" className="text-slate-400 hover:text-[#ffebbf] transition text-sm">Expert Dashboard</Link></li>
            <li><Link to="/expert/verification" className="text-slate-400 hover:text-[#ffebbf] transition text-sm">Verification Portal</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-4 text-[#ffebbf]">Legal & Policies</h3>
          <ul className="space-y-2 text-xs font-medium">
            <li><Link to="/about" className="text-slate-400 hover:text-[#ffebbf] transition">About Lecturely</Link></li>
            <li><Link to="/policies?tab=confidentiality" className="text-[#ffebbf] hover:underline font-bold transition flex items-center gap-1">🔒 Zero Contact & Revenue NDA</Link></li>
            <li><Link to="/policies?tab=refunds" className="text-amber-300 hover:underline font-bold transition">Refund & Availability Rules</Link></li>
            <li><Link to="/policies?tab=privacy_boundaries" className="text-slate-400 hover:text-[#ffebbf] transition">Personal Privacy Boundaries</Link></li>
            <li><Link to="/policies?tab=terms" className="text-slate-400 hover:text-[#ffebbf] transition">Terms of Service</Link></li>
            <li><Link to="/policies?tab=privacy" className="text-slate-400 hover:text-[#ffebbf] transition">Privacy & DPDP Act</Link></li>
            <li><Link to="/policies?tab=academic" className="text-slate-400 hover:text-[#ffebbf] transition">Academic Integrity</Link></li>
            <li><Link to="/policies?tab=grievance" className="text-slate-400 hover:text-[#ffebbf] transition">Grievance Redressal</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-[#0a2540] text-center flex flex-col md:flex-row justify-between items-center">
        <p className="text-slate-500 text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Lecturely India. Never Settle for ordinary learning.
        </p>
        <div className="flex items-center text-[#ffebbf] text-sm font-medium">
          <Mail className="w-4 h-4 mr-2" />
          support@lecturely.in
        </div>
      </div>
    </div>
  </footer>
);

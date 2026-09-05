import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';

export const HowItWorksPage: React.FC = () => {
  return (
    <div className="py-16 bg-[#010101] text-white min-h-screen relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#0a2540]/50 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block px-3 py-1 bg-[#0a2540] border border-[#b58153]/40 text-[#ffebbf] text-xs font-bold uppercase tracking-widest rounded-full mb-3">
            Simple 4-Step Process
          </div>
          <h1 className="text-4xl md:text-6xl font-black font-display text-white tracking-tight">
            How <span className="text-gold-shiny">Lecturely India</span> Works
          </h1>
          <p className="text-lg text-slate-300 mt-4 leading-relaxed">
            A seamless three-sided marketplace matching Indian educational institutions & student committees with verified industry leaders & academics.
          </p>
        </div>

        {/* Steps Card */}
        <div className="glass-card-premium p-8 md:p-14 mb-16 relative">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-xs font-bold text-[#ffebbf] uppercase tracking-widest bg-[#0a2540] border border-[#b58153]/40 px-3.5 py-1.5 rounded-full">
              For Students & Colleges
            </span>
          </div>
          
          <h2 className="text-3xl font-black font-display text-white mb-10">Book Expert Guest Lectures in 4 Steps</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            <div className="p-6 rounded-2xl bg-[#090e18] border border-[#0a2540] hover:border-[#b58153]/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] font-black font-display text-xl flex items-center justify-center mb-5 shadow-ns-gold group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="font-bold font-display text-white text-xl mb-2 group-hover:text-[#ffebbf] transition-colors">Explore Directory</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Filter 1,000+ verified professors, researchers & industry experts by subject, city, and budget.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#090e18] border border-[#0a2540] hover:border-[#b58153]/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] font-black font-display text-xl flex items-center justify-center mb-5 shadow-ns-gold group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="font-bold font-display text-white text-xl mb-2 group-hover:text-[#ffebbf] transition-colors">Post Requirement</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Specify your date, preferred topic, attendee count, and budget. Receive tailored recommendations.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#090e18] border border-[#0a2540] hover:border-[#b58153]/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] font-black font-display text-xl flex items-center justify-center mb-5 shadow-ns-gold group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="font-bold font-display text-white text-xl mb-2 group-hover:text-[#ffebbf] transition-colors">Confirm & Pay</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Once the expert accepts your request or counter-offer, pay securely via Razorpay/UPI.</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#090e18] border border-[#0a2540] hover:border-[#b58153]/50 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] font-black font-display text-xl flex items-center justify-center mb-5 shadow-ns-gold group-hover:scale-110 transition-transform">
                4
              </div>
              <h3 className="font-bold font-display text-white text-xl mb-2 group-hover:text-[#ffebbf] transition-colors">Host Session</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Get instant Google Meet video links or coordinate campus visits. Rate your speaker post-session!</p>
            </div>

          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="glass-card-premium p-10 md:p-14 text-center relative overflow-hidden">
          <ShieldCheck className="w-16 h-16 text-[#ffebbf] mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-black font-display mb-3 text-gold-shiny">100% Quality & Verification Guarantee</h2>
          <p className="text-slate-300 max-w-2xl mx-auto mb-8 text-base leading-relaxed">
            Every teacher and expert on our platform passes thorough credential verification by our Admin team before being listed.
          </p>
          <Link to="/register">
            <Button size="lg" className="px-8 py-3.5 text-base shadow-ns-gold">
              Get Started Now <ArrowRight size={18} className="ml-2 inline" />
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

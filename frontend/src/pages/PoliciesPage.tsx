import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  ShieldCheck, FileText, RefreshCw, Award, Lock, BookOpen, 
  CreditCard, Calendar, AlertTriangle, Users, HelpCircle, Mail,
  Scale, CheckCircle2, ChevronRight, Gavel, Eye, Sparkles,
  PhoneOff, DollarSign, UserX, ShieldAlert
} from 'lucide-react';

export const PoliciesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'terms';

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white min-h-screen">
      {/* Header Banner */}
      <div className="glass-card-premium p-6 sm:p-10 border border-[#0a2540] bg-[#090e18] rounded-3xl mb-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#b58153]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs bg-[#0a2540] text-[#ffebbf] px-3 py-1 rounded-full border border-[#b58153]/40 font-bold uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Lecturely India Legal & Trust Hub
              </span>
              <span className="text-xs bg-emerald-950/80 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/40 font-mono font-bold">
                DPDP Act 2023 Compliant
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight">
              Platform <span className="text-gold-shiny">Policies & Terms</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl font-medium leading-relaxed">
              Strict rules governing zero off-platform contact, non-disclosure of revenue, personal privacy boundaries, escrow payouts, and 100% expert availability refund guarantees.
            </p>
          </div>

          <div className="p-4 bg-[#010101] rounded-2xl border border-[#b58153]/40 text-center font-mono text-xs space-y-1 self-stretch md:self-auto">
            <span className="text-[#ffebbf] font-bold block uppercase tracking-wider">Grievance Officer (India)</span>
            <span className="text-white block font-bold">Grievance Redressal Cell</span>
            <span className="text-amber-300 block">grievance@lecturely.in</span>
            <span className="text-[10px] text-slate-400 block pt-1">Response SLA: Within 48 Hours</span>
          </div>
        </div>
      </div>

      {/* Main Container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Sidebar Navigation Tabs */}
        <div className="lg:col-span-4 space-y-2">
          <div className="glass-card p-4 border border-[#0a2540] bg-[#090e18] rounded-2xl sticky top-24 space-y-1 shadow-xl">
            <span className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider px-3 py-2 block">
              Policy Categories
            </span>

            <button
              onClick={() => handleTabChange('confidentiality')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between border ${
                activeTab === 'confidentiality'
                  ? 'bg-gradient-to-r from-[#ffebbf] to-[#b58153] text-[#010101] border-[#ffebbf] shadow-ns-gold font-black'
                  : 'bg-[#010101] text-[#ffebbf] border-[#b58153]/40 hover:border-[#ffebbf]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <PhoneOff className="w-4 h-4 text-amber-400" />
                <span>Zero Direct Contact & Revenue NDA</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => handleTabChange('refunds')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between border ${
                activeTab === 'refunds'
                  ? 'bg-gradient-to-r from-[#ffebbf] to-[#b58153] text-[#010101] border-[#ffebbf] shadow-ns-gold font-black'
                  : 'bg-[#010101] text-slate-300 border-[#0a2540] hover:border-[#b58153]/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <RefreshCw className="w-4 h-4" />
                <span>Refund & Availability Rules</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => handleTabChange('privacy_boundaries')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between border ${
                activeTab === 'privacy_boundaries'
                  ? 'bg-gradient-to-r from-[#ffebbf] to-[#b58153] text-[#010101] border-[#ffebbf] shadow-ns-gold font-black'
                  : 'bg-[#010101] text-slate-300 border-[#0a2540] hover:border-[#b58153]/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <UserX className="w-4 h-4" />
                <span>Personal Privacy & Boundaries</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => handleTabChange('terms')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between border ${
                activeTab === 'terms'
                  ? 'bg-gradient-to-r from-[#ffebbf] to-[#b58153] text-[#010101] border-[#ffebbf] shadow-ns-gold font-black'
                  : 'bg-[#010101] text-slate-300 border-[#0a2540] hover:border-[#b58153]/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4" />
                <span>Terms & Conditions</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => handleTabChange('privacy')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between border ${
                activeTab === 'privacy'
                  ? 'bg-gradient-to-r from-[#ffebbf] to-[#b58153] text-[#010101] border-[#ffebbf] shadow-ns-gold font-black'
                  : 'bg-[#010101] text-slate-300 border-[#0a2540] hover:border-[#b58153]/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4" />
                <span>Privacy & DPDP Policy</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => handleTabChange('experts')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between border ${
                activeTab === 'experts'
                  ? 'bg-gradient-to-r from-[#ffebbf] to-[#b58153] text-[#010101] border-[#ffebbf] shadow-ns-gold font-black'
                  : 'bg-[#010101] text-slate-300 border-[#0a2540] hover:border-[#b58153]/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Award className="w-4 h-4" />
                <span>Expert & Speaker Policy</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => handleTabChange('students')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between border ${
                activeTab === 'students'
                  ? 'bg-gradient-to-r from-[#ffebbf] to-[#b58153] text-[#010101] border-[#ffebbf] shadow-ns-gold font-black'
                  : 'bg-[#010101] text-slate-300 border-[#0a2540] hover:border-[#b58153]/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4" />
                <span>Student Code of Conduct</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => handleTabChange('academic')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between border ${
                activeTab === 'academic'
                  ? 'bg-gradient-to-r from-[#ffebbf] to-[#b58153] text-[#010101] border-[#ffebbf] shadow-ns-gold font-black'
                  : 'bg-[#010101] text-slate-300 border-[#0a2540] hover:border-[#b58153]/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4" />
                <span>Academic Integrity</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => handleTabChange('payments')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between border ${
                activeTab === 'payments'
                  ? 'bg-gradient-to-r from-[#ffebbf] to-[#b58153] text-[#010101] border-[#ffebbf] shadow-ns-gold font-black'
                  : 'bg-[#010101] text-slate-300 border-[#0a2540] hover:border-[#b58153]/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4" />
                <span>Payments & Escrow Policy</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>

            <button
              onClick={() => handleTabChange('grievance')}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between border ${
                activeTab === 'grievance'
                  ? 'bg-gradient-to-r from-[#ffebbf] to-[#b58153] text-[#010101] border-[#ffebbf] shadow-ns-gold font-black'
                  : 'bg-[#010101] text-slate-300 border-[#0a2540] hover:border-[#b58153]/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Scale className="w-4 h-4" />
                <span>Dispute & Grievance</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-70" />
            </button>
          </div>
        </div>

        {/* Right Col: Detailed Policy Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-card p-6 sm:p-8 border border-[#0a2540] bg-[#090e18] rounded-3xl shadow-2xl space-y-6 leading-relaxed">

            {/* TAB: CONFIDENTIALITY & ZERO DIRECT CONTACT */}
            {activeTab === 'confidentiality' && (
              <div className="space-y-6">
                <div className="border-b border-[#0a2540] pb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-black font-display text-white flex items-center gap-2.5">
                    <PhoneOff className="w-6 h-6 text-amber-400" /> Revenue Non-Disclosure & Direct Contact Policy
                  </h2>
                  <span className="text-xs text-rose-400 bg-rose-950/80 px-3 py-1 rounded-full border border-rose-800/60 font-mono font-bold">
                    Strict Platform Anti-Bypass Rule
                  </span>
                </div>

                <div className="space-y-5 text-sm text-slate-300">
                  <div className="p-4 bg-[#010101] border-2 border-[#b58153]/60 rounded-2xl space-y-2">
                    <h3 className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-emerald-400" /> 1. Non-Disclosure of Revenue & Financial Earnings (NDA)
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Neither the Expert (Tutor/Mentor/Speaker) nor the Student/Institution shall disclose, publish, or share their earnings, revenues, platform commission splits, or financial settlement amounts to third parties or each other outside official Lecturely transaction invoices. Any breach of revenue confidentiality is subject to legal action and permanent account ban.
                    </p>
                  </div>

                  <div className="p-4 bg-[#010101] border-2 border-rose-500/50 rounded-2xl space-y-2">
                    <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                      <PhoneOff className="w-4 h-4 text-rose-400" /> 2. Strict Prohibition of Direct Contact Details Exchange
                    </h3>
                    <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
                      <li><strong>No Personal Phone / WhatsApp Exchange:</strong> Experts and students are strictly prohibited from sharing personal phone numbers, WhatsApp numbers, or personal email addresses.</li>
                      <li><strong>No Off-Platform Booking Solicitations:</strong> Booking or accepting guest lectures, tutoring, or mentoring sessions off-platform to bypass Lecturely escrow or platform fees will result in instant account termination.</li>
                      <li><strong>Exclusive Communication Channel:</strong> All session arrangements, inquiries, and meeting links must occur solely via Lecturely automated systems and Google Meet links.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: REFUND & CANCELLATION RULES */}
            {activeTab === 'refunds' && (
              <div className="space-y-6">
                <div className="border-b border-[#0a2540] pb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-black font-display text-white flex items-center gap-2.5">
                    <RefreshCw className="w-6 h-6 text-[#ffebbf]" /> Refund & Availability Policy
                  </h2>
                  <span className="text-xs text-amber-300 font-mono font-bold bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
                    Expert Availability Standard
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-[#010101] border-2 border-emerald-500/50 rounded-2xl space-y-2">
                    <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" /> Expert Unavailability Rule (100% Refund Guarantee)
                    </h3>
                    <p className="text-xs text-slate-300">
                      If and <strong>ONLY IF the Expert/Tutor is unavailable</strong>, cancels the appointment, or fails to attend the scheduled session, the Student receives a <strong>100% FULL REFUND</strong> immediately or a free replacement booking slot.
                    </p>
                  </div>

                  <div className="p-4 bg-[#010101] border-2 border-amber-500/50 rounded-2xl space-y-2">
                    <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-400" /> Student Unavailability / Cancellation Rule (10-20% Handling Deduction)
                    </h3>
                    <p className="text-xs text-slate-300">
                      If the <strong>Student is unavailable</strong>, cancels the booked session, or fails to join, a cancellation handling fee of <strong>10% to 20%</strong> (depending on notice time) is deducted to cover platform processing and expert calendar reservation. The remaining <strong>80% to 90%</strong> is refunded to the student's payment source.
                    </p>
                  </div>

                  <div className="overflow-x-auto border border-[#0a2540] rounded-2xl bg-[#010101]">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-[#090e18] text-[#ffebbf] uppercase font-bold border-b border-[#0a2540]">
                        <tr>
                          <th className="p-3">Scenario</th>
                          <th className="p-3">Refund Amount</th>
                          <th className="p-3">Deduction / Penalty</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#0a2540] text-slate-300">
                        <tr>
                          <td className="p-3 font-bold text-emerald-400">Expert / Tutor Unavailable or Absent</td>
                          <td className="p-3 text-emerald-400 font-bold">100% Full Refund</td>
                          <td className="p-3">0% Deduction (Full Student Protection)</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-white">Student Cancels &gt; 24 Hours Notice</td>
                          <td className="p-3 text-emerald-300 font-bold">90% Refund</td>
                          <td className="p-3 text-amber-300">10% Platform Handling Fee Deducted</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-white">Student Cancels &lt; 24 Hours Notice</td>
                          <td className="p-3 text-amber-300 font-bold">80% Refund</td>
                          <td className="p-3 text-amber-400">20% Processing & Calendar Lock Fee Deducted</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-bold text-white">Student Absent / No-Show Without Notice</td>
                          <td className="p-3 text-amber-400 font-bold">80% Refund</td>
                          <td className="p-3 text-rose-300">20% Processing Fee Deducted</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PERSONAL PRIVACY & BOUNDARIES */}
            {activeTab === 'privacy_boundaries' && (
              <div className="space-y-6">
                <div className="border-b border-[#0a2540] pb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-black font-display text-white flex items-center gap-2.5">
                    <UserX className="w-6 h-6 text-amber-400" /> Expert Personal Privacy & Boundary Policy
                  </h2>
                  <span className="text-xs text-[#ffebbf] bg-[#0a2540] px-3 py-1 rounded-full border border-[#b58153]/40 font-mono font-bold">
                    Professional Respect
                  </span>
                </div>

                <div className="space-y-4 text-sm text-slate-300">
                  <div className="p-4 bg-[#010101] border-2 border-[#b58153]/60 rounded-2xl space-y-2">
                    <h3 className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-amber-300" /> Prohibition Against Inquiring Into Expert's Personal Life
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Students and institutions are strictly prohibited from asking experts about their personal life, marital status, family details, private residential location, political/religious beliefs, personal finances, or private relationships.
                    </p>
                  </div>

                  <ul className="list-disc pl-5 space-y-2 text-xs text-slate-300">
                    <li><strong>100% Academic Focus:</strong> Sessions are strictly reserved for academic lectures, professional mentorship, research advisement, and career guidance.</li>
                    <li><strong>Respectful Interaction:</strong> Any inappropriate personal questions or intrusive inquiries will lead to immediate session termination without refund and account flag.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB: TERMS & CONDITIONS */}
            {activeTab === 'terms' && (
              <div className="space-y-6">
                <div className="border-b border-[#0a2540] pb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-black font-display text-white flex items-center gap-2.5">
                    <FileText className="w-6 h-6 text-[#ffebbf]" /> Terms of Service & Platform Rules
                  </h2>
                  <span className="text-xs text-slate-400 font-mono">Last Updated: September 2026</span>
                </div>

                <div className="space-y-4 text-sm text-slate-300">
                  <p>
                    Welcome to <strong>Lecturely India</strong> ("Platform"). By registering as a Student, Tutor, Mentor, Guest Speaker, or Institution Admin, you agree to comply with and be bound by the following Terms & Conditions.
                  </p>

                  <div className="p-4 bg-[#010101] border border-[#0a2540] rounded-2xl space-y-2">
                    <h3 className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" /> 1. Marketplace Model & Escrow Protection
                    </h3>
                    <p className="text-xs text-slate-300">
                      Lecturely operates as an online marketplace connecting educational seekers with verified independent experts. Session payments are held in administrative escrow until the guest lecture or session is confirmed completed.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">2. Account Eligibility & Registration</h3>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
                      <li>Users must provide accurate, verifiable identity details during signup.</li>
                      <li>Students under 18 years of age require parental or guardian authorization to book paid sessions.</li>
                      <li>Professors and Tutors must maintain valid credentials and LinkedIn profile verification.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PRIVACY POLICY */}
            {activeTab === 'privacy' && (
              <div className="space-y-6">
                <div className="border-b border-[#0a2540] pb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-black font-display text-white flex items-center gap-2.5">
                    <Lock className="w-6 h-6 text-[#ffebbf]" /> Privacy Policy & DPDP Act 2023 Compliance
                  </h2>
                  <span className="text-xs text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40 font-mono font-bold">
                    Data Protection Standard
                  </span>
                </div>

                <div className="space-y-4 text-sm text-slate-300">
                  <p>
                    Lecturely respects your privacy and adheres to India's <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 bg-[#010101] border border-[#0a2540] rounded-2xl space-y-1.5">
                      <span className="text-xs font-bold text-[#ffebbf] uppercase block">Student Data Collected</span>
                      <p className="text-xs text-slate-300">
                        Full Name, College/Institution, Course, Branch, Email Address, Phone Number, Booking History, and UPI Transaction Receipts.
                      </p>
                    </div>

                    <div className="p-4 bg-[#010101] border border-[#0a2540] rounded-2xl space-y-1.5">
                      <span className="text-xs font-bold text-[#ffebbf] uppercase block">Expert Data Collected</span>
                      <p className="text-xs text-slate-300">
                        Academic Qualifications, Organization, Designation, LinkedIn URL, Experience Years, Session Pricing, and Admin Payment Verification Credentials.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: EXPERT & SPEAKER POLICY */}
            {activeTab === 'experts' && (
              <div className="space-y-6">
                <div className="border-b border-[#0a2540] pb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-black font-display text-white flex items-center gap-2.5">
                    <Award className="w-6 h-6 text-[#ffebbf]" /> Tutor, Mentor & Guest Speaker Agreement
                  </h2>
                  <span className="text-xs text-slate-400 font-mono">Expert Verification Standards</span>
                </div>

                <div className="space-y-4 text-sm text-slate-300">
                  <div className="p-4 bg-[#010101] border border-[#0a2540] rounded-2xl space-y-2">
                    <h3 className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider">Verification Requirements</h3>
                    <p className="text-xs text-slate-300">
                      All guest speakers and tutors must undergo verification by Lecturely Admin, providing authentic organizational credentials, academic degrees, and LinkedIn profiles before being marked as <strong>VERIFIED SPEAKER ✓</strong>.
                    </p>
                  </div>

                  <ul className="list-disc pl-5 space-y-2 text-xs text-slate-300">
                    <li><strong>Revenue Non-Disclosure:</strong> Experts agree to keep session earnings confidential and not disclose payout details to third parties.</li>
                    <li><strong>Direct Contact Restriction:</strong> Experts must not share personal numbers or attempt direct off-platform payments.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB: STUDENT & CODE OF CONDUCT */}
            {activeTab === 'students' && (
              <div className="space-y-6">
                <div className="border-b border-[#0a2540] pb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-black font-display text-white flex items-center gap-2.5">
                    <Users className="w-6 h-6 text-[#ffebbf]" /> Student Code of Conduct & Boundaries
                  </h2>
                  <span className="text-xs text-slate-400 font-mono">Zero Tolerance Policy</span>
                </div>

                <div className="space-y-4 text-sm text-slate-300">
                  <div className="p-4 bg-[#010101] border-2 border-rose-500/40 rounded-2xl space-y-2">
                    <h3 className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-400" /> Community Code of Conduct
                    </h3>
                    <p className="text-xs text-slate-300">
                      Lecturely maintains strict zero tolerance for harassment, asking about an expert's personal life, hate speech, abusive language, inappropriate behavior, or unauthorized recording during sessions.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: ACADEMIC INTEGRITY */}
            {activeTab === 'academic' && (
              <div className="space-y-6">
                <div className="border-b border-[#0a2540] pb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-black font-display text-white flex items-center gap-2.5">
                    <BookOpen className="w-6 h-6 text-[#ffebbf]" /> Academic Integrity Policy
                  </h2>
                  <span className="text-xs text-[#ffebbf] bg-[#0a2540] px-3 py-1 rounded-full border border-[#b58153]/40 font-mono font-bold">
                    Educational Excellence
                  </span>
                </div>

                <div className="space-y-4 text-sm text-slate-300">
                  <p>
                    Lecturely is dedicated to true learning, mentorship, and keynotes. Tutors and mentors teach concept mastery and guide student understanding.
                  </p>

                  <div className="p-4 bg-[#010101] border border-amber-500/40 rounded-2xl space-y-2">
                    <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Strict Academic Restrictions</h3>
                    <ul className="list-disc pl-5 space-y-1 text-xs text-slate-300">
                      <li><strong>No Homework/Exam Writing:</strong> Tutors are prohibited from solving live exams or completing assignments on behalf of students.</li>
                      <li><strong>No Plagiarism Services:</strong> Tutors will not author research papers or dissertations for student submission.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: PAYMENTS & PLATFORM FEE */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="border-b border-[#0a2540] pb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-black font-display text-white flex items-center gap-2.5">
                    <CreditCard className="w-6 h-6 text-[#ffebbf]" /> Payment Policy & 10% Platform Fee
                  </h2>
                  <span className="text-xs text-amber-300 font-mono font-bold bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/40">
                    Transparent Pricing (Model A)
                  </span>
                </div>

                <div className="space-y-4 text-sm text-slate-300">
                  <div className="p-4 bg-[#010101] border border-[#0a2540] rounded-2xl space-y-2 text-center font-mono">
                    <div className="text-xs text-[#ffebbf] font-bold uppercase tracking-wider">Pricing Calculation</div>
                    <div className="text-sm text-white font-bold">
                      Total Payable = Base Speaker Fee + 10% Platform Commission
                    </div>
                  </div>

                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-300">
                    <li><strong>Escrow Holding:</strong> Session payments are held safely until the lecture/session is completed.</li>
                    <li><strong>Refund Terms:</strong> 100% refund if expert is unavailable; 10-20% handling fee deducted if student is unavailable.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB: DISPUTE & GRIEVANCE */}
            {activeTab === 'grievance' && (
              <div className="space-y-6">
                <div className="border-b border-[#0a2540] pb-4 flex items-center justify-between">
                  <h2 className="text-2xl font-black font-display text-white flex items-center gap-2.5">
                    <Scale className="w-6 h-6 text-[#ffebbf]" /> Dispute Resolution & Grievance Mechanism
                  </h2>
                  <span className="text-xs text-emerald-400 font-mono font-bold bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40">
                    Statutory Grievance Cell
                  </span>
                </div>

                <div className="space-y-4 text-sm text-slate-300">
                  <div className="p-4 bg-[#090e18] border-2 border-[#b58153]/50 rounded-2xl space-y-2">
                    <h3 className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-[#ffebbf]" /> India Grievance Redressal Contact
                    </h3>
                    <div className="text-xs font-mono bg-[#010101] p-3 rounded-xl border border-[#0a2540] text-amber-300">
                      <strong>Grievance Officer:</strong> Lecturely Trust & Compliance Cell<br />
                      <strong>Email:</strong> grievance@lecturely.in | legal@lecturely.in<br />
                      <strong>Response SLA:</strong> Acknowledgment within 24 hrs, resolution within 48-72 hrs.
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliciesPage;

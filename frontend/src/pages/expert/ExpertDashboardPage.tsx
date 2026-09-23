import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { bookingService } from '../../services/bookingService';
import { useAuthStore } from '../../store/authStore';
import { formatCurrency } from '../../utils';
import { Calendar, DollarSign, Clock, ArrowRight, ShieldCheck, Sparkles, Award, Gift, Percent } from 'lucide-react';

export const ExpertDashboardPage: React.FC = () => {
  const user = useAuthStore((s) => s.user);

  const { data: bookingsData } = useQuery({
    queryKey: ['expert-bookings'],
    queryFn: bookingService.getAll,
    refetchInterval: 3000,
  });

  const bookings = bookingsData?.data || [];
  const pendingRequests = bookings.filter((b: any) => b.status === 'PENDING');
  const completedSessions = bookings.filter((b: any) => b.status === 'COMPLETED');
  const totalEarned = completedSessions.reduce((sum: number, b: any) => sum + (b.expertEarnings || 0), 0);

  const completedCount = completedSessions.length;
  const is30LecturesUnlocked = completedCount >= 30;
  const lecturesNeeded = Math.max(0, 30 - completedCount);
  const progressPercent = Math.min(100, Math.round((completedCount / 30) * 100));

  return (
    <div className="space-y-8 text-white">
      {/* Welcome Banner */}
      <div className="glass-card-premium p-6 sm:p-8 border border-[#0a2540] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#090e18]">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white">Welcome back, {user?.fullName || 'Expert'}! 👋</h1>
            <span className="bg-[#0a2540] text-[#ffebbf] border border-[#b58153]/40 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ffebbf]" /> VERIFIED SPEAKER
            </span>
          </div>
          <p className="text-[#ffebbf] text-sm mt-1 font-medium">Manage session requests, calendar availability, and earnings.</p>
        </div>

        <Link
          to="/expert/requests"
          className="btn-primary text-xs px-5 py-3 shadow-ns-gold flex items-center gap-2 font-black uppercase tracking-wider"
        >
          View Pending Requests ({pendingRequests.length})
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-6 border border-[#0a2540] flex items-center gap-4 bg-[#090e18]">
          <div className="p-3 bg-[#0a2540] text-[#ffebbf] rounded-xl border border-[#b58153]/40">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-black text-white">{bookings.length}</div>
            <div className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider mt-0.5">Total Bookings</div>
          </div>
        </div>

        <div className="glass-card p-6 border border-[#0a2540] flex items-center gap-4 bg-[#090e18]">
          <div className="p-3 bg-[#0a2540] text-[#ffebbf] rounded-xl border border-[#b58153]/40">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-black text-white">{pendingRequests.length}</div>
            <div className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider mt-0.5">Pending Requests</div>
          </div>
        </div>

        <div className="glass-card p-6 border border-[#0a2540] flex items-center gap-4 bg-[#090e18]">
          <div className="p-3 bg-[#0a2540] text-[#ffebbf] rounded-xl border border-[#b58153]/40">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-black text-[#ffebbf]">{formatCurrency(totalEarned)}</div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-0.5">Net Earnings</div>
          </div>
        </div>
      </div>

      {/* Teacher Incentive & Commission Cutting Offers Banner */}
      <div className="glass-card-premium p-6 sm:p-8 border border-[#b58153]/50 bg-gradient-to-r from-[#090e18] via-[#0a2540] to-[#090e18] rounded-3xl relative overflow-hidden space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#0a2540] pb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffebbf]/10 border border-[#ffebbf]/30 rounded-full text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#ffebbf]" /> Teacher Incentive & Commission Cutting Program
            </div>
            <h2 className="text-xl sm:text-2xl font-black font-display text-white">Your Educator Platform Fee Discounts</h2>
          </div>
          <div className="bg-[#010101] border border-[#b58153]/40 px-4 py-2 rounded-2xl text-right">
            <span className="text-[10px] text-slate-400 font-bold uppercase block">Active Base Commission</span>
            <span className="text-2xl font-black text-[#ffebbf]">
              {is30LecturesUnlocked ? '7%' : '10%'}
            </span>
            <span className="text-[10px] text-emerald-400 font-bold block">
              {is30LecturesUnlocked ? 'You Keep 93% Payout!' : 'Keep 90% Base Payout'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Offer 1: 30+ Lectures Milestone Offer */}
          <div className="p-5 bg-[#010101]/90 rounded-2xl border border-[#0a2540] hover:border-[#b58153]/40 transition space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">30+ Completed Lectures Offer</h3>
                  <span className="text-xs text-amber-300 font-semibold">3% Platform Fee Cutting (Only 7% Fee!)</span>
                </div>
              </div>
              {is30LecturesUnlocked ? (
                <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                  ✓ UNLOCKED (3% OFF)
                </span>
              ) : (
                <span className="bg-[#0a2540] text-[#ffebbf] border border-[#b58153]/40 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase">
                  {lecturesNeeded} More Lectures Needed
                </span>
              )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Completed Sessions: <strong className="text-white">{completedCount} / 30</strong></span>
                <span className="text-[#ffebbf] font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full bg-[#0a2540] h-2.5 rounded-full overflow-hidden border border-[#b58153]/30">
                <div
                  className="bg-gradient-to-r from-[#b58153] to-[#ffebbf] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Complete 30 or more lectures on Lecturely to permanently slash your platform commission by <strong className="text-[#ffebbf]">3%</strong> (Pay only 7% fee instead of 10%!).
            </p>
          </div>

          {/* Offer 2: Trial Lecture Incentive */}
          <div className="p-5 bg-[#010101]/90 rounded-2xl border border-[#0a2540] hover:border-[#b58153]/40 transition space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
                  <Gift className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Trial Lecture Incentive</h3>
                  <span className="text-xs text-emerald-400 font-semibold">2% Platform Fee Cutting on Trial Sessions</span>
                </div>
              </div>
              <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-full uppercase">
                ACTIVE (2% OFF)
              </span>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
              Offer introductory trial lectures to students. When a trial lecture is scheduled and completed, get an extra <strong className="text-emerald-300">2% commission cutting</strong> from the platform fee!
            </p>
            <div className="pt-2 flex items-center justify-between border-t border-[#0a2540] text-xs">
              <span className="text-slate-400">Combined Max Take-Home:</span>
              <span className="font-black text-[#ffebbf] text-sm">Up to 95% Payout!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Requests List */}
      <div className="glass-card p-6 sm:p-8 border border-[#0a2540] bg-[#090e18]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold font-display text-white">Session Requests Needing Action</h2>
          <Link to="/expert/requests" className="text-xs font-bold text-[#ffebbf] hover:underline flex items-center gap-1">
            View All Requests <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="text-center py-8 text-slate-300 text-sm">
            No pending session requests at the moment. Keep your profile updated!
          </div>
        ) : (
          <div className="space-y-3">
            {pendingRequests.slice(0, 3).map((req: any) => (
              <div key={req.id} className="p-4 bg-[#010101] rounded-xl border border-[#0a2540] flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                <div>
                  <h3 className="font-bold text-white text-base">{req.student?.fullName || 'Student Group'}</h3>
                  <p className="text-xs text-slate-300 mt-0.5">{req.student?.institution} • {req.student?.city}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-black text-[#ffebbf] text-base">{formatCurrency(req.sessionFee)}</span>
                  <Link to="/expert/requests" className="btn-primary text-xs px-4 py-2 font-black uppercase tracking-wider">
                    Respond
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


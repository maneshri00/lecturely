import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { bookingService } from '../../services/bookingService';
import { useAuthStore } from '../../store/authStore';
import { formatCurrency } from '../../utils';
import { Calendar, DollarSign, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

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

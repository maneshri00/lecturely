import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminService } from '../../services/adminService';
import { Users, ShieldAlert, Award, FileText, CheckCircle2 } from 'lucide-react';
import { formatCurrency, formatDate } from '../../utils';

export const AdminDashboardPage: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: () => adminService.getStats(),
  });

  const { data: pendingExpertsData } = useQuery({
    queryKey: ['admin-pending-experts'],
    queryFn: () => adminService.getPendingExperts(),
  });

  const { data: recentBookingsData } = useQuery({
    queryKey: ['admin-recent-bookings'],
    queryFn: () => adminService.getRecentBookings(),
  });

  const stats = (data as any)?.data || { totalUsers: 0, totalExperts: 0, verifiedExperts: 0, totalBookings: 0, totalVolume: 0 };
  const rawPending = (pendingExpertsData as any)?.data;
  const pendingExperts = Array.isArray(rawPending) ? rawPending : (rawPending?.content || []);
  const rawRecent = (recentBookingsData as any)?.data;
  const recentBookings = Array.isArray(rawRecent) ? rawRecent : (rawRecent?.content || []);

  return (
    <div className="space-y-8 text-white">
      <div>
        <h1 className="text-3xl font-black font-display text-white">Platform Governance Dashboard</h1>
        <p className="text-[#ffebbf] text-sm mt-1 font-medium">Verify expert credentials, audit escrow payments, and oversee sessions across India.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 border border-[#0a2540] bg-[#090e18] flex items-center gap-4">
          <div className="p-3 bg-[#0a2540] text-[#ffebbf] rounded-xl border border-[#b58153]/40">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-black text-white">{stats.totalUsers}</div>
            <div className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider mt-0.5">Total Users</div>
          </div>
        </div>

        <div className="glass-card p-6 border border-[#0a2540] bg-[#090e18] flex items-center gap-4">
          <div className="p-3 bg-[#0a2540] text-[#ffebbf] rounded-xl border border-[#b58153]/40">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-black text-white">{stats.verifiedExperts} / {stats.totalExperts}</div>
            <div className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider mt-0.5">Verified Speakers</div>
          </div>
        </div>

        <div className="glass-card p-6 border border-[#0a2540] bg-[#090e18] flex items-center gap-4">
          <div className="p-3 bg-[#0a2540] text-[#ffebbf] rounded-xl border border-[#b58153]/40">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-black text-white">{stats.totalBookings}</div>
            <div className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider mt-0.5">Total Sessions</div>
          </div>
        </div>

        <div className="glass-card p-6 border border-[#0a2540] bg-[#090e18] flex items-center gap-4">
          <div className="p-3 bg-[#0a2540] text-[#ffebbf] rounded-xl border border-[#b58153]/40">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-3xl font-black text-[#ffebbf]">{formatCurrency(stats.totalVolume)}</div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-0.5">Escrow Volume</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Verifications */}
        <div className="glass-card p-6 border border-[#0a2540] bg-[#090e18] space-y-4">
          <h2 className="text-xl font-bold font-display text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[#ffebbf]" /> Pending Speaker Verifications
          </h2>

          {pendingExperts.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">All expert applications processed.</div>
          ) : (
            <div className="space-y-3">
              {pendingExperts.slice(0, 5).map((exp: any) => (
                <div key={exp.id} className="p-4 bg-[#010101] rounded-xl border border-[#0a2540] flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm">{exp.fullName}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{exp.designation} @ {exp.organization}</p>
                  </div>
                  <button className="btn-primary text-xs px-4 py-2 font-black uppercase shadow-ns-gold">
                    Verify
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Session Requests */}
        <div className="glass-card p-6 border border-[#0a2540] bg-[#090e18] space-y-4">
          <h2 className="text-xl font-bold font-display text-white">Recent Platform Bookings</h2>

          {recentBookings.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-sm">No recent bookings.</div>
          ) : (
            <div className="space-y-3">
              {recentBookings.slice(0, 5).map((b: any) => (
                <div key={b.id} className="p-4 bg-[#010101] rounded-xl border border-[#0a2540] flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-white block">{b.expert?.fullName || 'Speaker'}</span>
                    <span className="text-slate-400">{formatDate(b.createdAt)}</span>
                  </div>
                  <span className="font-black text-[#ffebbf] text-sm">{formatCurrency(b.sessionFee)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

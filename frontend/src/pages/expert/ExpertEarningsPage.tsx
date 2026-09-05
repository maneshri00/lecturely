import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { bookingService } from '../../services/bookingService';
import { formatCurrency, formatDate } from '../../utils';
import { DollarSign, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';

export const ExpertEarningsPage: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['expert-bookings'],
    queryFn: bookingService.getAll,
  });

  const bookings = (data?.data || []).filter((b: any) => ['CONFIRMED', 'COMPLETED'].includes(b.status));

  const totalEarnings = bookings.reduce((sum: number, b: any) => sum + (b.expertEarnings || b.sessionFee * 0.9 || 0), 0);

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-display text-white">Earnings & Escrow Payouts</h1>
          <p className="text-[#ffebbf] text-sm mt-1 font-medium">Net payout statements post 10% platform commission deduction.</p>
        </div>

        <div className="px-5 py-3 glass-card border border-[#0a2540] bg-[#090e18]">
          <span className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider block">Net Take-Home</span>
          <span className="text-2xl font-black text-white">{formatCurrency(totalEarnings)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-6 border border-[#0a2540] bg-[#090e18] flex items-center gap-4">
          <div className="p-3 bg-[#0a2540] text-[#ffebbf] rounded-xl border border-[#b58153]/40">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-[#ffebbf]">{formatCurrency(totalEarnings)}</div>
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mt-0.5">Cleared Escrow</div>
          </div>
        </div>

        <div className="glass-card p-6 border border-[#0a2540] bg-[#090e18] flex items-center gap-4">
          <div className="p-3 bg-[#0a2540] text-[#ffebbf] rounded-xl border border-[#b58153]/40">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{bookings.length}</div>
            <div className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider mt-0.5">Paid Sessions</div>
          </div>
        </div>

        <div className="glass-card p-6 border border-[#0a2540] bg-[#090e18] flex items-center gap-4">
          <div className="p-3 bg-[#0a2540] text-[#ffebbf] rounded-xl border border-[#b58153]/40">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">10%</div>
            <div className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider mt-0.5">Platform Commission</div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="h-48 bg-[#090e18] border border-[#0a2540] rounded-2xl animate-pulse" />
      ) : bookings.length === 0 ? (
        <div className="text-center py-16 glass-card-premium p-8 border border-[#0a2540]">
          <DollarSign className="w-12 h-12 text-[#ffebbf] mx-auto mb-3" />
          <h3 className="text-lg font-bold font-display text-white">No payouts recorded yet</h3>
          <p className="text-slate-400 text-sm mt-1">Earnings will be credited automatically post session completion.</p>
        </div>
      ) : (
        <div className="glass-card border border-[#0a2540] bg-[#090e18] overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#010101] border-b border-[#0a2540] text-xs font-bold text-[#ffebbf] uppercase tracking-wider">
                <th className="p-4">Session ID</th>
                <th className="p-4">Gross Fee</th>
                <th className="p-4">Commission (10%)</th>
                <th className="p-4">Your Payout</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0a2540]">
              {bookings.map((b: any) => (
                <tr key={b.id} className="hover:bg-[#010101]/60 transition">
                  <td className="p-4 font-mono font-bold text-[#ffebbf]">#{b.id}</td>
                  <td className="p-4 text-white font-bold">{formatCurrency(b.sessionFee)}</td>
                  <td className="p-4 text-slate-400 font-medium">-{formatCurrency(b.sessionFee * 0.10)}</td>
                  <td className="p-4 font-black text-[#ffebbf]">{formatCurrency(b.expertEarnings || b.sessionFee * 0.90)}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 bg-[#0a2540] text-[#ffebbf] border border-[#b58153]/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5" /> CLEARED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

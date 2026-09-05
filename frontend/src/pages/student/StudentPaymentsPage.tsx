import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { bookingService } from '../../services/bookingService';
import { formatCurrency, formatDate } from '../../utils';
import { CreditCard, CheckCircle2 } from 'lucide-react';

export const StudentPaymentsPage: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['student-bookings'],
    queryFn: bookingService.getAll,
  });

  const bookings = (data?.data || []).filter((b: any) => ['CONFIRMED', 'COMPLETED'].includes(b.status));

  const totalSpent = bookings.reduce((sum: number, b: any) => sum + (b.sessionFee || 0), 0);

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-display text-white">Payment Transactions</h1>
          <p className="text-[#ffebbf] text-sm mt-1 font-medium">Payment receipts and booking transaction history.</p>
        </div>

        <div className="px-5 py-3 glass-card border border-[#0a2540] bg-[#090e18]">
          <span className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider block">Total Spent</span>
          <span className="text-2xl font-black text-white">{formatCurrency(totalSpent)}</span>
        </div>
      </div>

      {isLoading ? (
        <div className="h-48 bg-[#090e18] border border-[#0a2540] rounded-2xl animate-pulse" />
      ) : bookings.length === 0 ? (
        <div className="text-center py-16 glass-card-premium p-8 border border-[#0a2540]">
          <CreditCard className="w-12 h-12 text-[#ffebbf] mx-auto mb-3" />
          <h3 className="text-lg font-bold font-display text-white">No payment records yet</h3>
          <p className="text-slate-400 text-sm mt-1">Completed payment receipts will appear here.</p>
        </div>
      ) : (
        <div className="glass-card border border-[#0a2540] bg-[#090e18] overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#010101] border-b border-[#0a2540] text-xs font-bold text-[#ffebbf] uppercase tracking-wider">
                <th className="p-4">Booking ID</th>
                <th className="p-4">Speaker</th>
                <th className="p-4">Amount Paid</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0a2540]">
              {bookings.map((b: any) => (
                <tr key={b.id} className="hover:bg-[#010101]/60 transition">
                  <td className="p-4 font-mono font-bold text-[#ffebbf]">#{b.id}</td>
                  <td className="p-4 font-bold text-white">{b.expert?.fullName || 'Speaker'}</td>
                  <td className="p-4 font-black text-[#ffebbf]">{formatCurrency(b.sessionFee)}</td>
                  <td className="p-4 text-slate-400 font-mono text-xs">{formatDate(b.createdAt)}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 bg-[#0a2540] text-[#ffebbf] border border-[#b58153]/40 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ffebbf]" /> PAID
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

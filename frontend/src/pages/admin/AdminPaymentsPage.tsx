import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { adminService } from '../../services/adminService';
import { formatCurrency, formatDateTime } from '../../utils';
import { CreditCard, ShieldCheck, CheckCircle2, RotateCcw, Lock, QrCode, ExternalLink, X, Eye, ThumbsUp, ThumbsDown, Clock } from 'lucide-react';

export const AdminPaymentsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<'VERIFICATIONS' | 'ALL'>('VERIFICATIONS');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [rejectionModalId, setRejectionModalId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const { data: verificationsData, isLoading: verificationsLoading } = useQuery({
    queryKey: ['admin-pending-verifications'],
    queryFn: () => adminService.getPendingPaymentVerifications(),
    refetchInterval: 3000,
  });

  const { data: paymentsData, isLoading: paymentsLoading } = useQuery({
    queryKey: ['admin-payments'],
    queryFn: () => adminService.getPayments(0, 50),
  });

  const verifyMutation = useMutation({
    mutationFn: (paymentId: number) => adminService.verifyPayment(paymentId),
    onSuccess: () => {
      toast.success('Payment verified & booking confirmed! 🎉');
      queryClient.invalidateQueries({ queryKey: ['admin-pending-verifications'] });
      queryClient.invalidateQueries({ queryKey: ['admin-payments'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to verify payment.');
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ paymentId, reason }: { paymentId: number; reason?: string }) =>
      adminService.rejectPayment(paymentId, reason),
    onSuccess: () => {
      toast.success('Payment verification rejected');
      setRejectionModalId(null);
      setRejectionReason('');
      queryClient.invalidateQueries({ queryKey: ['admin-pending-verifications'] });
      queryClient.invalidateQueries({ queryKey: ['admin-payments'] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to reject payment.');
    },
  });

  const overridePaymentMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) => adminService.overridePaymentStatus(id, status),
    onSuccess: (_, variables) => {
      toast.success(`Payment escrow status updated to ${variables.status}! 💸`);
      queryClient.invalidateQueries({ queryKey: ['admin-payments'] });
    },
    onError: () => {
      toast.error('Failed to update payment status.');
    },
  });

  const pendingVerifications = (verificationsData as any)?.data || [];
  const rawPayments = (paymentsData as any)?.data?.content || (paymentsData as any)?.data || [];
  const payments = Array.isArray(rawPayments) ? rawPayments : [];

  return (
    <div className="space-y-6 text-white max-w-7xl mx-auto px-2 sm:px-4">
      {/* Header */}
      <div className="glass-card-premium p-6 border border-[#0a2540] bg-[#090e18] rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white">Payment & Verification Control</h1>
            <span className="text-xs bg-[#0a2540] text-[#ffebbf] px-3 py-1 rounded-full border border-[#b58153]/40 font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ffebbf]" /> Admin Escrow Portal
            </span>
          </div>
          <p className="text-[#ffebbf] text-xs sm:text-sm mt-1.5 font-medium">
            Verify manual QR payment screenshots, audit transaction IDs (UTRs), release escrow payouts, or issue refunds.
          </p>
        </div>

        {/* Tab Selection Switcher */}
        <div className="flex bg-[#010101] p-1 rounded-xl border border-[#0a2540] shrink-0">
          <button
            onClick={() => setActiveTab('VERIFICATIONS')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 uppercase tracking-wider ${
              activeTab === 'VERIFICATIONS'
                ? 'bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] shadow-ns-gold font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <QrCode className="w-4 h-4" /> Pending QR Proofs ({pendingVerifications.length})
          </button>

          <button
            onClick={() => setActiveTab('ALL')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 uppercase tracking-wider ${
              activeTab === 'ALL'
                ? 'bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] shadow-ns-gold font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" /> All Transactions ({payments.length})
          </button>
        </div>
      </div>

      {/* TAB 1: Manual QR Verifications */}
      {activeTab === 'VERIFICATIONS' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-display text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" /> Pending Payment Verifications
            </h2>
            <span className="text-xs text-slate-400">Auto-refreshes every 3s</span>
          </div>

          {verificationsLoading ? (
            <div className="space-y-3">
              {[1, 2].map((n) => (
                <div key={n} className="h-32 bg-[#090e18] border border-[#0a2540] rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : pendingVerifications.length === 0 ? (
            <div className="glass-card p-12 text-center border border-[#0a2540] rounded-2xl text-slate-400 bg-[#090e18] space-y-2">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">All QR payments verified!</h3>
              <p className="text-xs text-slate-400">There are no pending manual payment verifications at this time.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pendingVerifications.map((item: any) => (
                <div key={item.paymentId || item.bookingId} className="glass-card p-5 border-2 border-[#b58153]/40 bg-[#090e18] rounded-2xl space-y-4 shadow-xl">
                  <div className="flex items-start justify-between border-b border-[#0a2540] pb-3">
                    <div>
                      <span className="text-[10px] bg-[#0a2540] text-[#ffebbf] px-2.5 py-0.5 rounded-full font-bold border border-[#b58153]/40 uppercase tracking-wider">
                        Booking #{item.bookingId}
                      </span>
                      <h3 className="text-base font-bold text-white mt-1">{item.studentName}</h3>
                      <p className="text-xs text-slate-400">{item.studentEmail}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-slate-400 block font-semibold">Amount Paid</span>
                      <div className="text-2xl font-black text-[#ffebbf]">{formatCurrency(item.amount)}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-[#010101] rounded-xl border border-[#0a2540]">
                      <span className="text-[10px] text-[#ffebbf] font-bold uppercase tracking-wider block">Submitted UTR / Txn ID</span>
                      <span className="font-mono font-bold text-sky-400 text-sm block mt-0.5 select-all">{item.transactionId || 'NOT_PROVIDED'}</span>
                    </div>

                    <div className="p-3 bg-[#010101] rounded-xl border border-[#0a2540]">
                      <span className="text-[10px] text-[#ffebbf] font-bold uppercase tracking-wider block">Speaker / Expert</span>
                      <span className="font-bold text-white text-xs block mt-0.5">{item.expertName}</span>
                    </div>
                  </div>

                  {/* Screenshot Thumbnail */}
                  {item.screenshotUrl ? (
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-bold text-[#ffebbf] uppercase tracking-wider block">Payment Receipt Screenshot</span>
                      <div
                        onClick={() => setSelectedImage(item.screenshotUrl)}
                        className="relative h-36 w-full bg-black border border-[#0a2540] rounded-xl overflow-hidden cursor-pointer group shadow-inner"
                      >
                        <img src={item.screenshotUrl} alt="Receipt Screenshot" className="w-full h-full object-cover group-hover:scale-105 transition" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 text-white font-bold text-xs">
                          <Eye className="w-4 h-4" /> Click to Enlarge Screenshot
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-[#010101] rounded-xl border border-[#0a2540] text-center text-xs text-slate-400 italic">
                      No screenshot uploaded. Verified by UTR only.
                    </div>
                  )}

                  {/* Approve / Reject Action Buttons */}
                  <div className="flex gap-2 pt-2 border-t border-[#0a2540]">
                    <button
                      onClick={() => verifyMutation.mutate(item.bookingId || item.paymentId)}
                      disabled={verifyMutation.isPending}
                      className="btn-primary flex-1 py-2.5 px-3 text-xs font-black uppercase tracking-wider shadow-ns-gold flex items-center justify-center gap-1.5"
                    >
                      <ThumbsUp className="w-4 h-4" /> Verify & Approve
                    </button>

                    <button
                      onClick={() => setRejectionModalId(item.bookingId || item.paymentId)}
                      className="btn-secondary text-xs px-4 py-2.5 text-rose-400 border-rose-500/40 font-bold uppercase flex items-center justify-center gap-1.5"
                    >
                      <ThumbsDown className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: All Escrow & Payout Transactions */}
      {activeTab === 'ALL' && (
        <>
          {paymentsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-24 bg-[#090e18] border border-[#0a2540] rounded-xl animate-pulse" />
              ))}
            </div>
          ) : payments.length === 0 ? (
            <div className="glass-card p-12 text-center border border-[#0a2540] rounded-2xl text-slate-400">
              <CreditCard className="w-12 h-12 text-[#ffebbf] mx-auto mb-3" />
              <h3 className="text-base font-bold text-white">No payment transactions recorded yet</h3>
            </div>
          ) : (
            <div className="glass-card border border-[#0a2540] bg-[#090e18] rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#010101] text-[#ffebbf] uppercase text-[10px] font-bold border-b border-[#0a2540]">
                    <tr>
                      <th className="px-5 py-3.5">Transaction ID / UTR</th>
                      <th className="px-5 py-3.5">Booking Reference</th>
                      <th className="px-5 py-3.5">Total Amount</th>
                      <th className="px-5 py-3.5">Platform Fee (10%)</th>
                      <th className="px-5 py-3.5">Expert Net Payout</th>
                      <th className="px-5 py-3.5">Escrow Status</th>
                      <th className="px-5 py-3.5 text-right">Master Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#0a2540]/60">
                    {payments.map((p: any) => (
                      <tr key={p.id} className="hover:bg-[#010101]/60 transition">
                        <td className="px-5 py-4 font-mono font-bold text-white">
                          {p.transactionId || `TXN-${p.id}`}
                        </td>
                        <td className="px-5 py-4 text-slate-300 font-medium">
                          Booking #{p.bookingId || p.id}
                        </td>
                        <td className="px-5 py-4 font-black text-[#ffebbf] text-sm">
                          {formatCurrency(p.amount || 5000)}
                        </td>
                        <td className="px-5 py-4 font-bold text-teal-400">
                          {formatCurrency(p.platformFee || 500)}
                        </td>
                        <td className="px-5 py-4 font-bold text-emerald-400">
                          {formatCurrency(p.expertEarnings || 4500)}
                        </td>
                        <td className="px-5 py-4">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 w-max">
                            <Lock className="w-3 h-3" /> {p.status || 'HELD_IN_ESCROW'}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => overridePaymentMutation.mutate({ id: p.id, status: 'RELEASED' })}
                              className="btn-primary text-[10px] px-3 py-1.5 font-black uppercase shadow-ns-gold flex items-center gap-1"
                            >
                              <CheckCircle2 className="w-3 h-3" /> Release Payout
                            </button>
                            <button
                              onClick={() => overridePaymentMutation.mutate({ id: p.id, status: 'REFUNDED' })}
                              className="btn-secondary text-[10px] px-3 py-1.5 font-bold uppercase text-rose-400 border-rose-500/40 flex items-center gap-1"
                            >
                              <RotateCcw className="w-3 h-3" /> Issue Refund
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Image Zoom Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh] bg-[#090e18] p-4 rounded-3xl border border-[#0a2540] flex flex-col items-center">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-black/80 text-white p-2 rounded-full hover:bg-rose-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-sm font-bold text-[#ffebbf] mb-3 uppercase tracking-wider">Payment Receipt Screenshot Zoom</h3>
            <div className="w-full flex-1 overflow-auto flex items-center justify-center">
              <img src={selectedImage} alt="Enlarged Receipt" className="max-h-[75vh] object-contain rounded-xl border border-[#b58153]/40" />
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {rejectionModalId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6 border border-[#0a2540] bg-[#090e18] rounded-2xl space-y-4 text-white">
            <h3 className="text-lg font-bold font-display text-white">Reject Payment Verification</h3>
            <p className="text-xs text-slate-300">Please provide a brief reason for rejecting this payment submission:</p>
            <textarea
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Invalid UTR number / Screenshot mismatch / Payment not received in account"
              className="w-full p-3 bg-[#010101] border border-[#0a2540] text-white rounded-xl text-xs focus:outline-none"
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setRejectionModalId(null)}
                className="btn-secondary text-xs px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={() => rejectMutation.mutate({ paymentId: rejectionModalId, reason: rejectionReason })}
                className="btn-secondary text-xs px-4 py-2 bg-rose-600 text-white font-bold uppercase"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPaymentsPage;

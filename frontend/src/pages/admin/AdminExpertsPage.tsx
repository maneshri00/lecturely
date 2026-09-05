import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '../../services/adminService';
import { ShieldCheck, Award, CreditCard, Eye, X, CheckCircle2, QrCode, Building, User, FileText, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

export const AdminExpertsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('ALL');
  const [selectedExpertId, setSelectedExpertId] = useState<number | null>(null);
  const [selectedQrZoom, setSelectedQrZoom] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['admin-experts'],
    queryFn: () => adminService.getAllExperts(),
  });

  const { data: detailData, isLoading: detailLoading } = useQuery({
    queryKey: ['admin-expert-detail', selectedExpertId],
    queryFn: () => adminService.getExpertById(selectedExpertId!),
    enabled: !!selectedExpertId,
  });

  const selectedExpert = detailData?.data;

  const rawExperts = (data as any)?.data;
  const experts = Array.isArray(rawExperts) ? rawExperts : (rawExperts?.content || []);

  const verifyMutation = useMutation({
    mutationFn: (id: number) => adminService.verifyExpert(id),
    onSuccess: () => {
      toast.success('Expert verified successfully!');
      queryClient.invalidateQueries({ queryKey: ['admin-experts'] });
      if (selectedExpertId) {
        queryClient.invalidateQueries({ queryKey: ['admin-expert-detail', selectedExpertId] });
      }
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id: number) => adminService.rejectExpert(id),
    onSuccess: () => {
      toast.success('Expert verification declined');
      queryClient.invalidateQueries({ queryKey: ['admin-experts'] });
      if (selectedExpertId) {
        queryClient.invalidateQueries({ queryKey: ['admin-expert-detail', selectedExpertId] });
      }
    },
  });

  const filtered = filter === 'ALL'
    ? experts
    : filter === 'PENDING'
    ? experts.filter((e: any) => e.verificationStatus === 'PENDING')
    : experts.filter((e: any) => e.verificationStatus === 'VERIFIED');

  return (
    <div className="space-y-6 text-white max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-display text-white">Expert Directory & Payout Control</h1>
          <p className="text-[#ffebbf] text-sm mt-1 font-medium">Verify expert credentials, review confidential bank accounts, and payout QR codes.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex bg-[#010101] p-1.5 rounded-xl border border-[#0a2540] gap-1 w-fit">
        {['ALL', 'PENDING', 'VERIFIED'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
              filter === tab
                ? 'bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] shadow-ns-gold'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-20 bg-[#090e18] border border-[#0a2540] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 glass-card-premium p-8 border border-[#0a2540]">
          <Award className="w-12 h-12 text-[#ffebbf] mx-auto mb-3" />
          <h3 className="text-lg font-bold font-display text-white">No experts found</h3>
          <p className="text-slate-300 text-sm mt-1">No expert accounts match filter "{filter}".</p>
        </div>
      ) : (
        <div className="glass-card border border-[#0a2540] bg-[#090e18] rounded-2xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-[#010101] border-b border-[#0a2540] text-xs font-bold text-[#ffebbf] uppercase tracking-wider">
                <th className="p-4">Expert Name</th>
                <th className="p-4">Organization & Designation</th>
                <th className="p-4">City</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#0a2540]">
              {filtered.map((e: any) => (
                <tr key={e.id} className="hover:bg-[#010101]/60 transition">
                  <td className="p-4 font-bold text-white flex items-center gap-2">
                    {e.profilePhotoUrl ? (
                      <img src={e.profilePhotoUrl} alt={e.fullName} className="w-8 h-8 rounded-full object-cover border border-[#b58153]" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#0a2540] text-[#ffebbf] font-bold flex items-center justify-center text-xs">
                        {e.fullName ? e.fullName.substring(0, 2).toUpperCase() : 'EX'}
                      </div>
                    )}
                    <span>{e.fullName}</span>
                  </td>
                  <td className="p-4 text-slate-300 text-xs">{e.designation} @ {e.organization}</td>
                  <td className="p-4 text-slate-300 text-xs">{e.city}</td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                      e.verificationStatus === 'VERIFIED'
                        ? 'bg-[#0a2540] text-[#ffebbf] border border-[#b58153]'
                        : 'bg-[#010101] text-amber-300 border border-amber-500/40'
                    }`}>
                      {e.verificationStatus}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedExpertId(e.id)}
                      className="btn-secondary text-xs px-3 py-1.5 font-bold uppercase tracking-wider text-[#ffebbf] inline-flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> Payout & Details
                    </button>

                    {e.verificationStatus !== 'VERIFIED' && (
                      <button
                        onClick={() => verifyMutation.mutate(e.id)}
                        className="btn-primary text-xs px-3 py-1.5 font-black uppercase shadow-ns-gold"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Expert Detail & Payout Modal */}
      {selectedExpertId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-card-premium max-w-3xl w-full border border-[#0a2540] bg-[#090e18] rounded-3xl overflow-hidden shadow-2xl space-y-6 text-white max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 bg-[#010101] border-b border-[#0a2540] flex justify-between items-center shrink-0">
              <div>
                <span className="text-[10px] bg-[#0a2540] text-[#ffebbf] px-3 py-1 rounded-full border border-[#b58153]/40 font-bold uppercase tracking-wider">
                  Admin Confidential View
                </span>
                <h2 className="text-xl font-bold font-display text-white mt-1">Expert Profile & Payout Setup</h2>
              </div>
              <button onClick={() => setSelectedExpertId(null)} className="text-slate-400 hover:text-white font-bold text-lg">✕</button>
            </div>

            {/* Modal Content Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1">
              {detailLoading ? (
                <div className="p-8 text-center text-slate-400 animate-pulse">Loading expert details & payout info...</div>
              ) : selectedExpert ? (
                <>
                  {/* Basic Profile Card */}
                  <div className="p-4 bg-[#010101] border border-[#0a2540] rounded-2xl flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ffebbf] to-[#b58153] text-[#010101] font-black text-xl flex items-center justify-center shrink-0 overflow-hidden border-2 border-[#ffebbf]">
                      {selectedExpert.profilePhotoUrl ? (
                        <img src={selectedExpert.profilePhotoUrl} alt={selectedExpert.fullName} className="w-full h-full object-cover" />
                      ) : (
                        selectedExpert.fullName ? selectedExpert.fullName.substring(0, 2).toUpperCase() : 'EX'
                      )}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-bold text-white">{selectedExpert.fullName}</h3>
                      <p className="text-xs text-[#ffebbf] font-semibold">{selectedExpert.designation} at {selectedExpert.organization}</p>
                      <p className="text-xs text-slate-400">{selectedExpert.city}, {selectedExpert.state} • {selectedExpert.education}</p>
                    </div>
                  </div>

                  {/* CONFIDENTIAL BANK & PAYOUT DETAILS CARD */}
                  <div className="p-5 bg-[#010101] border-2 border-[#b58153]/60 rounded-2xl space-y-4 shadow-xl">
                    <div className="flex justify-between items-center border-b border-[#0a2540] pb-3">
                      <h4 className="text-sm font-bold text-[#ffebbf] uppercase tracking-wider flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" /> Confidential Payout Bank Details
                      </h4>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-0.5 rounded-full font-bold uppercase">
                        Admin Access Only
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-[#090e18] rounded-xl border border-[#0a2540]">
                        <span className="text-[10px] text-slate-400 font-semibold block uppercase">Account Holder Name</span>
                        <span className="font-bold text-white text-sm mt-0.5 block">{selectedExpert.accountHolderName || 'NOT_PROVIDED'}</span>
                      </div>

                      <div className="p-3 bg-[#090e18] rounded-xl border border-[#0a2540]">
                        <span className="text-[10px] text-slate-400 font-semibold block uppercase">Bank Name</span>
                        <span className="font-bold text-white text-sm mt-0.5 block">{selectedExpert.bankName || 'NOT_PROVIDED'}</span>
                      </div>

                      <div className="p-3 bg-[#090e18] rounded-xl border border-[#0a2540]">
                        <span className="text-[10px] text-slate-400 font-semibold block uppercase">Account Number</span>
                        <span className="font-mono font-bold text-sky-400 text-sm mt-0.5 block select-all">{selectedExpert.bankAccountNumber || 'NOT_PROVIDED'}</span>
                      </div>

                      <div className="p-3 bg-[#090e18] rounded-xl border border-[#0a2540]">
                        <span className="text-[10px] text-slate-400 font-semibold block uppercase">IFSC Code</span>
                        <span className="font-mono font-bold text-amber-300 text-sm mt-0.5 block select-all">{selectedExpert.bankIfscCode || 'NOT_PROVIDED'}</span>
                      </div>
                    </div>

                    <div className="p-3 bg-[#090e18] rounded-xl border border-[#0a2540] text-xs">
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">UPI ID (VPA)</span>
                      <span className="font-mono font-bold text-[#ffebbf] text-sm mt-0.5 block select-all">{selectedExpert.upiId || 'NOT_PROVIDED'}</span>
                    </div>

                    {/* Expert Payout QR Code Display */}
                    <div className="space-y-2 pt-2 border-t border-[#0a2540]">
                      <span className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider block">Expert Payout QR Code</span>
                      {selectedExpert.payoutQrUrl ? (
                        <div
                          onClick={() => setSelectedQrZoom(selectedExpert.payoutQrUrl)}
                          className="relative w-40 h-40 bg-white p-2 rounded-2xl border-2 border-[#b58153] overflow-hidden cursor-pointer group shadow-lg"
                        >
                          <img src={selectedExpert.payoutQrUrl} alt="Payout QR" className="w-full h-full object-contain group-hover:scale-105 transition" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white text-[11px] font-bold">
                            <Eye className="w-4 h-4 mr-1" /> Click to Zoom
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 bg-[#090e18] rounded-xl border border-[#0a2540] text-xs text-slate-400 italic">
                          No Payout QR Code uploaded by expert yet.
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : null}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#010101] border-t border-[#0a2540] flex justify-end gap-2 shrink-0">
              {selectedExpert && selectedExpert.verificationStatus !== 'VERIFIED' && (
                <button
                  onClick={() => verifyMutation.mutate(selectedExpert.id)}
                  className="btn-primary text-xs px-5 py-2.5 font-black uppercase shadow-ns-gold"
                >
                  Approve Expert Profile
                </button>
              )}
              <button
                onClick={() => setSelectedExpertId(null)}
                className="btn-secondary text-xs px-4 py-2.5"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Image Zoom Modal */}
      {selectedQrZoom && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-[#090e18] p-4 rounded-3xl border border-[#0a2540] flex flex-col items-center">
            <button
              onClick={() => setSelectedQrZoom(null)}
              className="absolute top-4 right-4 bg-black/80 text-white p-2 rounded-full hover:bg-rose-600 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-sm font-bold text-[#ffebbf] mb-3 uppercase tracking-wider">Expert Payout QR Code Zoom</h3>
            <div className="w-64 h-64 bg-white p-2 rounded-2xl border-2 border-[#b58153] overflow-hidden shadow-2xl">
              <img src={selectedQrZoom} alt="Enlarged Expert QR" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminExpertsPage;

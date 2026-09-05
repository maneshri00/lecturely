import React, { useState } from 'react';
import { formatCurrency } from '../utils';
import { paymentService } from '../services/paymentService';
import { ShieldCheck, Lock, QrCode, Upload, CheckCircle2, Loader2, AlertCircle, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionFee: number;
  platformFee: number;
  bookingId: number;
  onSuccess: (paymentDetails?: any) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  sessionFee,
  platformFee,
  bookingId,
  onSuccess,
}) => {
  const [transactionId, setTransactionId] = useState('');
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const computedPlatformFee = platformFee || Math.round(sessionFee * 0.10);
  const baseSpeakerFee = sessionFee - computedPlatformFee;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitQrPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transactionId.trim()) {
      toast.error('Please enter the Transaction ID / UTR number');
      return;
    }

    try {
      setProcessing(true);
      let safeScreenshot = screenshotUrl;
      if (safeScreenshot && safeScreenshot.length > 250) {
        safeScreenshot = safeScreenshot.slice(0, 250);
      }
      await paymentService.submitQrPayment(Number(bookingId), transactionId.trim(), safeScreenshot || undefined);
      setProcessing(false);
      setSuccess(true);
      toast.success('Payment details submitted for Admin Verification! ⌛');
      setTimeout(() => {
        onSuccess({ transactionId });
      }, 1500);
    } catch (err: any) {
      setProcessing(false);
      const msg = err?.response?.data?.message || err?.message || 'Failed to submit payment details. Please try again.';
      toast.error(msg);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="glass-card-premium max-w-lg w-full border border-[#0a2540] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in duration-200 text-white rounded-3xl">
        {/* Header */}
        <div className="bg-[#090e18] border-b border-[#0a2540] p-6">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-[#ffebbf] uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#ffebbf]" /> Scan & Pay via Official QR
            </span>
            <button onClick={onClose} className="text-slate-400 hover:text-white font-bold text-lg">✕</button>
          </div>
          <div className="mt-4 flex justify-between items-end">
            <div>
              <span className="text-xs text-slate-400 block font-semibold">Total Payable Amount (incl. 10% Platform Fee)</span>
              <div className="text-3xl font-black text-[#ffebbf] mt-0.5">{formatCurrency(sessionFee)}</div>
            </div>
            <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              Manual QR Escrow
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 bg-[#090e18] max-h-[80vh] overflow-y-auto">
          {success ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#0a2540] text-[#ffebbf] mx-auto flex items-center justify-center border border-[#b58153]">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">Payment Proof Submitted!</h3>
              <p className="text-xs text-slate-300 max-w-xs mx-auto leading-relaxed">
                Your payment transaction ID (<span className="font-mono text-[#ffebbf] font-bold">{transactionId}</span>) has been received and is under manual verification by Lecturely Admin.
              </p>
              <div className="p-3 bg-[#010101] rounded-xl border border-[#0a2540] text-xs text-slate-400 font-mono">
                Status: <span className="text-amber-400 font-bold">VERIFYING</span>
              </div>
            </div>
          ) : processing ? (
            <div className="py-12 text-center space-y-4">
              <Loader2 className="w-12 h-12 text-[#ffebbf] animate-spin mx-auto" />
              <h3 className="font-bold text-white text-lg font-display">Submitting Payment Details...</h3>
              <p className="text-xs text-slate-400">Please wait while we record your transaction reference.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmitQrPayment} className="space-y-5">
              {/* Fee Breakdown Box */}
              <div className="bg-[#010101] border border-[#0a2540] p-4 rounded-2xl space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Base Speaker Fee</span>
                  <span className="font-bold text-white">{formatCurrency(baseSpeakerFee)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Platform Commission (10%)</span>
                  <span className="font-semibold text-amber-300">+{formatCurrency(computedPlatformFee)}</span>
                </div>
                <div className="flex justify-between text-[#ffebbf] font-black text-sm pt-1 border-t border-[#0a2540]">
                  <span>Total Payable Amount</span>
                  <span>{formatCurrency(sessionFee)}</span>
                </div>
              </div>

              {/* QR Image Box */}
              <div className="bg-[#010101] border-2 border-[#b58153]/50 p-4 rounded-2xl text-center space-y-3 shadow-inner">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#ffebbf] uppercase tracking-wider">
                  <QrCode className="w-4 h-4 text-[#ffebbf]" /> Scan to Pay via GPay / PhonePe / Paytm / BHIM
                </div>
                
                <div className="w-48 h-48 mx-auto bg-white p-2 rounded-xl shadow-2xl overflow-hidden border-2 border-[#b58153]">
                  <img
                    src="/assets/QRImage.jpeg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/QRImage.jpeg';
                    }}
                    alt="Payment QR Code"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-[11px] text-slate-400 font-medium">
                  Scan the QR code above using any UPI app and complete payment of <span className="text-[#ffebbf] font-bold">{formatCurrency(sessionFee)}</span> (Base {formatCurrency(baseSpeakerFee)} + {formatCurrency(computedPlatformFee)} platform fee)
                </p>
              </div>

              {/* Transaction ID Input */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider flex items-center justify-between">
                  <span>Transaction ID / UTR Number <span className="text-rose-400">*</span></span>
                  <span className="text-[10px] text-slate-400 font-normal">Required for verification</span>
                </label>
                <input
                  type="text"
                  required
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  placeholder="e.g. 423456789012 or UPI Ref No."
                  className="w-full p-3 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white rounded-xl text-sm focus:outline-none font-mono"
                />
              </div>

              {/* Screenshot Upload */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider">
                  Upload Payment Screenshot / Receipt (Optional)
                </label>
                <div className="relative border-2 border-dashed border-[#0a2540] hover:border-[#b58153]/60 bg-[#010101] rounded-2xl p-4 text-center cursor-pointer transition">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {screenshotUrl ? (
                    <div className="flex items-center justify-center gap-3">
                      <img src={screenshotUrl} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-[#b58153]" />
                      <div className="text-left">
                        <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Screenshot Attached
                        </span>
                        <span className="text-[10px] text-slate-400 block truncate max-w-[200px]">{fileName}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Upload className="w-6 h-6 text-[#b58153] mx-auto" />
                      <span className="text-xs font-bold text-slate-300 block">Click to select screenshot image</span>
                      <span className="text-[10px] text-slate-500 block">PNG, JPG, JPEG up to 5MB</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Info Note */}
              <div className="p-3 bg-[#090e18] border border-[#0a2540] rounded-xl text-[11px] text-slate-300 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#ffebbf] shrink-0 mt-0.5" />
                <span>Once submitted, Lecturely Admin will verify your transaction. Meeting room link unlocks automatically upon verification.</span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary w-full py-3.5 px-4 font-black uppercase text-xs tracking-wider shadow-ns-gold flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" /> Submit Payment for Verification ({formatCurrency(sessionFee)})
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;

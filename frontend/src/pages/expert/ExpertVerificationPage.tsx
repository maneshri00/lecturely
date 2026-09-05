import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../services/api';
import { ShieldCheck, Upload, FileText } from 'lucide-react';
import toast from 'react-hot-toast';

export const ExpertVerificationPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [docType, setDocType] = useState('ID_PROOF');
  const [fileName, setFileName] = useState('');

  const { data: docsData } = useQuery({
    queryKey: ['expert-documents'],
    queryFn: () => api.get('/expert/documents').then((r) => r.data),
  });

  const docs = docsData?.data || [];

  const uploadMutation = useMutation({
    mutationFn: () =>
      api.post('/expert/documents', {
        documentType: docType,
        fileName: fileName || 'verification_document.pdf',
      }).then((r) => r.data),
    onSuccess: () => {
      toast.success('Document uploaded for verification!');
      setFileName('');
      queryClient.invalidateQueries({ queryKey: ['expert-documents'] });
    },
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-white">
      <div>
        <h1 className="text-3xl font-black font-display text-white">Profile & Credential Verification</h1>
        <p className="text-[#ffebbf] text-sm mt-1 font-medium">Upload institutional ID, degree certificates, or appointment letters to get verified status.</p>
      </div>

      <div className="glass-card-premium p-6 border border-[#0a2540] flex items-start gap-4 bg-[#090e18]">
        <ShieldCheck className="w-8 h-8 text-[#ffebbf] flex-shrink-0 mt-1" />
        <div>
          <h3 className="font-bold font-display text-[#ffebbf] text-base">Why get verified?</h3>
          <p className="text-slate-300 text-sm mt-1">
            Verified speakers get a golden verification badge, 5x higher visibility in search results, and 80% higher booking request rates from colleges across India.
          </p>
        </div>
      </div>

      <div className="glass-card p-6 border border-[#0a2540] bg-[#090e18] space-y-4">
        <h2 className="text-xl font-bold font-display text-white">Upload New Document</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Document Type</label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full p-3 bg-[#010101] border border-[#0a2540] text-white rounded-xl text-sm focus:outline-none"
            >
              <option value="ID_PROOF" className="bg-[#090e18]">Govt ID / Aadhaar / Passport</option>
              <option value="INSTITUTION_ID" className="bg-[#090e18]">College / Organization ID Card</option>
              <option value="DEGREE_CERTIFICATE" className="bg-[#090e18]">Highest Degree Certificate (Ph.D./M.Tech/MBA)</option>
              <option value="APPOINTMENT_LETTER" className="bg-[#090e18]">Experience / Appointment Letter</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Document Name / Reference</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="e.g. iitb_faculty_id.pdf"
              className="w-full p-3 bg-[#010101] border border-[#0a2540] text-white placeholder:text-slate-500 rounded-xl text-sm focus:outline-none"
            />
          </div>
        </div>

        <button
          onClick={() => uploadMutation.mutate()}
          className="btn-primary text-xs px-6 py-3 font-black uppercase tracking-wider shadow-ns-gold flex items-center gap-2"
        >
          <Upload className="w-4 h-4" /> Upload Document
        </button>
      </div>

      <div className="glass-card p-6 border border-[#0a2540] bg-[#090e18] space-y-4">
        <h2 className="text-xl font-bold font-display text-white">Uploaded Documents</h2>
        {docs.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">No documents uploaded yet.</div>
        ) : (
          <div className="space-y-3">
            {docs.map((d: any) => (
              <div key={d.id} className="p-4 bg-[#010101] rounded-xl border border-[#0a2540] flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#ffebbf]" />
                  <div>
                    <h4 className="font-bold text-white text-sm">{d.fileName || d.documentType}</h4>
                    <span className="text-xs text-slate-400">{d.documentType}</span>
                  </div>
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                  d.status === 'APPROVED' ? 'bg-[#0a2540] text-[#ffebbf] border border-[#b58153]' : 'bg-[#010101] text-amber-300 border border-amber-500/40'
                }`}>
                  {d.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

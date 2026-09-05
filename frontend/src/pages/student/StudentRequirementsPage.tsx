import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { requirementService } from '../../services/requirementService';
import { formatDate, formatCurrency } from '../../utils';
import { PlusCircle, FileText, Users, Calendar } from 'lucide-react';

export const StudentRequirementsPage: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['student-requirements'],
    queryFn: requirementService.getAll,
  });

  const requirements = data?.data || [];

  return (
    <div className="space-y-6 text-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black font-display text-white">Posted Session Requirements</h1>
          <p className="text-[#ffebbf] text-sm mt-1 font-medium">Requirements posted for guest lectures and workshops.</p>
        </div>

        <Link
          to="/student/requirements/create"
          className="btn-primary text-xs px-5 py-3 shadow-ns-gold flex items-center gap-2 font-black uppercase tracking-wider"
        >
          <PlusCircle className="w-4 h-4" /> Post New Requirement
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2].map((n) => (
            <div key={n} className="h-32 bg-[#090e18] border border-[#0a2540] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : requirements.length === 0 ? (
        <div className="text-center py-16 glass-card-premium p-8 border border-[#0a2540]">
          <FileText className="w-12 h-12 text-[#ffebbf] mx-auto mb-3" />
          <h3 className="text-lg font-bold font-display text-white">No requirements posted yet</h3>
          <p className="text-slate-300 text-sm mt-1">Post a requirement to receive smart recommendations from matching speakers.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {requirements.map((req: any) => (
            <div key={req.id} className="glass-card p-6 border border-[#0a2540] bg-[#090e18] space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-bold text-[#ffebbf] bg-[#010101] border border-[#0a2540] px-3 py-1 rounded-full uppercase tracking-wider">
                    {req.subject || 'General'}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-3">{req.title}</h3>
                </div>
                <span className="text-xs font-mono text-slate-300">{formatDate(req.createdAt)}</span>
              </div>

              <p className="text-slate-300 text-sm line-clamp-2">{req.description}</p>

              <div className="flex items-center gap-4 text-xs text-slate-300 pt-3 border-t border-[#0a2540] flex-wrap font-medium">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#ffebbf]" /> {req.numAttendees || '50+'} Attendees
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#ffebbf]" /> {req.preferredDate ? formatDate(req.preferredDate) : 'Flexible Date'}
                </span>
                <span className="font-bold text-[#ffebbf]">
                  Budget: {formatCurrency(req.budgetMax || 10000)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

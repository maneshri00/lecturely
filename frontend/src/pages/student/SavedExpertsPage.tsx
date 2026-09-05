import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { expertService } from '../../services/expertService';
import { ExpertCard } from '../../components/ExpertCard';
import { Bookmark } from 'lucide-react';

export const SavedExpertsPage: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['saved-experts'],
    queryFn: expertService.getSaved,
  });

  const experts = data?.data || [];

  return (
    <div className="space-y-6 text-white">
      <div>
        <h1 className="text-3xl font-black font-display text-white">Saved Experts</h1>
        <p className="text-[#ffebbf] text-sm mt-1 font-medium">Your bookmarked speakers and experts.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-64 bg-[#090e18] border border-[#0a2540] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : experts.length === 0 ? (
        <div className="text-center py-16 glass-card-premium p-8 border border-[#0a2540]">
          <Bookmark className="w-12 h-12 text-[#ffebbf] mx-auto mb-3" />
          <h3 className="text-lg font-bold font-display text-white">No saved experts yet</h3>
          <p className="text-slate-400 text-sm mt-1">Bookmark experts from the directory to quickly access them later.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experts.map((exp: any) => (
            <ExpertCard key={exp.id} expert={exp} />
          ))}
        </div>
      )}
    </div>
  );
};

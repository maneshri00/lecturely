import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, ShieldCheck, Building, Linkedin, ExternalLink } from 'lucide-react';
import type { Expert } from '../types';
import { Button } from './Button';
import { getServiceFee, calculateFeeDetails, formatCurrency } from '../utils';

interface ExpertCardProps {
  expert: Expert;
  showMatchScore?: boolean;
  isExpertPortal?: boolean;
  selectedService?: string;
}

export const ExpertCard: React.FC<ExpertCardProps> = ({ expert, showMatchScore, isExpertPortal = false, selectedService }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/experts/${expert.id}${selectedService ? `?service=${selectedService}` : ''}`);
  };

  const calculatedBaseFee = getServiceFee(expert, selectedService);
  const feeInfo = calculateFeeDetails(calculatedBaseFee);

  const serviceLabelMap: Record<string, string> = {
    GUEST_LECTURE: 'Guest Speaker',
    MENTORSHIP: '1-on-1 Mentor',
    PERSONAL_TUTOR: 'Personal Tutor',
    RESEARCH_ADVISOR: 'Research Guide',
    WORKSHOP_TRAINER: 'Workshop Trainer',
  };

  return (
    <div 
      onClick={handleCardClick}
      className="glass-card p-6 border border-[#0a2540] bg-[#090e18] hover:border-[#b58153]/60 transition-all duration-300 relative group flex flex-col h-full shadow-ns-card hover:shadow-ns-hover cursor-pointer rounded-2xl"
    >
      {/* Top right badges */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 z-10">
        {expert.verificationStatus === 'VERIFIED' && (
          <div className="text-[#ffebbf] bg-[#0a2540] border border-[#b58153]/40 p-1.5 rounded-full shadow-md" title="Verified Expert Speaker">
            <ShieldCheck size={18} />
          </div>
        )}
      </div>

      {showMatchScore && expert.matchScore && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#ffebbf] to-[#b58153] text-[#010101] text-xs font-black px-3 py-1 rounded-full shadow-ns-gold z-10">
          {expert.matchScore}% Match
        </div>
      )}

      {/* Main info row */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ffebbf] to-[#b58153] flex items-center justify-center text-[#010101] text-xl font-black flex-shrink-0 border-2 border-[#ffebbf]/40 shadow-md overflow-hidden">
          {expert.profilePhotoUrl ? (
            <img src={expert.profilePhotoUrl} alt={expert.fullName} className="w-full h-full object-cover" />
          ) : (
            expert.fullName.charAt(0)
          )}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-white group-hover:text-[#ffebbf] transition-colors line-clamp-1">
            {expert.fullName}
          </h3>
          
          <p className="text-xs text-slate-300 line-clamp-1 flex items-center gap-1 mt-0.5 font-medium">
            <Building size={13} className="flex-shrink-0 text-[#ffebbf]" />
            {expert.designation} @ {expert.organization}
          </p>

          {/* Golden Trust Stars & Session Rating */}
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <div className="flex items-center bg-[#0a2540]/80 border border-[#b58153]/40 px-2 py-0.5 rounded-md text-[#ffebbf] text-xs font-black shadow-inner">
              <Star size={13} className="fill-amber-400 text-amber-400 mr-1" />
              <span>{expert.rating ? expert.rating.toFixed(1) : (expert.totalSessions ? '5.0' : '0.0')}</span>
            </div>
            <span className="text-slate-500 text-xs">•</span>
            <span className="text-slate-300 text-xs font-medium">{expert.totalSessions ?? 0} sessions</span>
            
            {expert.rating && expert.rating >= 4.5 && (
              <span className="text-[10px] font-bold px-1.5 py-0.5 bg-amber-400/10 text-amber-300 border border-amber-400/30 rounded">
                Top Rated ⭐
              </span>
            )}
          </div>
        </div>
      </div>

      {/* LinkedIn Trust Option Badge */}
      <div className="mb-4">
        {expert.linkedinUrl ? (
          <a
            href={expert.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#0077b5]/15 hover:bg-[#0077b5]/30 text-[#38bdf8] border border-[#0077b5]/40 rounded-full text-xs font-bold transition group/link"
            title="Click to view verified LinkedIn profile"
          >
            <Linkedin size={13} className="fill-current text-[#0077b5]" />
            <span>LinkedIn Verified Profile</span>
            <ExternalLink size={11} className="opacity-70 group-hover/link:opacity-100 transition-opacity" />
          </a>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#010101] text-slate-400 border border-[#0a2540] rounded-full text-[11px] font-medium">
            <ShieldCheck size={12} className="text-slate-500" /> Institution Verified
          </span>
        )}
      </div>

      {/* Service Role Badges */}
      <div className="flex flex-wrap gap-1 mb-3">
        {(expert.servicesOffered || ['GUEST_LECTURE', 'MENTORSHIP']).map((srv: string) => {
          const badgeMap: Record<string, string> = {
            GUEST_LECTURE: '🎓 Speaker',
            MENTORSHIP: '🎯 1-on-1 Mentor',
            PERSONAL_TUTOR: '📖 Personal Tutor',
            RESEARCH_ADVISOR: '🔬 Research Guide',
            WORKSHOP_TRAINER: '💻 Workshop Trainer',
          };
          const isSelected = selectedService === srv;
          return (
            <span key={srv} className={`px-2 py-0.5 text-[10px] font-bold rounded transition ${
              isSelected ? 'bg-gradient-to-r from-[#ffebbf] to-[#b58153] text-[#010101] font-black' : 'bg-[#010101] text-[#ffebbf] border border-[#0a2540]'
            }`}>
              {badgeMap[srv] || srv}
            </span>
          );
        })}
      </div>

      <div className="flex items-center gap-1 text-slate-300 text-sm mb-4 font-medium">
        <MapPin size={14} className="text-[#ffebbf]" />
        <span>{expert.city}, {expert.state}</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-5 flex-1">
        {(expert.expertise || (expert as any).expertiseAreas || []).slice(0, 3).map((area: string, i: number) => (
          <span key={i} className="px-3 py-1 bg-[#0a2540] text-[#ffebbf] border border-[#b58153]/30 text-xs font-semibold rounded-lg">
            {area}
          </span>
        ))}
      </div>

      {/* Fee Display Including 10% Platform Fee */}
      <div className="pt-4 border-t border-[#0a2540] flex items-center justify-between mt-auto">
        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
            Total Payable (incl. 10% Platform Fee)
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="font-black text-[#ffebbf] text-lg">{formatCurrency(feeInfo.totalFee)}</span>
            <span className="text-[10px] text-slate-400 font-mono">({formatCurrency(feeInfo.baseFee)} + {formatCurrency(feeInfo.platformFee)})</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="primary"
            onClick={(e) => {
              e.stopPropagation();
              navigate(isExpertPortal ? `/experts/${expert.id}` : `/student/requirements/create?expertId=${expert.id}${selectedService ? `&service=${selectedService}` : ''}`);
            }}
            className="text-xs px-3.5 py-2 font-black uppercase shadow-ns-gold"
          >
            {isExpertPortal ? 'Hire & Invite' : 'Select & Book'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpertCard;

import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { expertService } from '../../services/expertService';
import { ExpertCard } from '../../components/ExpertCard';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { SERVICE_CATEGORIES } from '../../utils/constants';
import { Linkedin, Save, ShieldCheck, ExternalLink, Sparkles, UserCheck, Star, CheckSquare, Square, Coins, Upload } from 'lucide-react';
import toast from 'react-hot-toast';

export const ExpertProfileEditPage: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: profileData, isLoading } = useQuery({
    queryKey: ['my-expert-profile'],
    queryFn: expertService.getMyProfile,
  });

  const profile = profileData?.data;

  const [servicePricing, setServicePricing] = useState<Record<string, number>>({
    GUEST_LECTURE: 5000,
    MENTORSHIP: 1500,
    PERSONAL_TUTOR: 2000,
    RESEARCH_ADVISOR: 3500,
    WORKSHOP_TRAINER: 8000,
  });

  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    designation: '',
    city: '',
    state: '',
    linkedinUrl: '',
    portfolioUrl: '',
    bio: '',
    sessionFee: 5000,
    industryExperience: 5,
    academicExperience: 3,
    education: '',
    languages: 'English, Hindi',
    servicesOffered: ['GUEST_LECTURE', 'MENTORSHIP', 'PERSONAL_TUTOR'],
    profilePhotoUrl: '',
    bannerPhotoUrl: '',
    accountHolderName: '',
    bankName: '',
    bankAccountNumber: '',
    bankIfscCode: '',
    upiId: '',
    payoutQrUrl: '',
  });

  useEffect(() => {
    if (profile) {
      if (profile.servicePricing) {
        setServicePricing(profile.servicePricing);
      }
      setFormData({
        fullName: profile.fullName || '',
        organization: profile.organization || '',
        designation: profile.designation || '',
        city: profile.city || '',
        state: profile.state || '',
        linkedinUrl: profile.linkedinUrl || '',
        portfolioUrl: profile.portfolioUrl || '',
        bio: profile.bio || '',
        sessionFee: profile.sessionFee || 5000,
        industryExperience: profile.industryExperience || 0,
        academicExperience: profile.academicExperience || 0,
        education: profile.education || '',
        languages: Array.isArray(profile.languages) ? profile.languages.join(', ') : profile.languages || 'English, Hindi',
        servicesOffered: profile.servicesOffered || ['GUEST_LECTURE', 'MENTORSHIP', 'PERSONAL_TUTOR'],
        profilePhotoUrl: profile.profilePhotoUrl || '',
        bannerPhotoUrl: profile.bannerPhotoUrl || '',
        accountHolderName: profile.accountHolderName || '',
        bankName: profile.bankName || '',
        bankAccountNumber: profile.bankAccountNumber || '',
        bankIfscCode: profile.bankIfscCode || '',
        upiId: profile.upiId || '',
        payoutQrUrl: profile.payoutQrUrl || '',
      });
    }
  }, [profile]);

  const toggleService = (val: string) => {
    setFormData(prev => {
      const exists = prev.servicesOffered.includes(val);
      const updated = exists ? prev.servicesOffered.filter(s => s !== val) : [...prev.servicesOffered, val];
      return { ...prev, servicesOffered: updated };
    });
  };

  const updateMutation = useMutation({
    mutationFn: (updatedData: typeof formData) => {
      const primaryFee = servicePricing['GUEST_LECTURE'] || updatedData.sessionFee || 5000;
      return expertService.updateProfile({
        ...updatedData,
        sessionFee: primaryFee,
        servicesOffered: updatedData.servicesOffered.join(','),
        servicePricing: servicePricing,
      });
    },
    onSuccess: () => {
      toast.success('Teacher Profile, LinkedIn, & Service offerings updated successfully!');
      queryClient.invalidateQueries({ queryKey: ['my-expert-profile'] });
      queryClient.invalidateQueries({ queryKey: ['experts'] });
      queryClient.invalidateQueries({ queryKey: ['expert'] });
    },
    onError: () => {
      toast.error('Failed to update profile. Please try again.');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.linkedinUrl && !formData.linkedinUrl.toLowerCase().includes('linkedin.com/')) {
      toast.error('Please enter a valid LinkedIn URL starting with https://linkedin.com/in/...');
      return;
    }
    updateMutation.mutate(formData);
  };

  // Preview object for the live ExpertCard display
  const previewExpert = {
    id: profile?.id || 99,
    publicId: profile?.publicId || 'exp-preview',
    fullName: formData.fullName || 'Dr. Your Full Name',
    organization: formData.organization || 'Your Institution / Company',
    designation: formData.designation || 'Senior Professor / Leader',
    rating: profile?.rating || 4.9,
    totalSessions: profile?.totalSessions || 15,
    totalInstitutions: profile?.totalInstitutions || 8,
    city: formData.city || 'Mumbai',
    state: formData.state || 'Maharashtra',
    sessionFee: formData.sessionFee || 5000,
    verificationStatus: profile?.verificationStatus || 'VERIFIED',
    isOnlineAvailable: true,
    isOfflineAvailable: true,
    isTravelAvailable: true,
    expertise: profile?.expertise || ['AI & ML', 'Guest Lectures', 'Leadership'],
    languages: formData.languages ? formData.languages.split(',').map(s => s.trim()) : ['English'],
    profilePhotoUrl: profile?.profilePhotoUrl,
    linkedinUrl: formData.linkedinUrl,
    servicesOffered: formData.servicesOffered,
    industryExperience: Number(formData.industryExperience),
    academicExperience: Number(formData.academicExperience),
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-8">
        <div className="h-96 bg-[#090e18] border border-[#0a2540] rounded-2xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8 text-white">
      {/* Header Banner */}
      <div className="glass-card-premium p-6 sm:p-8 border border-[#0a2540] bg-[#090e18]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-black font-display text-white">Teacher Portal • Profile & Services Settings</h1>
              <span className="bg-[#0a2540] text-[#ffebbf] border border-[#b58153]/40 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ffebbf]" /> Live Profile
              </span>
            </div>
            <p className="text-[#ffebbf] text-sm mt-1.5 font-medium">
              Manage your speaker credentials, LinkedIn verification, and offer 1-on-1 Mentorship, Personal Tutoring, or Workshops.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#010101] px-4 py-2 rounded-xl border border-[#0a2540] text-xs font-bold text-slate-300">
            <UserCheck className="w-4 h-4 text-emerald-400" /> Trust Badge Enabled
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8 border border-[#0a2540] bg-[#090e18] space-y-6">
            
            {/* Service Offerings & Multi-Tiered Pricing Configurator */}
            <div className="p-5 bg-[#010101] border border-[#0a2540] rounded-2xl space-y-4">
              <div>
                <h3 className="font-bold text-white text-base font-display flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#ffebbf]" /> Service Offerings & Customized Pricing Matrix
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Select services you provide and configure individual session fee rates for each service type (e.g. Guest Speaker, 1-on-1 Mentor, Personal Tutor, Workshop Trainer).
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {SERVICE_CATEGORIES.map((cat) => {
                  const isChecked = formData.servicesOffered.includes(cat.value);
                  const currentPrice = servicePricing[cat.value] ?? (
                    cat.value === 'GUEST_LECTURE' ? (formData.sessionFee || 5000) :
                    cat.value === 'MENTORSHIP' ? Math.round((formData.sessionFee || 5000) * 0.3) :
                    cat.value === 'PERSONAL_TUTOR' ? Math.round((formData.sessionFee || 5000) * 0.4) :
                    cat.value === 'RESEARCH_ADVISOR' ? Math.round((formData.sessionFee || 5000) * 0.7) :
                    Math.round((formData.sessionFee || 5000) * 1.6)
                  );

                  return (
                    <div
                      key={cat.value}
                      className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                        isChecked 
                          ? 'bg-[#0a2540] border-[#b58153] text-[#ffebbf]' 
                          : 'bg-[#090e18] border-[#0a2540] text-slate-400 hover:border-[#b58153]/40'
                      }`}
                    >
                      <div 
                        onClick={() => toggleService(cat.value)}
                        className="flex items-start gap-3 cursor-pointer flex-1"
                      >
                        <div className="mt-0.5 text-[#ffebbf]">
                          {isChecked ? <CheckSquare className="w-4 h-4 text-[#ffebbf]" /> : <Square className="w-4 h-4 text-slate-500" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                            <span>{cat.badge}</span>
                            <span className="text-[10px] text-slate-400 font-normal">({cat.label})</span>
                          </div>
                          <div className="text-[11px] text-slate-300 mt-0.5">{cat.desc}</div>
                        </div>
                      </div>

                      {isChecked && (
                        <div className="flex items-center gap-2 bg-[#010101] p-2 rounded-xl border border-[#0a2540] shrink-0 w-full sm:w-auto">
                          <span className="text-[11px] font-bold text-[#ffebbf] uppercase whitespace-nowrap">Session Fee (₹):</span>
                          <input
                            type="number"
                            step="250"
                            value={currentPrice}
                            onChange={(e) => setServicePricing({ ...servicePricing, [cat.value]: Number(e.target.value) })}
                            className="w-28 p-1.5 bg-[#090e18] border border-[#0a2540] text-white font-black text-xs rounded-lg focus:outline-none focus:border-[#ffebbf]"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* LinkedIn Verification Feature Section */}
            <div className="p-5 bg-gradient-to-br from-[#0a2540]/80 via-[#090e18] to-[#010101] border-2 border-[#b58153]/50 rounded-2xl space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#0077b5] text-white flex items-center justify-center font-bold shadow-lg">
                    <Linkedin className="w-5 h-5 fill-current" />
                  </div>
                  <h3 className="font-bold text-white text-base font-display">LinkedIn Verification Option</h3>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 bg-[#ffebbf] text-[#010101] rounded-full">
                  High Impact Trust Indicator
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Adding your official LinkedIn profile link creates instant credibility. Students & institution heads can verify your work history directly when searching for experts!
              </p>

              <div>
                <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5 flex items-center justify-between">
                  <span>LinkedIn Profile Link</span>
                  {formData.linkedinUrl && (
                    <a
                      href={formData.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ffebbf] hover:underline flex items-center gap-1 normal-case font-normal text-xs"
                    >
                      Test Link <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#0077b5]">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/your-profile-name"
                    value={formData.linkedinUrl}
                    onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 bg-[#010101] border border-[#0a2540] focus:border-[#ffebbf] text-white placeholder:text-slate-500 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#b58153]/40 transition"
                  />
                </div>
              </div>
            </div>

            {/* Profile Photo Section with File Upload */}
            <div className="p-5 bg-[#010101] border border-[#0a2540] rounded-2xl space-y-3">
              <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider">
                Profile Photo / Avatar Upload
              </label>
              <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#b58153] bg-[#090e18] flex items-center justify-center text-[#ffebbf] font-black text-2xl flex-shrink-0 shadow-lg relative group">
                  {formData.profilePhotoUrl ? (
                    <img src={formData.profilePhotoUrl} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    formData.fullName ? formData.fullName.substring(0, 2).toUpperCase() : 'EX'
                  )}
                </div>
                <div className="flex-1 space-y-2.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <input
                      type="file"
                      id="profile-photo-upload"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const img = new Image();
                          img.onload = () => {
                            const canvas = document.createElement('canvas');
                            const MAX_WIDTH = 400;
                            const MAX_HEIGHT = 400;
                            let width = img.width;
                            let height = img.height;

                            if (width > height) {
                              if (width > MAX_WIDTH) {
                                height *= MAX_WIDTH / width;
                                width = MAX_WIDTH;
                              }
                            } else {
                              if (height > MAX_HEIGHT) {
                                width *= MAX_HEIGHT / height;
                                height = MAX_HEIGHT;
                              }
                            }

                            canvas.width = width;
                            canvas.height = height;
                            const ctx = canvas.getContext('2d');
                            ctx?.drawImage(img, 0, 0, width, height);

                            const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
                            setFormData((prev) => ({ ...prev, profilePhotoUrl: dataUrl }));
                            toast.success('Photo optimized and uploaded!');
                          };
                          img.src = event.target?.result as string;
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                    <label
                      htmlFor="profile-photo-upload"
                      className="btn-primary text-xs px-4 py-2 font-bold uppercase tracking-wider cursor-pointer shadow-sm inline-flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Photo from Device</span>
                    </label>

                    {formData.profilePhotoUrl && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, profilePhotoUrl: '' })}
                        className="text-xs bg-rose-950/60 text-rose-300 border border-rose-800/40 px-3 py-2 rounded-xl font-bold hover:bg-rose-900/80 transition"
                      >
                        Remove Photo
                      </button>
                    )}
                  </div>

                  <Input
                    type="url"
                    value={formData.profilePhotoUrl}
                    onChange={(e) => setFormData({ ...formData, profilePhotoUrl: e.target.value })}
                    placeholder="Or paste image URL (e.g. https://images.unsplash.com/...)"
                  />

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, profilePhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' })}
                      className="text-[10px] bg-[#0a2540] text-[#ffebbf] px-2.5 py-1 rounded-md border border-[#b58153]/40 font-bold hover:bg-[#0a2540]/80"
                    >
                      Sample Photo 1
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, profilePhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' })}
                      className="text-[10px] bg-[#0a2540] text-[#ffebbf] px-2.5 py-1 rounded-md border border-[#b58153]/40 font-bold hover:bg-[#0a2540]/80"
                    >
                      Sample Photo 2
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Cover Banner Photo Section */}
            <div className="p-5 bg-[#010101] border border-[#0a2540] rounded-2xl space-y-3">
              <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider">
                Profile Cover Banner / Header Image
              </label>
              
              {/* Banner Preview Box */}
              <div className="h-32 w-full rounded-xl border border-[#b58153]/40 bg-[#090e18] overflow-hidden relative shadow-md">
                {formData.bannerPhotoUrl ? (
                  <img src={formData.bannerPhotoUrl} alt="Cover Banner Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-r from-[#0a2540] via-[#090e18] to-[#010101] flex items-center justify-center text-slate-400 text-xs font-semibold">
                    Default Professional Banner (Click below to upload or choose a theme)
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <input
                  type="file"
                  id="banner-photo-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      const img = new Image();
                      img.onload = () => {
                        const canvas = document.createElement('canvas');
                        const MAX_WIDTH = 1200;
                        const MAX_HEIGHT = 400;
                        let width = img.width;
                        let height = img.height;

                        if (width > MAX_WIDTH) {
                          height *= MAX_WIDTH / width;
                          width = MAX_WIDTH;
                        }

                        canvas.width = width;
                        canvas.height = height;
                        const ctx = canvas.getContext('2d');
                        ctx?.drawImage(img, 0, 0, width, height);

                        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
                        setFormData((prev) => ({ ...prev, bannerPhotoUrl: dataUrl }));
                        toast.success('Cover banner updated and optimized!');
                      };
                      img.src = event.target?.result as string;
                    };
                    reader.readAsDataURL(file);
                  }}
                />
                <label
                  htmlFor="banner-photo-upload"
                  className="btn-primary text-xs px-4 py-2 font-bold uppercase tracking-wider cursor-pointer shadow-sm inline-flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload Banner from Device</span>
                </label>

                {formData.bannerPhotoUrl && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, bannerPhotoUrl: '' })}
                    className="text-xs bg-rose-950/60 text-rose-300 border border-rose-800/40 px-3 py-2 rounded-xl font-bold hover:bg-rose-900/80 transition"
                  >
                    Remove Banner
                  </button>
                )}
              </div>

              <div className="pt-2">
                <span className="text-[10px] text-slate-400 font-bold block mb-1 uppercase tracking-wider">Choose Theme Preset Banners:</span>
                <div className="flex gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, bannerPhotoUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80' })}
                    className="text-[10px] bg-[#0a2540] text-[#ffebbf] px-3 py-1.5 rounded-lg border border-[#b58153]/40 font-bold hover:border-[#ffebbf] transition"
                  >
                    ⚡ Tech & Hardware Circuitry
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, bannerPhotoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' })}
                    className="text-[10px] bg-[#0a2540] text-[#ffebbf] px-3 py-1.5 rounded-lg border border-[#b58153]/40 font-bold hover:border-[#ffebbf] transition"
                  >
                    🧠 AI & Cyber Mesh
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, bannerPhotoUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1200&q=80' })}
                    className="text-[10px] bg-[#0a2540] text-[#ffebbf] px-3 py-1.5 rounded-lg border border-[#b58153]/40 font-bold hover:border-[#ffebbf] transition"
                  >
                    ✨ Modern Executive Gradient
                  </button>
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold font-display text-white border-b border-[#0a2540] pb-2">Personal & Academic Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Full Name</label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Dr. Full Name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Session / Tuition Fee (₹/session)</label>
                  <Input
                    type="number"
                    value={formData.sessionFee}
                    onChange={(e) => setFormData({ ...formData, sessionFee: Number(e.target.value) })}
                    placeholder="5000"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Organization / University</label>
                  <Input
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="e.g. IIT Bombay / Google"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Designation</label>
                  <Input
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    placeholder="e.g. Professor & AI Specialist"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">City</label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Mumbai"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">State</label>
                  <Input
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="e.g. Maharashtra"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Industry Experience (Years)</label>
                  <Input
                    type="number"
                    value={formData.industryExperience}
                    onChange={(e) => setFormData({ ...formData, industryExperience: Number(e.target.value) })}
                    placeholder="10"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Academic Experience (Years)</label>
                  <Input
                    type="number"
                    value={formData.academicExperience}
                    onChange={(e) => setFormData({ ...formData, academicExperience: Number(e.target.value) })}
                    placeholder="5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Highest Education / Qualifications</label>
                <Input
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  placeholder="e.g. Ph.D. in Computer Science (IIT Delhi), M.Tech"
                />
              </div>

              {/* Per-Skill Custom Rates Section */}
              <div className="p-5 bg-[#010101] border border-[#0a2540] rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Coins className="w-4 h-4 text-amber-400" /> Per-Subject / Custom Skill Rates
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Set custom session charges for specialized subjects (e.g., VLSI Design = ₹8,000, AI & ML = ₹6,000).
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 bg-[#090e18] border border-[#0a2540] rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-[#ffebbf] uppercase block">VLSI Design Rate</span>
                    <Input
                      type="number"
                      placeholder="e.g. 8000"
                    />
                  </div>

                  <div className="p-3 bg-[#090e18] border border-[#0a2540] rounded-xl space-y-1">
                    <span className="text-[11px] font-bold text-[#ffebbf] uppercase block">Machine Learning / AI Rate</span>
                    <Input
                      type="number"
                      placeholder="e.g. 6000"
                    />
                  </div>
                </div>
              </div>

              {/* Official Downloadable Syllabus & Presentation Slide Links */}
              <div className="p-5 bg-[#010101] border border-[#0a2540] rounded-2xl space-y-3">
                <div>
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#ffebbf]" /> Course Syllabus & Downloadable Resource Links
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Paste valid public download URLs for your course syllabus (PDF, Google Drive, Slide Deck pptx). Only valid URLs uploaded here will be available to students.
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold text-[#ffebbf] uppercase mb-1">Official Syllabus PDF Link</label>
                    <Input
                      placeholder="https://drive.google.com/file/d/.../view or https://example.com/syllabus.pdf"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#ffebbf] uppercase mb-1">Lecture Slide Deck Link (PPTX / Slides)</label>
                    <Input
                      placeholder="https://drive.google.com/file/d/.../view or slide deck link"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Languages Spoken</label>
                <Input
                  value={formData.languages}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value })}
                  placeholder="e.g. English, Hindi, Marathi"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Speaker & Mentor Overview</label>
                <Textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Share a short bio summarizing your key achievements, research areas, mentoring topics, and tuition offerings..."
                />
              </div>

              {/* Payout & Bank Account Details (Private to Admin) Section */}
              <div className="p-5 bg-[#010101] border-2 border-[#b58153]/50 rounded-2xl space-y-4 shadow-xl">
                <div>
                  <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#ffebbf]" /> Payout & Bank Account Details (Private & Confidential)
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Enter your bank account details or upload your payout QR code. These details are <span className="text-[#ffebbf] font-bold">strictly confidential</span> and visible ONLY to Admin for releasing your session earnings.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#ffebbf] uppercase mb-1">Account Holder Name</label>
                    <Input
                      value={formData.accountHolderName}
                      onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                      placeholder="Full Name as in Bank Account"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#ffebbf] uppercase mb-1">Bank Name</label>
                    <Input
                      value={formData.bankName}
                      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                      placeholder="e.g. HDFC Bank, SBI, ICICI"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-[#ffebbf] uppercase mb-1">Account Number</label>
                    <Input
                      value={formData.bankAccountNumber}
                      onChange={(e) => setFormData({ ...formData, bankAccountNumber: e.target.value })}
                      placeholder="e.g. 5010023456789"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-[#ffebbf] uppercase mb-1">IFSC Code</label>
                    <Input
                      value={formData.bankIfscCode}
                      onChange={(e) => setFormData({ ...formData, bankIfscCode: e.target.value })}
                      placeholder="e.g. HDFC0001234"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#ffebbf] uppercase mb-1">UPI ID (VPA)</label>
                  <Input
                    value={formData.upiId}
                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                    placeholder="e.g. 9876543210@paytm or name@okicici"
                  />
                </div>

                {/* Expert Payout QR Upload */}
                <div className="space-y-2 pt-2 border-t border-[#0a2540]">
                  <label className="block text-[11px] font-bold text-[#ffebbf] uppercase">
                    Upload Your Personal Payout QR Code (GPay / PhonePe / Paytm)
                  </label>

                  <div className="flex items-center gap-4 flex-wrap">
                    {formData.payoutQrUrl && (
                      <div className="w-24 h-24 bg-white p-1 rounded-xl border border-[#b58153] overflow-hidden shrink-0 shadow-md">
                        <img src={formData.payoutQrUrl} alt="Payout QR Code" className="w-full h-full object-contain" />
                      </div>
                    )}

                    <div className="space-y-2">
                      <input
                        type="file"
                        id="payout-qr-upload"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          if (file.size > 5 * 1024 * 1024) {
                            toast.error('QR image must be less than 5MB');
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setFormData((prev) => ({ ...prev, payoutQrUrl: event.target?.result as string }));
                            toast.success('Payout QR Code uploaded successfully!');
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                      <label
                        htmlFor="payout-qr-upload"
                        className="btn-primary text-xs px-4 py-2 font-bold uppercase tracking-wider cursor-pointer shadow-sm inline-flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload Payout QR Code</span>
                      </label>

                      {formData.payoutQrUrl && (
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, payoutQrUrl: '' })}
                          className="text-xs bg-rose-950/60 text-rose-300 border border-rose-800/40 px-3 py-1.5 rounded-xl font-bold hover:bg-rose-900/80 transition ml-2"
                        >
                          Remove QR Code
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={updateMutation.isPending}
              className="w-full py-4 text-xs font-black uppercase tracking-wider shadow-ns-gold flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Profile & Service Settings
            </Button>
          </form>
        </div>

        {/* Live Search Card Preview Column */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-24 space-y-4">
            <div className="glass-card-premium p-4 border border-[#0a2540] bg-[#090e18] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-[#ffebbf] uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-400" /> Student Search Preview
              </div>
              <span className="text-[11px] text-slate-400 font-medium">Real-time Render</span>
            </div>

            <p className="text-xs text-slate-400 px-1 font-medium">
              This preview shows exactly how students will see your card while searching for <span className="text-[#ffebbf] font-bold">Mentors, Tutors & Speakers</span>!
            </p>

            <div className="transform transition-all">
              <ExpertCard expert={previewExpert} />
            </div>

            <div className="p-4 bg-[#010101] border border-[#0a2540] rounded-xl text-xs space-y-2">
              <h4 className="font-bold text-[#ffebbf] uppercase tracking-wider flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-current text-[#b58153]" /> Trust Signals Included:
              </h4>
              <ul className="space-y-1 text-slate-300 list-disc list-inside">
                <li>Direct clickable LinkedIn profile badge</li>
                <li>Offered Service Role Badges (Mentorship, Personal Tutor, Keynote)</li>
                <li>Golden Trust Stars and session rating</li>
                <li>Verified Institutional Shield</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertProfileEditPage;

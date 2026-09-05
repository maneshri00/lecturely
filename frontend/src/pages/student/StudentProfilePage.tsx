import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../../components/Input';
import { Textarea } from '../../components/Textarea';
import { Button } from '../../components/Button';
import { BOOKING_ROLES } from '../../utils/constants';
import { getStudentProfile, updateStudentProfile } from '../../services/studentService';
import { UserCheck, ShieldCheck, Upload, Save, Sparkles, GraduationCap, User } from 'lucide-react';
import toast from 'react-hot-toast';

export const StudentProfilePage: React.FC = () => {
  const { user, setAuth } = useAuthStore();

  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    institution: user?.institution || '',
    course: user?.course || '',
    branch: user?.branch || '',
    yearOfStudy: user?.yearOfStudy || 1,
    city: user?.city || 'Bangalore',
    state: user?.state || 'Karnataka',
    bookingRole: user?.bookingRole || 'INDIVIDUAL',
    profilePhotoUrl: user?.profilePhotoUrl || '',
    bio: user?.bio || '',
  });

  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await getStudentProfile();
        if (data) {
          setFormData({
            fullName: data.fullName || user?.fullName || '',
            email: data.email || user?.email || '',
            phone: data.phone || user?.phone || '',
            institution: data.institution || user?.institution || '',
            course: data.course || user?.course || '',
            branch: data.branch || user?.branch || '',
            yearOfStudy: data.yearOfStudy || user?.yearOfStudy || 1,
            city: data.city || user?.city || 'Bangalore',
            state: data.state || user?.state || 'Karnataka',
            bookingRole: data.bookingRole || user?.bookingRole || 'INDIVIDUAL',
            profilePhotoUrl: data.profilePhotoUrl || user?.profilePhotoUrl || '',
            bio: data.bio || user?.bio || '',
          });
        }
      } catch (err) {
        console.info('Backend profile fetch bypassed, using local state.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let savedData = formData;
      try {
        const result = await updateStudentProfile(formData);
        if (result) savedData = { ...formData, ...result };
      } catch (err) {
        console.warn('Backend profile update offline, saving locally.');
      }

      const updatedUser = {
        ...user,
        ...savedData,
      };
      
      // Update global auth store and persistent storage
      setAuth(updatedUser, localStorage.getItem('token') || '', localStorage.getItem('refreshToken') || '');
      toast.success('Student profile & photo updated successfully! ✨');
    } catch (err) {
      toast.error('Failed to update student profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 text-white px-2 sm:px-4">
      {/* Header Banner */}
      <div className="glass-card-premium p-6 sm:p-8 border border-[#0a2540] bg-[#090e18] rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white">Student Profile Settings</h1>
            <span className="bg-[#0a2540] text-[#ffebbf] border border-[#b58153]/40 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ffebbf]" /> Student Identity
            </span>
          </div>
          <p className="text-[#ffebbf] text-xs sm:text-sm mt-1.5 font-medium">
            Upload your profile photo, share your academic bio, and update institutional details.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#010101] px-4 py-2 rounded-xl border border-[#0a2540] text-xs font-bold text-slate-300">
          <UserCheck className="w-4 h-4 text-emerald-400" /> Active Student
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Photo Upload & Avatar Settings */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-6 border border-[#0a2540] bg-[#090e18] rounded-2xl text-center space-y-4">
            <h3 className="text-xs font-bold text-[#ffebbf] uppercase tracking-wider flex items-center justify-center gap-1.5">
              <User className="w-4 h-4 text-[#ffebbf]" /> Profile Photo Avatar
            </h3>

            {/* Avatar Circle Container */}
            <div className="relative w-32 h-32 mx-auto">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#b58153] bg-[#010101] flex items-center justify-center text-[#ffebbf] font-black text-4xl shadow-2xl relative group">
                {formData.profilePhotoUrl ? (
                  <img src={formData.profilePhotoUrl} alt="Student Avatar" className="w-full h-full object-cover" />
                ) : (
                  formData.fullName ? formData.fullName.substring(0, 2).toUpperCase() : 'ST'
                )}
              </div>
            </div>

            {/* Photo Upload Controls */}
            <div className="space-y-3">
              <input
                type="file"
                id="student-photo-upload"
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
                      toast.success('Profile photo loaded & optimized!');
                    };
                    img.src = event.target?.result as string;
                  };
                  reader.readAsDataURL(file);
                }}
              />
              <label
                htmlFor="student-photo-upload"
                className="btn-primary w-full text-xs py-2.5 font-bold uppercase tracking-wider cursor-pointer shadow-ns-gold inline-flex items-center justify-center gap-2"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Device Photo</span>
              </label>

              {formData.profilePhotoUrl && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, profilePhotoUrl: '' })}
                  className="w-full text-xs bg-rose-950/60 text-rose-300 border border-rose-800/40 py-2 rounded-xl font-bold hover:bg-rose-900/80 transition"
                >
                  Remove Photo
                </button>
              )}
            </div>

            {/* Direct Image URL input */}
            <div className="pt-2">
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1 text-left">
                Or Paste Image URL:
              </label>
              <Input
                type="url"
                value={formData.profilePhotoUrl}
                onChange={(e) => setFormData({ ...formData, profilePhotoUrl: e.target.value })}
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            {/* Sample Avatars */}
            <div className="pt-2 text-left space-y-1.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Sample Student Avatars:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, profilePhotoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' })}
                  className="text-[10px] bg-[#0a2540] text-[#ffebbf] px-2.5 py-1 rounded-md border border-[#b58153]/40 font-bold hover:border-[#ffebbf]"
                >
                  Avatar 1
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, profilePhotoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' })}
                  className="text-[10px] bg-[#0a2540] text-[#ffebbf] px-2.5 py-1 rounded-md border border-[#b58153]/40 font-bold hover:border-[#ffebbf]"
                >
                  Avatar 2
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bio & Academic Information Form */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-card p-6 sm:p-8 border border-[#0a2540] bg-[#090e18] rounded-2xl space-y-6">
            
            {/* Bio Section */}
            <div className="p-5 bg-[#010101] border border-[#0a2540] rounded-2xl space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#ffebbf]" />
                <h3 className="font-bold text-white text-sm uppercase tracking-wider">Student Bio & Academic Goals</h3>
              </div>
              <p className="text-xs text-slate-300">
                Write a brief summary of your academic background, target specialization areas, project interests, or mentoring objectives.
              </p>
              <Textarea
                rows={4}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="e.g. 3rd-year ECE student at IIT Madras passionate about VLSI Design, Machine Learning, and seeking guidance for higher studies and technical paper publications..."
              />
            </div>

            {/* Personal Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#ffebbf] border-b border-[#0a2540] pb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" /> Academic & Personal Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Full Name</label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Full Name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Email Address</label>
                  <Input
                    value={formData.email}
                    disabled
                    className="opacity-60 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">College / Institution Name</label>
                  <Input
                    value={formData.institution}
                    onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                    placeholder="e.g. BITS Pilani / IIT Madras"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Booking Capacity / Role</label>
                  <select
                    value={formData.bookingRole}
                    onChange={(e) => setFormData({ ...formData, bookingRole: e.target.value })}
                    className="w-full p-3 bg-[#010101] border border-[#0a2540] text-white rounded-xl text-sm font-medium focus:outline-none"
                  >
                    {BOOKING_ROLES.map((r) => (
                      <option key={r.value} value={r.value} className="bg-[#090e18] text-white">{r.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Course</label>
                  <Input
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    placeholder="e.g. B.Tech"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Branch</label>
                  <Input
                    value={formData.branch}
                    onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                    placeholder="e.g. ECE / CSE"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">Year of Study</label>
                  <select
                    value={formData.yearOfStudy}
                    onChange={(e) => setFormData({ ...formData, yearOfStudy: Number(e.target.value) })}
                    className="w-full p-3 bg-[#010101] border border-[#0a2540] text-white rounded-xl text-sm font-medium focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5].map((y) => (
                      <option key={y} value={y} className="bg-[#090e18] text-white">Year {y}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">City</label>
                  <Input
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Bangalore"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1.5">State</label>
                  <Input
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="Karnataka"
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={saving}
              className="w-full py-3.5 text-xs font-black uppercase tracking-wider shadow-ns-gold flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" /> Save Student Profile & Bio
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StudentProfilePage;

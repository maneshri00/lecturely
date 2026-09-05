import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { adminService } from '../../services/adminService';
import { Users, UserX, UserCheck, ShieldCheck, Search, Key, UserCog, LogOut, Copy, Check, X, ShieldAlert } from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [resetModalUser, setResetModalUser] = useState<any | null>(null);
  const [customPassword, setCustomPassword] = useState('');
  const [generatedPasswordResult, setGeneratedPasswordResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const [roleModalUser, setRoleModalUser] = useState<any | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('STUDENT');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-students'],
    queryFn: () => adminService.getStudents(0, 100),
  });

  const toggleUserStatusMutation = useMutation({
    mutationFn: (userId: number) => adminService.toggleUserStatus(userId),
    onSuccess: () => {
      toast.success('User account status updated!');
      queryClient.invalidateQueries({ queryKey: ['admin-students'] });
    },
    onError: () => {
      toast.error('Failed to update user status.');
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: ({ userId, pwd }: { userId: number; pwd?: string }) =>
      adminService.forceResetPassword(userId, pwd),
    onSuccess: (res: any) => {
      const pwd = res?.data || res?.message || 'Password reset successful';
      setGeneratedPasswordResult(pwd);
      toast.success('User password reset successfully!');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to reset user password.');
    },
  });

  const changeRoleMutation = useMutation({
    mutationFn: ({ userId, role }: { userId: number; role: string }) =>
      adminService.changeUserRole(userId, role),
    onSuccess: () => {
      toast.success('User role changed successfully!');
      setRoleModalUser(null);
      queryClient.invalidateQueries({ queryKey: ['admin-students'] });
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to change user role.');
    },
  });

  const revokeSessionsMutation = useMutation({
    mutationFn: (userId: number) => adminService.revokeUserSessions(userId),
    onSuccess: () => {
      toast.success('Active sessions revoked for user!');
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Failed to revoke sessions.');
    },
  });

  const rawStudents = (data as any)?.data?.content || (data as any)?.data || [];
  const students = Array.isArray(rawStudents) ? rawStudents : [];

  const filteredStudents = students.filter((s: any) =>
    (s.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.institution || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.role || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopyPassword = () => {
    if (generatedPasswordResult) {
      navigator.clipboard.writeText(generatedPasswordResult);
      setCopied(true);
      toast.success('Password copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 text-white max-w-7xl mx-auto px-2 sm:px-4">
      {/* Header */}
      <div className="glass-card-premium p-6 border border-[#0a2540] bg-[#090e18] rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white">Supreme Security & User Management</h1>
            <span className="text-xs bg-[#0a2540] text-[#ffebbf] px-3 py-1 rounded-full border border-[#b58153]/40 font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ffebbf]" /> Admin Master Control
            </span>
          </div>
          <p className="text-[#ffebbf] text-xs sm:text-sm mt-1.5 font-medium">
            Full admin security controls: Force reset credentials, modify authority roles, revoke session tokens, and suspend accounts.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="glass-card p-4 border border-[#0a2540] bg-[#090e18] rounded-xl flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder="Search users by full name, email address, institution, or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none"
        />
      </div>

      {/* Users Table */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-20 bg-[#090e18] border border-[#0a2540] rounded-xl animate-pulse" />
          ))}
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="glass-card p-8 border border-[#0a2540] text-center text-slate-400 text-sm rounded-xl">
          No users found matching your search query.
        </div>
      ) : (
        <div className="glass-card border border-[#0a2540] bg-[#090e18] rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#010101] text-[#ffebbf] uppercase text-[10px] font-bold border-b border-[#0a2540]">
                <tr>
                  <th className="px-5 py-3.5">User Details</th>
                  <th className="px-5 py-3.5">Institution / City</th>
                  <th className="px-5 py-3.5">Authority Role</th>
                  <th className="px-5 py-3.5">Account Status</th>
                  <th className="px-5 py-3.5 text-right">Security & Master Controls</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0a2540]/60">
                {filteredStudents.map((u: any) => {
                  const isSuspended = u.status === 'SUSPENDED';
                  const userRole = u.role || 'STUDENT';
                  return (
                    <tr key={u.id} className="hover:bg-[#010101]/60 transition">
                      <td className="px-5 py-4 font-medium">
                        <div className="font-bold text-white text-sm">{u.fullName || 'Platform User'}</div>
                        <div className="text-slate-400 font-mono text-[11px]">{u.email || u.username}</div>
                      </td>
                      <td className="px-5 py-4 text-slate-300">
                        <div>{u.institution || 'N/A'}</div>
                        <div className="text-slate-500 text-[11px]">{u.city || 'India'}</div>
                      </td>
                      <td className="px-5 py-4 text-slate-300">
                        <span className={`px-2.5 py-1 rounded font-bold text-[10px] uppercase border ${
                          userRole === 'ADMIN'
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                            : userRole === 'EXPERT'
                            ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                            : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}>
                          {userRole}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          isSuspended ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        }`}>
                          {isSuspended ? 'SUSPENDED' : 'ACTIVE'}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 flex-wrap">
                          {/* Force Reset Password */}
                          <button
                            onClick={() => {
                              setResetModalUser(u);
                              setCustomPassword('');
                              setGeneratedPasswordResult(null);
                            }}
                            title="Force Reset Password"
                            className="p-1.5 bg-[#0a2540] hover:bg-[#12365d] text-[#ffebbf] rounded border border-[#b58153]/40 transition text-[11px] flex items-center gap-1 font-bold"
                          >
                            <Key className="w-3.5 h-3.5 text-amber-400" /> Reset Pwd
                          </button>

                          {/* Change Role */}
                          <button
                            onClick={() => {
                              setRoleModalUser(u);
                              setSelectedRole(u.role || 'STUDENT');
                            }}
                            title="Change User Role"
                            className="p-1.5 bg-[#0a2540] hover:bg-[#12365d] text-[#ffebbf] rounded border border-[#b58153]/40 transition text-[11px] flex items-center gap-1 font-bold"
                          >
                            <UserCog className="w-3.5 h-3.5 text-blue-400" /> Role
                          </button>

                          {/* Revoke Sessions */}
                          <button
                            onClick={() => {
                              if (confirm(`Revoke all active sessions for ${u.fullName || u.email}?`)) {
                                revokeSessionsMutation.mutate(u.id);
                              }
                            }}
                            disabled={revokeSessionsMutation.isPending}
                            title="Revoke Active Sessions"
                            className="p-1.5 bg-[#0a2540] hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 rounded border border-rose-500/30 transition text-[11px] flex items-center gap-1 font-bold"
                          >
                            <LogOut className="w-3.5 h-3.5 text-rose-400" /> Revoke
                          </button>

                          {/* Toggle Account Status */}
                          <button
                            onClick={() => toggleUserStatusMutation.mutate(u.id)}
                            disabled={toggleUserStatusMutation.isPending}
                            className={`p-1.5 rounded transition text-[11px] flex items-center gap-1 font-bold uppercase tracking-wider border ${
                              isSuspended
                                ? 'bg-emerald-950/50 text-emerald-400 border-emerald-500/40 hover:bg-emerald-900/60'
                                : 'bg-rose-950/50 text-rose-400 border-rose-500/40 hover:bg-rose-900/60'
                            }`}
                          >
                            {isSuspended ? (
                              <><UserCheck className="w-3.5 h-3.5" /> Activate</>
                            ) : (
                              <><UserX className="w-3.5 h-3.5" /> Suspend</>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Force Reset Password Modal */}
      {resetModalUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card p-6 border border-[#0a2540] bg-[#090e18] rounded-2xl max-w-md w-full space-y-4 relative shadow-2xl">
            <button
              onClick={() => setResetModalUser(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-[#0a2540] pb-3">
              <div className="p-2.5 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/40">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Force Reset User Password</h3>
                <p className="text-xs text-slate-400 font-mono">{resetModalUser.email || resetModalUser.fullName}</p>
              </div>
            </div>

            {generatedPasswordResult ? (
              <div className="space-y-3 bg-[#010101] p-4 rounded-xl border border-amber-500/40">
                <p className="text-xs text-amber-300 font-bold">New Temporary Password Generated:</p>
                <div className="flex items-center justify-between bg-[#090e18] p-3 rounded-lg border border-[#0a2540] font-mono text-sm text-emerald-400 font-black">
                  <span>{generatedPasswordResult}</span>
                  <button
                    onClick={handleCopyPassword}
                    className="p-1.5 hover:bg-[#0a2540] text-slate-300 hover:text-white rounded transition flex items-center gap-1 text-xs font-sans"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p className="text-[11px] text-slate-400">
                  Share this temporary password with the user. They can log in immediately and reset it from their profile.
                </p>
                <button
                  onClick={() => setResetModalUser(null)}
                  className="w-full btn-primary text-xs py-2 font-bold uppercase mt-2"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-1">
                    Custom Password (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Leave blank for auto-generated password"
                    value={customPassword}
                    onChange={(e) => setCustomPassword(e.target.value)}
                    className="w-full p-2.5 bg-[#010101] border border-[#0a2540] text-white text-xs rounded-xl font-mono focus:outline-none focus:border-[#b58153]"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    If left blank, system will generate a secure random password (e.g. Temp#8f2a1b).
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    onClick={() => setResetModalUser(null)}
                    className="btn-secondary text-xs px-4 py-2 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() =>
                      resetPasswordMutation.mutate({
                        userId: resetModalUser.id,
                        pwd: customPassword.trim() || undefined,
                      })
                    }
                    disabled={resetPasswordMutation.isPending}
                    className="btn-primary text-xs px-5 py-2 font-bold uppercase shadow-ns-gold flex items-center gap-1.5"
                  >
                    <Key className="w-3.5 h-3.5" /> Execute Reset
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Change User Role Modal */}
      {roleModalUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-card p-6 border border-[#0a2540] bg-[#090e18] rounded-2xl max-w-md w-full space-y-4 relative shadow-2xl">
            <button
              onClick={() => setRoleModalUser(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-[#0a2540] pb-3">
              <div className="p-2.5 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/40">
                <UserCog className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Modify User Authority Role</h3>
                <p className="text-xs text-slate-400 font-mono">{roleModalUser.fullName || roleModalUser.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#ffebbf] uppercase tracking-wider mb-2">
                  Select Authority Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['STUDENT', 'EXPERT', 'ADMIN'].map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={`p-3 rounded-xl border text-xs font-bold uppercase tracking-wider text-center transition ${
                        selectedRole === role
                          ? 'bg-[#0a2540] text-[#ffebbf] border-[#b58153] shadow-md'
                          : 'bg-[#010101] text-slate-400 border-[#0a2540] hover:text-white'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {selectedRole === 'ADMIN' && (
                <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl flex items-start gap-2.5 text-xs text-amber-200">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Warning:</strong> Granting ADMIN role gives this user full platform control and supreme security privileges.
                  </span>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setRoleModalUser(null)}
                  className="btn-secondary text-xs px-4 py-2 font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={() =>
                    changeRoleMutation.mutate({
                      userId: roleModalUser.id,
                      role: selectedRole,
                    })
                  }
                  disabled={changeRoleMutation.isPending}
                  className="btn-primary text-xs px-5 py-2 font-bold uppercase shadow-ns-gold flex items-center gap-1.5"
                >
                  <UserCog className="w-3.5 h-3.5" /> Confirm Role Change
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;

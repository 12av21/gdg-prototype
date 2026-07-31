import React, { useState } from 'react';
import { ShieldAlert, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { User, Role } from '../../types';

interface LoginPageProps {
  onLoginSuccess: (user: User) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('analyst@scip.sec');
  const [password, setPassword] = useState('password');
  const [role, setRole] = useState<Role>('Analyst');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess({
      id: 'u-101',
      name: role === 'Admin' ? 'Sarah Connor (Admin)' : role === 'Analyst' ? 'Alex Mercer (SOC Lead)' : 'John Doe (Employee)',
      email,
      role,
      department: 'Cyber Defense Center',
      createdAt: new Date().toISOString()
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] relative overflow-hidden p-4">
      {/* Background Decorative Gradients */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md glass-card rounded-2xl p-8 border border-slate-800 shadow-2xl relative z-10">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-3.5 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 shadow-lg shadow-brand-500/25 mb-4 text-white">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">SCIP Portal</h2>
          <p className="text-slate-400 text-sm mt-1">Smart Cybersecurity Intelligence Platform</p>
        </div>

        {/* Demo Quick Role Switcher */}
        <div className="mb-6 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
          <p className="text-slate-400 font-medium mb-2 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-400" /> Select Demo Access Role:
          </p>
          <div className="grid grid-cols-3 gap-2">
            {(['Admin', 'Analyst', 'Employee'] as Role[]).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setRole(r);
                  setEmail(`${r.toLowerCase()}@scip.sec`);
                }}
                className={`py-1.5 px-2 rounded-lg font-medium transition-all ${
                  role === r
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-medium shadow-lg shadow-brand-600/25 flex items-center justify-center gap-2 transition-all mt-6"
          >
            <span>Authenticate & Access SCIP</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">
          Encrypted & Protected by SCIP JWT Security Services
        </p>
      </div>
    </div>
  );
};

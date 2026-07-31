import React, { useState } from 'react';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  AlertTriangle, 
  BookOpen, 
  Bot, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';
import { User } from '../types';

interface DashboardLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: User;
  onLogout: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeTab,
  setActiveTab,
  currentUser,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, role: ['Admin', 'Analyst', 'Employee'] },
    { id: 'incidents', label: 'Incidents', icon: AlertTriangle, role: ['Admin', 'Analyst', 'Employee'], badge: '3' },
    { id: 'ai', label: 'AI Security Copilot', icon: Bot, role: ['Admin', 'Analyst', 'Employee'], highlight: true },
    { id: 'knowledge', label: 'Knowledge Base', icon: BookOpen, role: ['Admin', 'Analyst', 'Employee'] },
    { id: 'reports', label: 'Reports & Analytics', icon: BarChart3, role: ['Admin', 'Analyst'] },
    { id: 'users', label: 'User Management', icon: Users, role: ['Admin'] },
    { id: 'settings', label: 'Settings', icon: Settings, role: ['Admin', 'Analyst', 'Employee'] },
  ];

  const filteredNav = navigation.filter(item => item.role.includes(currentUser.role));

  return (
    <div className="min-h-screen flex bg-[#0B0F19]">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 glass-panel border-r border-slate-800 p-4 sticky top-0 h-screen z-30">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 py-4 mb-6 border-b border-slate-800/80">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 shadow-lg shadow-brand-500/20 text-white">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold tracking-tight text-white text-lg leading-tight">SCIP</h1>
            <p className="text-xs font-mono text-brand-400">Cyber Intelligence v1.0</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1">
          {filteredNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? item.highlight
                      ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-600/30'
                      : 'bg-brand-600/20 text-brand-400 border border-brand-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? (item.highlight ? 'text-white' : 'text-brand-400') : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="mt-auto pt-4 border-t border-slate-800/80">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center font-bold text-slate-200 border border-slate-600">
                {currentUser.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-white truncate">{currentUser.name}</p>
                <span className="inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-400 border border-brand-500/20">
                  {currentUser.role}
                </span>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="p-2 text-slate-400 hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
              title="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 glass-panel sticky top-0 z-20 border-b border-slate-800/80 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <div className="relative hidden md:block w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search incidents, CVEs, docs..."
                className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-500"></span>
            </button>
            <div className="h-6 w-px bg-slate-800"></div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
                SOC Active
              </span>
            </div>
          </div>
        </header>

        {/* Dynamic Page View */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

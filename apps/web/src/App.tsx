import React, { useState } from 'react';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardLayout } from './layouts/DashboardLayout';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { IncidentPage } from './pages/incidents/IncidentPage';
import { KnowledgePage } from './pages/knowledge/KnowledgePage';
import { AiCopilotPage } from './pages/ai/AiCopilotPage';
import { ReportsPage } from './pages/reports/ReportsPage';
import { User } from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 'u-101',
    name: 'Alex Mercer (SOC Lead)',
    email: 'analyst@scip.sec',
    role: 'Analyst',
    department: 'Cyber Security Operations Center',
    createdAt: new Date().toISOString()
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');

  if (!currentUser) {
    return <LoginPage onLoginSuccess={(user) => setCurrentUser(user)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage onNavigate={(tab) => setActiveTab(tab)} />;
      case 'incidents':
        return <IncidentPage currentUser={currentUser} />;
      case 'knowledge':
        return <KnowledgePage />;
      case 'ai':
        return <AiCopilotPage />;
      case 'reports':
        return <ReportsPage />;
      case 'users':
        return (
          <div className="glass-card p-8 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-white">User & Role Management</h3>
            <p className="text-slate-400 text-sm">Configure Role-Based Access Controls (Admin, Analyst, Employee).</p>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
              Role permissions verified via ASP.NET Core JWT Claim Policy Authorization.
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="glass-card p-8 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-xl font-bold text-white">System & AI Vector Configuration</h3>
            <p className="text-slate-400 text-sm">PostgreSQL pgvector parameters, Google Gemini API Keys, and Alerting Endpoints.</p>
          </div>
        );
      default:
        return <DashboardPage onNavigate={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <DashboardLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      currentUser={currentUser}
      onLogout={() => setCurrentUser(null)}
    >
      {renderContent()}
    </DashboardLayout>
  );
}

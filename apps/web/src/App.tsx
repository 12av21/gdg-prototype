import React, { useState } from 'react';
import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardLayout } from './layouts/DashboardLayout';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { IncidentPage } from './pages/incidents/IncidentPage';
import { KnowledgePage } from './pages/knowledge/KnowledgePage';
import { AiCopilotPage } from './pages/ai/AiCopilotPage';
import { ReportsPage } from './pages/reports/ReportsPage';
import { AuthProvider, useAuth } from './context/AuthContext';

type AppView = 'landing' | 'login' | 'app';

const AppContent: React.FC = () => {
  const { user, logout } = useAuth();
  const [view, setView] = useState<AppView>(user ? 'app' : 'landing');
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // If user is already logged in (session restored), go straight to app
  React.useEffect(() => {
    if (user) setView('app');
  }, [user]);

  if (view === 'landing') {
    return <LandingPage onGetStarted={() => setView('login')} />;
  }

  if (view === 'login' && !user) {
    return <LoginPage />;
  }

  if (!user) {
    return <LandingPage onGetStarted={() => setView('login')} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage onNavigate={(tab) => setActiveTab(tab)} />;
      case 'incidents':
        return <IncidentPage currentUser={user} />;
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
              Permissions enforced via ASP.NET Core JWT Claim Policy Authorization.
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
      currentUser={user}
      onLogout={() => {
        logout();
        setView('landing');
        setActiveTab('dashboard');
      }}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

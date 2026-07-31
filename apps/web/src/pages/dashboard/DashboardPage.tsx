import React, { useEffect, useState } from 'react';
import {
  AlertTriangle, CheckCircle2, Clock, Bot, BookOpen,
  ShieldCheck, TrendingUp, Activity, ArrowUpRight, Loader2
} from 'lucide-react';
import { Incident } from '../../types';
import { analyticsService, DashboardStats } from '../../services/analyticsService';
import { incidentService } from '../../services/incidentService';

interface DashboardPageProps {
  onNavigate: (tab: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, incidentData] = await Promise.all([
          analyticsService.getDashboardStats(),
          incidentService.getAll(),
        ]);
        setStats(statsData);
        setIncidents(incidentData.slice(0, 3));
      } catch {
        // If API is offline fallback to mock values
        setStats({ openIncidents: 3, resolvedToday: 12, totalDocuments: 148, aiQueriesTotal: 482, avgMttrMinutes: 24.5 });
        setIncidents(MOCK_INCIDENTS);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-400 gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-brand-500" />
        <span className="text-sm">Loading SOC telemetry...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card p-6 rounded-2xl border border-brand-500/20 bg-gradient-to-r from-brand-950/40 via-slate-900/80 to-slate-900 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-brand-400 font-mono text-xs font-semibold mb-1">
            <Activity className="w-4 h-4 animate-pulse" /> LIVE SECURITY OVERVIEW
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Cyber Threat Intelligence Command</h2>
          <p className="text-slate-400 text-sm mt-1">Real-time telemetry, automated RAG guidance, and incident response operations.</p>
        </div>
        <button
          onClick={() => onNavigate('ai')}
          className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-medium text-sm shadow-lg shadow-brand-500/20 flex items-center gap-2 transition-all whitespace-nowrap"
        >
          <Bot className="w-4 h-4" />
          <span>Launch AI Security Copilot</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Open Incidents</span>
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/20"><AlertTriangle className="w-4 h-4" /></div>
          </div>
          <p className="text-3xl font-bold text-white mt-3">{stats?.openIncidents ?? 0}</p>
          <div className="flex items-center gap-1.5 text-xs text-red-400 mt-2 font-mono">
            <TrendingUp className="w-3.5 h-3.5" /> Requires immediate attention
          </div>
        </div>

        <div className="glass-card p-5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Resolved Today</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><CheckCircle2 className="w-4 h-4" /></div>
          </div>
          <p className="text-3xl font-bold text-white mt-3">{stats?.resolvedToday ?? 0}</p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-mono">
            <ShieldCheck className="w-3.5 h-3.5" /> MTTR: {stats?.avgMttrMinutes ?? 0} mins avg
          </div>
        </div>

        <div className="glass-card p-5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">RAG Knowledge Docs</span>
            <div className="p-2 rounded-lg bg-brand-500/10 text-brand-400 border border-brand-500/20"><BookOpen className="w-4 h-4" /></div>
          </div>
          <p className="text-3xl font-bold text-white mt-3">{stats?.totalDocuments ?? 0}</p>
          <div className="text-xs text-slate-400 mt-2 font-mono">NIST & MITRE indexed in pgvector</div>
        </div>

        <div className="glass-card p-5 rounded-xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">AI Copilot Queries</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"><Bot className="w-4 h-4" /></div>
          </div>
          <p className="text-3xl font-bold text-white mt-3">{stats?.aiQueriesTotal ?? 0}</p>
          <div className="flex items-center gap-1.5 text-xs text-indigo-400 mt-2 font-mono">
            <Clock className="w-3.5 h-3.5" /> Gemini RAG powered
          </div>
        </div>
      </div>

      {/* Incidents Table & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-xl p-6 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-white">Active Security Incidents</h3>
            <button onClick={() => onNavigate('incidents')} className="text-xs text-brand-400 hover:text-brand-300 font-medium flex items-center gap-1">
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {incidents.map((inc) => (
              <div key={inc.id} onClick={() => onNavigate('incidents')}
                className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-brand-500/30 transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-400">{inc.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      inc.severity === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : inc.severity === 'High' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>{inc.severity}</span>
                  </div>
                  <h4 className="font-semibold text-slate-100 text-sm">{inc.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-1">{inc.description}</p>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto text-xs text-slate-400 gap-1 border-t sm:border-0 border-slate-800 pt-2 sm:pt-0">
                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">{inc.status}</span>
                  <span className="font-mono">{new Date(inc.createdAt).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-brand-500/20 text-brand-400"><Bot className="w-5 h-5" /></div>
            <div>
              <h3 className="font-bold text-white text-base">Suggested Security Tasks</h3>
              <p className="text-xs text-slate-400">AI-generated threat recommendations</p>
            </div>
          </div>
          <div className="space-y-2 text-xs">
            {['🔍 Ransomware Playbook Check', '🛡️ CVE Patch Verification', '📚 Knowledge Base Sync'].map((task, i) => (
              <div key={i} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-brand-500/30 transition-colors cursor-pointer" onClick={() => onNavigate('ai')}>
                <span className="font-semibold text-slate-200 block mb-1">{task}</span>
                <p className="text-slate-400">Click to ask AI Security Copilot for guidance.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const MOCK_INCIDENTS: Incident[] = [
  { id: 'INC-001', title: 'Suspicious PowerShell Execution', description: 'Obfuscated script on WS-402', severity: 'Critical', category: 'Malware', status: 'Investigating', reportedBy: 'EDR', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), evidenceCount: 4 },
  { id: 'INC-002', title: 'Phishing Campaign - Finance', description: 'Fake invoice macro payload', severity: 'High', category: 'Social Engineering', status: 'In Progress', reportedBy: 'Jane Doe', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), evidenceCount: 2 },
];

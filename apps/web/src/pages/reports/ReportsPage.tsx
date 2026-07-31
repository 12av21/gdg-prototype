import React from 'react';
import { 
  BarChart3, 
  Download, 
  PieChart, 
  TrendingUp, 
  ShieldAlert, 
  CheckCircle2,
  FileSpreadsheet,
  FileText
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Analytics & Executive Reports</h2>
          <p className="text-slate-400 text-sm">Security telemetry, MTTR performance metrics, AI Copilot usage, and incident breakdown.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert("Exporting Executive Summary PDF...")}
            className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <FileText className="w-3.5 h-3.5 text-red-400" /> Export PDF
          </button>
          <button
            onClick={() => alert("Exporting CSV Telemetry Data...")}
            className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-700"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" /> Export CSV
          </button>
        </div>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-5 rounded-xl border border-slate-800">
          <span className="text-xs font-medium text-slate-400">Mean Time to Remediate (MTTR)</span>
          <p className="text-3xl font-bold text-white mt-2">24.5 mins</p>
          <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> 18% improvement vs last month
          </p>
        </div>

        <div className="glass-card p-5 rounded-xl border border-slate-800">
          <span className="text-xs font-medium text-slate-400">RAG AI Accuracy Rate</span>
          <p className="text-3xl font-bold text-white mt-2">99.2%</p>
          <p className="text-xs text-brand-400 mt-1">Based on 482 analyst evaluations</p>
        </div>

        <div className="glass-card p-5 rounded-xl border border-slate-800">
          <span className="text-xs font-medium text-slate-400">Top Attack Vector</span>
          <p className="text-2xl font-bold text-white mt-2">Phishing / Social Eng.</p>
          <p className="text-xs text-amber-400 mt-1">42% of all incidents reported</p>
        </div>
      </div>

      {/* Visual Telemetry Chart Mocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">Monthly Incident Distribution</h3>
            <span className="text-xs font-mono text-slate-400">Jul 2026</span>
          </div>

          {/* Custom CSS Bar Charts */}
          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Malware Execution</span>
                <span className="font-mono text-slate-400">38% (42 Incidents)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-brand-500 rounded-full" style={{ width: '38%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Phishing & Credential Theft</span>
                <span className="font-mono text-slate-400">42% (48 Incidents)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Network Anomaly & Scanning</span>
                <span className="font-mono text-slate-400">14% (16 Incidents)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '14%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Unauthorized API Access</span>
                <span className="font-mono text-slate-400">6% (7 Incidents)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '6%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base">RAG AI Query Breakdown</h3>
            <span className="text-xs font-mono text-slate-400">Gemini Engine</span>
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Incident Remediation Guidance</span>
                <span className="font-mono text-slate-400">54%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '54%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Policy & NIST Standard Lookup</span>
                <span className="font-mono text-slate-400">28%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full" style={{ width: '28%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Threat Intelligence & CVE Lookup</span>
                <span className="font-mono text-slate-400">18%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '18%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

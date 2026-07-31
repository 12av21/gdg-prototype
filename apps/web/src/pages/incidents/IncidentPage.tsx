import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Plus, 
  Search, 
  Filter, 
  FileText, 
  User as UserIcon, 
  Paperclip, 
  Send, 
  CheckCircle,
  X
} from 'lucide-react';
import { Incident, IncidentSeverity, IncidentStatus, User } from '../../types';

interface IncidentPageProps {
  currentUser: User;
}

export const IncidentPage: React.FC<IncidentPageProps> = ({ currentUser }) => {
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: 'INC-2026-001',
      title: 'Suspicious PowerShell Execution Detected',
      description: 'Obfuscated PowerShell execution identified on Endpoint-WS-402 with parent process svchost.exe',
      severity: 'Critical',
      category: 'Malware Execution',
      status: 'Investigating',
      reportedBy: 'EDR Agent',
      assignedAnalyst: 'Alex Mercer',
      createdAt: '2026-07-31 10:14:02',
      updatedAt: '2026-07-31 11:00:15',
      evidenceCount: 4
    },
    {
      id: 'INC-2026-002',
      title: 'Phishing Email Campaign targeting Finance',
      description: 'Multiple employees received fake invoice attachment containing macro-enabled XLSM payload',
      severity: 'High',
      category: 'Social Engineering',
      status: 'In Progress',
      reportedBy: 'Jane Doe',
      assignedAnalyst: 'Sarah Connor',
      createdAt: '2026-07-31 09:30:00',
      updatedAt: '2026-07-31 10:45:22',
      evidenceCount: 2
    },
    {
      id: 'INC-2026-003',
      title: 'Unusual Inbound Traffic on Port 8443',
      description: 'Spike in inbound TLS traffic from unknown ASN range matching known C2 infrastructure signatures',
      severity: 'Medium',
      category: 'Network Anomaly',
      status: 'New',
      reportedBy: 'Sentinel Firewall',
      createdAt: '2026-07-31 08:12:40',
      updatedAt: '2026-07-31 08:12:40',
      evidenceCount: 1
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(incidents[0]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Incident Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newSeverity, setNewSeverity] = useState<IncidentSeverity>('High');
  const [newCategory, setNewCategory] = useState('Malware Execution');

  const handleCreateIncident = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Incident = {
      id: `INC-2026-00${incidents.length + 1}`,
      title: newTitle,
      description: newDesc,
      severity: newSeverity,
      category: newCategory,
      status: 'New',
      reportedBy: currentUser.name,
      createdAt: new Date().toLocaleString(),
      updatedAt: new Date().toLocaleString(),
      evidenceCount: 0
    };

    setIncidents([created, ...incidents]);
    setSelectedIncident(created);
    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  const filteredIncidents = incidents.filter(inc => {
    const matchesSearch = inc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          inc.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSev = selectedSeverity === 'All' || inc.severity === selectedSeverity;
    return matchesSearch && matchesSev;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Incident Operations Hub</h2>
          <p className="text-slate-400 text-sm">Investigate, track, and remediate cybersecurity threats across endpoints.</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-medium text-sm shadow-lg shadow-brand-500/20 flex items-center gap-2 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Report New Incident</span>
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="glass-card p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search incident title, ID..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400 font-medium">Severity:</span>
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="py-1.5 px-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-200 focus:outline-none"
          >
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Split View: List & Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incident List Column */}
        <div className="space-y-3">
          {filteredIncidents.map((inc) => (
            <div
              key={inc.id}
              onClick={() => setSelectedIncident(inc)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedIncident?.id === inc.id
                  ? 'bg-slate-900/90 border-brand-500 shadow-md shadow-brand-500/10'
                  : 'glass-card border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-semibold text-slate-400">{inc.id}</span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    inc.severity === 'Critical'
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : inc.severity === 'High'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}
                >
                  {inc.severity}
                </span>
              </div>
              <h4 className="font-semibold text-white text-sm leading-snug">{inc.title}</h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{inc.description}</p>
              
              <div className="flex items-center justify-between mt-4 text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
                <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-medium">{inc.status}</span>
                <span className="font-mono">{inc.createdAt}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Incident Detail Pane */}
        {selectedIncident ? (
          <div className="lg:col-span-2 glass-card rounded-xl p-6 border border-slate-800 space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-brand-400">{selectedIncident.id}</span>
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                    {selectedIncident.severity}
                  </span>
                  <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300">
                    {selectedIncident.category}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mt-2">{selectedIncident.title}</h3>
              </div>

              {/* Status Updater */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Status:</span>
                <select
                  value={selectedIncident.status}
                  onChange={(e) => {
                    const updated = { ...selectedIncident, status: e.target.value as IncidentStatus };
                    setSelectedIncident(updated);
                    setIncidents(incidents.map(i => i.id === updated.id ? updated : i));
                  }}
                  className="py-1.5 px-3 rounded-lg bg-slate-900 border border-brand-500/40 text-xs text-brand-300 font-medium focus:outline-none"
                >
                  <option value="New">New</option>
                  <option value="Investigating">Investigating</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            {/* Description & Timeline */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
              <p className="text-sm text-slate-200 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 leading-relaxed">
                {selectedIncident.description}
              </p>
            </div>

            {/* Meta Attributes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                <span className="text-slate-400 block mb-1">Reported By</span>
                <span className="font-medium text-slate-200 flex items-center gap-1.5">
                  <UserIcon className="w-3.5 h-3.5 text-brand-400" /> {selectedIncident.reportedBy}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                <span className="text-slate-400 block mb-1">Assigned Analyst</span>
                <span className="font-medium text-slate-200">
                  {selectedIncident.assignedAnalyst || 'Unassigned'}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                <span className="text-slate-400 block mb-1">Evidence Artifacts</span>
                <span className="font-medium text-slate-200 flex items-center gap-1.5">
                  <Paperclip className="w-3.5 h-3.5 text-brand-400" /> {selectedIncident.evidenceCount} Files attached
                </span>
              </div>
            </div>

            {/* Investigation Timeline */}
            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Investigation Timeline</h4>
              <div className="space-y-3 relative pl-4 border-l-2 border-slate-800">
                <div className="relative">
                  <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-brand-500 ring-4 ring-slate-900"></div>
                  <p className="text-xs text-slate-400 font-mono">11:00:15 AM</p>
                  <p className="text-sm font-medium text-slate-200 mt-0.5">Assigned to Lead Analyst Alex Mercer</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-700 ring-4 ring-slate-900"></div>
                  <p className="text-xs text-slate-400 font-mono">10:14:02 AM</p>
                  <p className="text-sm font-medium text-slate-200 mt-0.5">Automated EDR Alert triggered & Incident Created</p>
                </div>
              </div>
            </div>

            {/* Quick Note Input */}
            <div className="pt-4 border-t border-slate-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add investigation note or IOC hash..."
                  className="flex-1 py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
                />
                <button className="py-2 px-4 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-medium text-xs flex items-center gap-1">
                  <Send className="w-3.5 h-3.5" /> Post
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 glass-card rounded-xl p-12 border border-slate-800 text-center text-slate-500">
            Select an incident to review details
          </div>
        )}
      </div>

      {/* Modal: Report New Incident */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg glass-card rounded-2xl p-6 border border-slate-800 shadow-2xl relative">
            <button
              onClick={() => setShowCreateModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">Report New Security Incident</h3>

            <form onSubmit={handleCreateIncident} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Incident Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  placeholder="e.g., Rogue Access Point Detected in East Wing"
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Severity</label>
                  <select
                    value={newSeverity}
                    onChange={(e) => setNewSeverity(e.target.value as IncidentSeverity)}
                    className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none"
                  >
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none"
                  >
                    <option value="Malware Execution">Malware Execution</option>
                    <option value="Social Engineering">Social Engineering</option>
                    <option value="Network Anomaly">Network Anomaly</option>
                    <option value="Unauthorized Access">Unauthorized Access</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Description & Evidence Details</label>
                <textarea
                  rows={4}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  required
                  placeholder="Describe observed suspicious activity..."
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="py-2 px-4 rounded-lg bg-slate-800 text-slate-300 font-medium text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-medium text-xs shadow-md shadow-brand-500/20"
                >
                  Submit Incident Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

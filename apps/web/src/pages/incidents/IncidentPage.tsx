import React, { useState, useEffect } from 'react';
import {
  AlertTriangle, Plus, Search, Filter, User as UserIcon,
  Paperclip, Send, X, Loader2
} from 'lucide-react';
import { Incident, IncidentSeverity, IncidentStatus, User } from '../../types';
import { incidentService } from '../../services/incidentService';

interface IncidentPageProps {
  currentUser: User;
}

export const IncidentPage: React.FC<IncidentPageProps> = ({ currentUser }) => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('All');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newSeverity, setNewSeverity] = useState<IncidentSeverity>('High');
  const [newCategory, setNewCategory] = useState('Malware Execution');

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await incidentService.getAll();
        setIncidents(data);
        if (data.length > 0) setSelectedIncident(data[0]);
      } catch {
        // API error - keep empty state, will retry on next interaction
        // Do not fallback to mock incidents - show loading/error state naturally
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const handleCreateIncident = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const created = await incidentService.create({
        title: newTitle,
        description: newDesc,
        severity: newSeverity,
        category: newCategory,
      });
      setIncidents([created, ...incidents]);
      setSelectedIncident(created);
    } catch {
      // Optimistic local fallback
      const local: Incident = {
        id: `INC-${Date.now()}`,
        title: newTitle, description: newDesc, severity: newSeverity,
        category: newCategory, status: 'New', reportedBy: currentUser.name,
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), evidenceCount: 0
      };
      setIncidents([local, ...incidents]);
      setSelectedIncident(local);
    } finally {
      setSubmitting(false);
      setShowCreateModal(false);
      setNewTitle(''); setNewDesc('');
    }
  };

  const handleStatusUpdate = async (inc: Incident, status: IncidentStatus) => {
    try {
      const updated = await incidentService.updateStatus(inc.id, { status });
      setIncidents(incidents.map(i => i.id === updated.id ? updated : i));
      setSelectedIncident(updated);
    } catch {
      const updated = { ...inc, status };
      setIncidents(incidents.map(i => i.id === inc.id ? updated : i));
      setSelectedIncident(updated);
    }
  };

  const filtered = incidents.filter(inc => {
    const q = inc.title.toLowerCase().includes(searchQuery.toLowerCase()) || inc.id.toLowerCase().includes(searchQuery.toLowerCase());
    const s = selectedSeverity === 'All' || inc.severity === selectedSeverity;
    return q && s;
  });

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-slate-400 gap-3">
      <Loader2 className="w-6 h-6 animate-spin text-brand-500" /><span>Loading incidents...</span>
    </div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Incident Operations Hub</h2>
          <p className="text-slate-400 text-sm">Investigate, track, and remediate cybersecurity threats.</p>
        </div>
        <button onClick={() => setShowCreateModal(true)}
          className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-medium text-sm shadow-lg shadow-brand-500/20 flex items-center gap-2 transition-all">
          <Plus className="w-4 h-4" /> Report New Incident
        </button>
      </div>

      <div className="glass-card p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search incidents..." className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-brand-500" />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select value={selectedSeverity} onChange={(e) => setSelectedSeverity(e.target.value)}
            className="py-1.5 px-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-200 focus:outline-none">
            {['All', 'Critical', 'High', 'Medium', 'Low'].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-3">
          {filtered.map((inc) => (
            <div key={inc.id} onClick={() => setSelectedIncident(inc)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                selectedIncident?.id === inc.id ? 'bg-slate-900/90 border-brand-500 shadow-md shadow-brand-500/10' : 'glass-card border-slate-800 hover:border-slate-700'
              }`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-xs font-semibold text-slate-400">{inc.id}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  inc.severity === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : inc.severity === 'High' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}>{inc.severity}</span>
              </div>
              <h4 className="font-semibold text-white text-sm leading-snug">{inc.title}</h4>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{inc.description}</p>
              <div className="flex items-center justify-between mt-3 text-[11px] text-slate-500 pt-2 border-t border-slate-800/80">
                <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-medium">{inc.status}</span>
                <span className="font-mono">{new Date(inc.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>

        {selectedIncident ? (
          <div className="lg:col-span-2 glass-card rounded-xl p-6 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-brand-400">{selectedIncident.id}</span>
                  <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30">{selectedIncident.severity}</span>
                  <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300">{selectedIncident.category}</span>
                </div>
                <h3 className="text-xl font-bold text-white mt-2">{selectedIncident.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Status:</span>
                <select value={selectedIncident.status}
                  onChange={(e) => handleStatusUpdate(selectedIncident, e.target.value as IncidentStatus)}
                  className="py-1.5 px-3 rounded-lg bg-slate-900 border border-brand-500/40 text-xs text-brand-300 font-medium focus:outline-none">
                  {['New', 'Investigating', 'In Progress', 'Resolved', 'Closed'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Description</h4>
              <p className="text-sm text-slate-200 bg-slate-900/60 p-4 rounded-xl border border-slate-800/80 leading-relaxed">{selectedIncident.description}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                <span className="text-slate-400 block mb-1">Reported By</span>
                <span className="font-medium text-slate-200 flex items-center gap-1.5"><UserIcon className="w-3.5 h-3.5 text-brand-400" /> {selectedIncident.reportedBy}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                <span className="text-slate-400 block mb-1">Assigned Analyst</span>
                <span className="font-medium text-slate-200">{selectedIncident.assignedAnalyst || 'Unassigned'}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800">
                <span className="text-slate-400 block mb-1">Evidence Files</span>
                <span className="font-medium text-slate-200 flex items-center gap-1.5"><Paperclip className="w-3.5 h-3.5 text-brand-400" /> {selectedIncident.evidenceCount ?? 0} attached</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <div className="flex gap-2">
                <input type="text" placeholder="Add investigation note or IOC hash..."
                  className="flex-1 py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-brand-500" />
                <button className="py-2 px-4 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-medium text-xs flex items-center gap-1">
                  <Send className="w-3.5 h-3.5" /> Post
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="lg:col-span-2 glass-card rounded-xl p-12 border border-slate-800 text-center text-slate-500">Select an incident</div>
        )}
      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg glass-card rounded-2xl p-6 border border-slate-800 shadow-2xl relative">
            <button onClick={() => setShowCreateModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            <h3 className="text-lg font-bold text-white mb-4">Report New Security Incident</h3>
            <form onSubmit={handleCreateIncident} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Incident Title</label>
                <input type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} required
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-brand-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Severity</label>
                  <select value={newSeverity} onChange={(e) => setNewSeverity(e.target.value as IncidentSeverity)}
                    className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none">
                    {['Critical', 'High', 'Medium', 'Low'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                  <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none">
                    {['Malware Execution', 'Social Engineering', 'Network Anomaly', 'Unauthorized Access'].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Description</label>
                <textarea rows={4} value={newDesc} onChange={(e) => setNewDesc(e.target.value)} required
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-brand-500" />
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowCreateModal(false)}
                  className="py-2 px-4 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700">Cancel</button>
                <button type="submit" disabled={submitting}
                  className="py-2 px-4 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs flex items-center gap-2 disabled:opacity-60">
                  {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Submit Incident
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};



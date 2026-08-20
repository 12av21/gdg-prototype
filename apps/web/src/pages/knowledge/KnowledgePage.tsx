import React, { useState } from 'react';
import { 
  BookOpen, 
  Upload, 
  Search, 
  FileText, 
  Download, 
  Tag, 
  Sparkles, 
  CheckCircle2,
  Trash2,
  X
} from 'lucide-react';
import { DocumentItem } from '../../types';

export const KnowledgePage: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // New Doc Form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('SOP');
  const [tags, setTags] = useState('RAG, Security');

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc: DocumentItem = {
      id: `DOC-0${documents.length + 1}`,
      title,
      category,
      fileType: 'PDF',
      fileSize: '1.2 MB',
      uploadedBy: 'Current User',
      uploadedAt: new Date().toISOString().split('T')[0],
      tags: tags.split(',').map(t => t.trim())
    };
    setDocuments([newDoc, ...documents]);
    setShowUploadModal(false);
    setTitle('');
  };

  const filtered = documents.filter(doc => {
    const matchSearch = doc.title.toLowerCase().includes(search.toLowerCase()) || 
                        doc.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = selectedCategory === 'All' || doc.category === selectedCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Cybersecurity Knowledge Base</h2>
          <p className="text-slate-400 text-sm">Indexed security policies, advisories, and frameworks for Gemini RAG Context retrieval.</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-medium text-sm shadow-lg shadow-brand-500/20 flex items-center gap-2 transition-all"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document to RAG Vector DB</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="glass-card p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents, tags, SOPs..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-brand-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-medium">Category:</span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="py-1.5 px-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-200 focus:outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Frameworks">Frameworks</option>
            <option value="Threat Intel">Threat Intel</option>
            <option value="SOP">SOP</option>
            <option value="Advisories">Advisories</option>
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((doc) => (
          <div key={doc.id} className="glass-card p-5 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/20 text-brand-400 border border-brand-500/30">
                    {doc.fileType}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{doc.category}</span>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Sparkles className="w-3 h-3" /> pgvector Embeddings Ready
                </span>
              </div>

              <h3 className="font-semibold text-white text-base leading-snug">{doc.title}</h3>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {doc.tags.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 flex items-center gap-1">
                    <Tag className="w-2.5 h-2.5 text-slate-400" /> {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-800/80">
              <span className="font-mono">{doc.fileSize} • Uploaded {doc.uploadedAt}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Downloading ${doc.title}`)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Download File"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setDocuments(documents.filter(d => d.id !== doc.id))}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-500/20 hover:text-red-400 text-slate-400 transition-colors"
                  title="Remove Document"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Upload Document */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md glass-card rounded-2xl p-6 border border-slate-800 shadow-2xl relative">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-white mb-4">Upload Document to Knowledge Vector DB</h3>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Document Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="e.g., ISO 27001 Security Control Matrix"
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none"
                >
                  <option value="Frameworks">Frameworks</option>
                  <option value="Threat Intel">Threat Intel</option>
                  <option value="SOP">SOP</option>
                  <option value="Advisories">Advisories</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Tags (Comma-separated)</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="ISO, Compliance, Controls"
                  className="w-full py-2 px-3 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="border-2 border-dashed border-slate-800 rounded-xl p-6 text-center bg-slate-900/40">
                <Upload className="w-8 h-8 text-brand-400 mx-auto mb-2" />
                <p className="text-xs text-slate-300 font-medium">Click or drag PDF, DOCX, TXT to upload</p>
                <p className="text-[10px] text-slate-500 mt-1">Automatic chunking & 1536-dim vector embedding generation</p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="py-2 px-4 rounded-lg bg-slate-800 text-slate-300 font-medium text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 rounded-lg bg-brand-600 hover:bg-brand-500 text-white font-medium text-xs shadow-md shadow-brand-500/20"
                >
                  Upload & Index
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

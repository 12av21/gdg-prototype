import React from 'react';
import {
  ShieldAlert, Bot, AlertTriangle, BookOpen, BarChart3,
  ArrowRight, ChevronRight, Shield, Zap, Lock, Globe,
  CheckCircle2, Star, Github, ExternalLink
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 overflow-x-hidden">

      {/* ─── Navbar ──────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 text-white shadow-lg shadow-brand-500/20">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="font-bold text-white tracking-tight text-lg">SCIP</span>
              <span className="hidden sm:inline text-slate-400 text-sm ml-2">Smart Cybersecurity Intelligence Platform</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            {['Features', 'Architecture', 'Tech Stack', 'Docs'].map((item) => (
              <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="hover:text-white transition-colors">{item}</a>
            ))}
          </nav>

          <button
            onClick={onGetStarted}
            className="flex items-center gap-2 py-2 px-4 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-medium text-sm shadow-lg shadow-brand-500/20 transition-all"
          >
            <span>Launch SCIP</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ─── Hero ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 px-6">
        {/* Background glow effects */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-900/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-mono font-semibold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            MCA Final-Year Project 2026 · AI-Powered Security Platform
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-none">
            <span className="text-white">Smart Cybersecurity</span>
            <br />
            <span className="bg-gradient-to-r from-brand-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Intelligence Platform
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            AI-powered security incident management, RAG-driven knowledge retrieval, and real-time threat intelligence — built on <strong className="text-slate-200">ASP.NET Core</strong>, <strong className="text-slate-200">React</strong>, <strong className="text-slate-200">PostgreSQL pgvector</strong>, and <strong className="text-slate-200">Google Gemini</strong>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onGetStarted}
              className="group flex items-center gap-3 py-4 px-8 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold text-base shadow-2xl shadow-brand-500/25 transition-all hover:scale-105"
            >
              <ShieldAlert className="w-5 h-5" />
              <span>Launch Platform</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-4 px-8 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-slate-600 text-slate-300 font-semibold text-base transition-all hover:scale-105"
            >
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
            </a>
          </div>

          {/* Stats Strip */}
          <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { label: 'Incidents Managed', value: '1,200+' },
              { label: 'RAG AI Queries', value: '15K+' },
              { label: 'Indexed Documents', value: '500+' },
              { label: 'Threat CVEs Tracked', value: '3,400+' },
            ].map(({ label, value }) => (
              <div key={label} className="glass-card p-4 rounded-xl border border-slate-800 text-center">
                <p className="text-2xl font-extrabold text-white">{value}</p>
                <p className="text-xs text-slate-400 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Features ─────────────────────────────────────────────── */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono font-semibold text-brand-400 uppercase tracking-widest">Core Modules</span>
            <h2 className="text-4xl font-bold text-white mt-3">Everything a SOC needs</h2>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto">From incident triage to AI-assisted remediation — SCIP unifies your entire security operation in one platform.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Bot,
                color: 'from-brand-600 to-indigo-600',
                glow: 'brand',
                title: 'AI Security Copilot ⭐',
                badge: 'Hero Feature',
                desc: 'Retrieval-Augmented Generation (RAG) using Google Gemini + pgvector HNSW index. Ask questions about NIST SP 800-61, MITRE ATT&CK, and your own internal SOPs.',
                bullets: ['Context-aware RAG responses', 'Source document citations', 'Investigation checklists']
              },
              {
                icon: AlertTriangle,
                color: 'from-red-600 to-orange-600',
                glow: 'red',
                title: 'Incident Management',
                badge: 'P0 Required',
                desc: 'Full security incident lifecycle — create, assign, triage, investigate, and resolve threats with severity classification and evidence tracking.',
                bullets: ['Critical/High/Medium/Low severity', 'Analyst assignment & status workflow', 'Investigation timeline']
              },
              {
                icon: BookOpen,
                color: 'from-emerald-600 to-teal-600',
                glow: 'emerald',
                title: 'Knowledge Base',
                badge: 'Vector Indexed',
                desc: 'Upload security frameworks and SOPs. Documents are automatically chunked and embedded as 1536-dimension vectors for semantic search.',
                bullets: ['PDF, DOCX, TXT, Markdown', 'Automatic pgvector indexing', 'HNSW cosine similarity search']
              },
              {
                icon: Lock,
                color: 'from-purple-600 to-violet-600',
                glow: 'purple',
                title: 'Auth & RBAC',
                badge: 'JWT Secured',
                desc: 'JWT Bearer token authentication with role-based access control. BCrypt password hashing with Admin, Analyst, and Employee permission scopes.',
                bullets: ['HMAC-SHA256 JWT tokens', 'BCrypt password hashing', 'Admin / Analyst / Employee roles']
              },
              {
                icon: BarChart3,
                color: 'from-amber-500 to-orange-500',
                glow: 'amber',
                title: 'Analytics & Reports',
                badge: 'Executive View',
                desc: 'Real-time MTTR telemetry, incident category breakdowns, and AI usage metrics — all exportable as PDF or CSV.',
                bullets: ['MTTR performance tracking', 'Attack vector breakdown', 'PDF & CSV export']
              },
              {
                icon: Shield,
                color: 'from-cyan-600 to-blue-600',
                glow: 'cyan',
                title: 'Threat Intelligence',
                badge: 'Phase 2',
                desc: 'CVE records, IOC library, MITRE ATT&CK browser, and malware signature database — coming in the next major release.',
                bullets: ['CVE database integration', 'IOC tracking & tagging', 'MITRE ATT&CK mapping']
              },
            ].map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-brand-500/30 transition-all group space-y-4">
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold font-mono text-slate-400 bg-slate-800/80 border border-slate-700 px-2 py-1 rounded-full uppercase tracking-wider">
                      {feature.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-white text-lg">{feature.title}</h3>
                    <p className="text-slate-400 text-sm mt-2 leading-relaxed">{feature.desc}</p>
                  </div>

                  <ul className="space-y-1.5">
                    {feature.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Architecture ─────────────────────────────────────────────── */}
      <section id="architecture" className="py-24 px-6 bg-slate-900/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono font-semibold text-brand-400 uppercase tracking-widest">System Design</span>
            <h2 className="text-4xl font-bold text-white mt-3">Clean Architecture & RAG Pipeline</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                label: 'React Frontend (Vercel)',
                items: ['React 18 + TypeScript', 'Vite + Tailwind CSS', 'Axios service layer', 'AuthContext + useAuth()', 'Role-based UI guards']
              },
              {
                label: 'ASP.NET Core API (Render)',
                items: ['Clean Architecture (SOLID)', 'Controllers → Services → Repos', 'JWT Bearer authentication', 'EF Core + pgvector', 'Swagger / OpenAPI docs']
              },
              {
                label: 'PostgreSQL + pgvector (Supabase)',
                items: ['1536-dim vector columns', 'HNSW cosine index', 'Users, Incidents, Documents', 'Semantic similarity search', 'Full RAG retrieval pipeline']
              }
            ].map((tier) => (
              <div key={tier.label} className="glass-card p-6 rounded-2xl border border-brand-500/20">
                <h3 className="font-bold text-brand-300 text-sm font-mono mb-4 pb-3 border-b border-slate-800">
                  {tier.label}
                </h3>
                <ul className="space-y-2">
                  {tier.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* RAG Flow Diagram */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800">
            <h3 className="text-sm font-mono font-semibold text-slate-400 mb-4">RAG Retrieval Flow</h3>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono">
              {[
                '📄 Upload Document',
                '✂️ Chunk (500 words)',
                '🧠 Gemini Embed (1536d)',
                '🗄️ pgvector Store',
                '❓ User Query',
                '🔍 HNSW Cosine Search',
                '📋 Context Retrieved',
                '🤖 Gemini Generate',
                '💬 Cited Response'
              ].map((step, i, arr) => (
                <React.Fragment key={step}>
                  <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">{step}</span>
                  {i < arr.length - 1 && <ChevronRight className="w-4 h-4 text-brand-500" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Tech Stack ───────────────────────────────────────────────── */}
      <section id="tech-stack" className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs font-mono font-semibold text-brand-400 uppercase tracking-widest">Technology Stack</span>
          <h2 className="text-4xl font-bold text-white mt-3 mb-12">Built with enterprise-grade tools</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              { name: 'React 18', role: 'Frontend UI', color: 'text-cyan-400' },
              { name: 'TypeScript', role: 'Type Safety', color: 'text-blue-400' },
              { name: 'Tailwind CSS', role: 'Styling', color: 'text-teal-400' },
              { name: 'Vite', role: 'Build Tool', color: 'text-purple-400' },
              { name: 'ASP.NET Core 8', role: 'REST API', color: 'text-brand-400' },
              { name: 'EF Core 8', role: 'ORM', color: 'text-indigo-400' },
              { name: 'PostgreSQL 16', role: 'Database', color: 'text-blue-300' },
              { name: 'pgvector', role: 'Vector Search', color: 'text-emerald-400' },
              { name: 'Google Gemini', role: 'LLM + Embeddings', color: 'text-yellow-400' },
              { name: 'JWT Bearer', role: 'Auth', color: 'text-rose-400' },
              { name: 'BCrypt', role: 'Password Hashing', color: 'text-orange-400' },
              { name: 'Docker', role: 'Containerization', color: 'text-sky-400' },
            ].map(({ name, role, color }) => (
              <div key={name} className="glass-card p-4 rounded-xl border border-slate-800 hover:border-brand-500/30 transition-all text-center">
                <p className={`font-bold text-sm ${color}`}>{name}</p>
                <p className="text-xs text-slate-500 mt-1">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex p-4 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white shadow-xl shadow-brand-500/20 mb-4">
            <ShieldAlert className="w-10 h-10" />
          </div>
          <h2 className="text-4xl font-bold text-white">Ready to secure your organization?</h2>
          <p className="text-slate-400 text-lg">Access the full SCIP dashboard — incident management, AI Copilot, and threat intelligence, all in one place.</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onGetStarted}
              className="group flex items-center gap-3 py-4 px-10 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-semibold text-lg shadow-2xl shadow-brand-500/25 transition-all hover:scale-105"
            >
              <span>Enter SCIP Platform</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <p className="text-xs text-slate-500 pt-2">Demo credentials pre-filled · No setup required · Free tier deployment</p>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-slate-800 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-lg bg-brand-600 text-white">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <span className="font-bold text-white">SCIP</span>
            <span className="text-slate-500 text-sm">v1.0 · MCA Final-Year Project 2026</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>Built with React · ASP.NET Core · Gemini · pgvector</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

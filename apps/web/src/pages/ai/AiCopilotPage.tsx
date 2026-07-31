import React, { useState, useEffect } from 'react';
import {
  Bot, Send, Sparkles, BookOpen, Copy, RotateCcw, Check, Loader2
} from 'lucide-react';
import { ChatMessage } from '../../types';
import { aiService } from '../../services/aiService';

export const AiCopilotPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-0',
      sender: 'ai',
      text: "Hello! I'm your SCIP Security Copilot powered by Google Gemini & pgvector RAG. Ask me about incident triage, CVE analysis, NIST controls, or security policy queries.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        "How do I isolate an endpoint infected with ransomware?",
        "Summarize NIST SP 800-61 Rev 2 incident handling phases",
        "Generate investigation checklist for suspicious PowerShell",
        "What are steps for handling a phishing campaign?",
      ],
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isGenerating) return;

    const userMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsGenerating(true);

    try {
      const result = await aiService.chat({ prompt: query });
      const aiMsg: ChatMessage = {
        id: `m-${Date.now() + 1}`,
        sender: 'ai',
        text: result.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: result.sources,
        suggestedActions: result.suggestedActions,
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      const errMsg: ChatMessage = {
        id: `m-err-${Date.now()}`,
        sender: 'ai',
        text: '⚠️ Could not reach the SCIP API. Please ensure the backend is running on http://localhost:5000.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col glass-card rounded-2xl border border-slate-800 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              AI Security Copilot ⭐
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-brand-500/20 text-brand-400 border border-brand-500/30">
                Gemini + pgvector RAG
              </span>
            </h3>
            <p className="text-xs text-slate-400">Context-aware cybersecurity assistant</p>
          </div>
        </div>
        <button onClick={() => setMessages([messages[0]])}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs flex items-center gap-1.5">
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
      </div>

      {/* Message Stream */}
      <div className="flex-1 p-4 lg:p-6 overflow-y-auto space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 max-w-4xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
              msg.sender === 'user' ? 'bg-brand-600 text-white' : 'bg-gradient-to-tr from-brand-700 to-indigo-600 text-white'
            }`}>
              {msg.sender === 'user' ? 'U' : <Bot className="w-5 h-5" />}
            </div>

            <div className={`space-y-3 ${msg.sender === 'user' ? 'text-right' : ''}`}>
              <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-brand-600 text-white rounded-tr-none'
                  : 'bg-slate-900/90 text-slate-100 border border-slate-800 rounded-tl-none'
              }`}>
                <div className="whitespace-pre-wrap">{msg.text}</div>
                {msg.sources && msg.sources.length > 0 && (
                  <div className="pt-3 mt-3 border-t border-slate-800/80 text-xs">
                    <span className="font-semibold text-brand-400 flex items-center gap-1 mb-1.5">
                      <BookOpen className="w-3.5 h-3.5" /> Retrieved RAG Sources:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.sources.map((src, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60 font-mono text-[11px]">{src}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className={`flex items-center gap-3 text-xs text-slate-500 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                <span>{msg.timestamp}</span>
                {msg.sender === 'ai' && (
                  <button onClick={() => handleCopy(msg.id, msg.text)} className="hover:text-slate-300 flex items-center gap-1">
                    {copiedId === msg.id
                      ? <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copied</>
                      : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                  </button>
                )}
              </div>

              {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Suggested Questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {msg.suggestedActions.map((prompt, pIdx) => (
                      <button key={pIdx} onClick={() => handleSend(prompt)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-brand-500/40 text-xs text-brand-300 hover:text-brand-200 transition-all text-left">
                        💡 {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isGenerating && (
          <div className="flex gap-3 max-w-xl">
            <div className="w-9 h-9 rounded-xl bg-slate-800 text-brand-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-brand-500" />
              Querying pgvector & Gemini AI context...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-slate-900/90 border-t border-slate-800">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask about ransomware containment, NIST controls, CVE remediation..."
            className="flex-1 pl-4 pr-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
          <button type="submit" disabled={!inputQuery.trim() || isGenerating}
            className="py-3 px-5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 disabled:opacity-50 text-white font-medium shadow-lg flex items-center gap-2 transition-all">
            <span>Ask AI</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

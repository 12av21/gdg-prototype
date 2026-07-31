import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  BookOpen, 
  Copy, 
  RotateCcw, 
  ShieldAlert, 
  Check, 
  HelpCircle, 
  Terminal,
  FileSearch,
  CheckSquare
} from 'lucide-react';
import { ChatMessage } from '../../types';

export const AiCopilotPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: "Hello Analyst! I am your SCIP Security Copilot powered by Google Gemini & pgvector RAG intelligence. How can I assist you with incident triage, CVE analysis, or security policy queries today?",
      timestamp: '10:00 AM',
      suggestedActions: [
        "How do I isolate an endpoint infected with ransomware?",
        "Summarize NIST SP 800-61 Rev 2 incident handling phases",
        "Generate incident investigation checklist for suspicious PowerShell",
        "What are the remediation steps for CVE-2026-1049?"
      ]
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isGenerating) return;

    const userMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputQuery('');
    setIsGenerating(true);

    // Simulate RAG + Gemini API Execution
    setTimeout(() => {
      let aiResponseText = "";
      let sources: string[] = [];
      let actions: string[] = [];

      if (query.toLowerCase().includes('ransomware') || query.toLowerCase().includes('isolate')) {
        aiResponseText = `### Ransomware Containment & Endpoint Isolation Protocol

Based on **NIST SP 800-61 Rev 2** and indexed internal SOPs:

1. **Immediate Containment**:
   - Disconnect target endpoint (\`Endpoint-WS-402\`) from physical LAN and disable Wi-Fi interface.
   - Do **NOT** power off or reboot the system (preserve volatile memory/RAM state for forensic acquisition).
   
2. **Network Perimeter Enforcement**:
   - Block identified Command & Control (C2) IP addresses: \`185.220.101.45\` and \`45.144.225.18\`.
   
3. **Forensic Evidence Collection**:
   - Dump memory with \`FTK Imager CLI\` or \`DumpIt\`.
   - Export Windows Event Logs (\`Security.evtx\` & \`Microsoft-Windows-PowerShell/Operational.evtx\`).`;
        sources = ["NIST SP 800-61 Rev 2 (Sec 3.3 Containment)", "Internal Incident Response Escalation SOP"];
        actions = ["Generate Incident Report", "Block C2 IPs in Firewall", "Schedule Forensics Review"];
      } else if (query.toLowerCase().includes('nist') || query.toLowerCase().includes('summarize')) {
        aiResponseText = `### Summary of NIST SP 800-61 Rev 2 Incident Handling Cycle

1. **Preparation**: Establish incident response capability, tools, infrastructure, and training.
2. **Detection & Analysis**: Real-time telemetry monitoring, automated alerts, and triage analysis.
3. **Containment, Eradication, & Recovery**:
   - **Containment**: Prevent malware propagation.
   - **Eradication**: Eliminate malicious components and patch vulnerabilities.
   - **Recovery**: Restore systems to clean operation and monitor for residual threats.
4. **Post-Incident Activity**: Document lessons learned and update security controls.`;
        sources = ["NIST SP 800-61 Rev 2 (Computer Security Incident Handling Guide)"];
      } else if (query.toLowerCase().includes('powershell') || query.toLowerCase().includes('checklist')) {
        aiResponseText = `### Investigation Checklist for Suspicious PowerShell Execution

- [x] Extract decoded script block from Event ID 4104 (ScriptBlock Logging)
- [ ] Inspect parent process lineage (\`svchost.exe\` vs \`cmd.exe\`)
- [ ] Check network socket connections initiated by \`powershell.exe\`
- [ ] Query Virustotal / IOC database for extracted payload hashes
- [ ] Review persistent scheduled tasks and registry run keys (\`HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Run\`)`;
        sources = ["MITRE ATT&CK T1059.001 (Command and Scripting Interpreter: PowerShell)", "OWASP API Security 2026"];
      } else {
        aiResponseText = `### RAG Security Guidance

I retrieved relevant context from your organization's vector database:

- **Analysis**: The query touches upon active cybersecurity risk vectors. Recommended remediation includes enforcing Multi-Factor Authentication (MFA), monitoring outbound TLS anomalies, and verifying least-privilege RBAC permissions across API controllers.
- **Action**: Check active security incidents in SCIP Dashboard for corresponding alert telemetry.`;
        sources = ["Internal Cybersecurity Policy v2.4", "MITRE ATT&CK Enterprise Matrix v14"];
      }

      const aiMsg: ChatMessage = {
        id: `m-${Date.now() + 1}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources,
        suggestedActions: actions
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsGenerating(false);
    }, 1200);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col glass-card rounded-2xl border border-slate-800 overflow-hidden">
      {/* Header Bar */}
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
            <p className="text-xs text-slate-400">Context-aware cybersecurity incident assistant & policy search</p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-xs flex items-center gap-1.5"
          title="Clear Conversation"
        >
          <RotateCcw className="w-4 h-4" /> Reset Chat
        </button>
      </div>

      {/* Message Stream */}
      <div className="flex-1 p-4 lg:p-6 overflow-y-auto space-y-6">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-4xl ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'bg-gradient-to-tr from-brand-700 to-indigo-600 text-white shadow-md'
              }`}
            >
              {msg.sender === 'user' ? 'U' : <Bot className="w-5 h-5" />}
            </div>

            <div className={`space-y-3 ${msg.sender === 'user' ? 'text-right' : ''}`}>
              <div
                className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-brand-600 text-white rounded-tr-none'
                    : 'bg-slate-900/90 text-slate-100 border border-slate-800 rounded-tl-none space-y-2'
                }`}
              >
                <div className="whitespace-pre-wrap font-sans">{msg.text}</div>

                {/* Sources & Citations if AI */}
                {msg.sources && msg.sources.length > 0 && (
                  <div className="pt-3 mt-3 border-t border-slate-800/80 text-xs text-left">
                    <span className="font-semibold text-brand-400 flex items-center gap-1 mb-1.5">
                      <BookOpen className="w-3.5 h-3.5" /> Retrieved RAG Sources:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.sources.map((src, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60 font-mono text-[11px]">
                          {src}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions & Copy Bar */}
              <div className={`flex items-center gap-3 text-xs text-slate-500 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                <span>{msg.timestamp}</span>
                {msg.sender === 'ai' && (
                  <button
                    onClick={() => handleCopy(msg.id, msg.text)}
                    className="hover:text-slate-300 flex items-center gap-1 transition-colors"
                  >
                    {copiedId === msg.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Suggested Next Prompt Buttons */}
              {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">Suggested Questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {msg.suggestedActions.map((prompt, pIdx) => (
                      <button
                        key={pIdx}
                        onClick={() => handleSend(prompt)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-brand-500/40 text-xs text-brand-300 hover:text-brand-200 transition-all text-left"
                      >
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
            <div className="w-9 h-9 rounded-xl bg-slate-800 text-brand-400 flex items-center justify-center animate-pulse">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping"></span>
              Querying pgvector & retrieving Gemini cybersecurity context...
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <div className="p-4 bg-slate-900/90 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask SCIP Copilot (e.g., 'How to mitigate CVE-2026-1049', 'Incident containment steps')..."
              className="w-full pl-4 pr-10 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={!inputQuery.trim() || isGenerating}
            className="py-3 px-5 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 disabled:opacity-50 text-white font-medium shadow-lg shadow-brand-500/20 flex items-center gap-2 transition-all"
          >
            <span>Ask AI</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};

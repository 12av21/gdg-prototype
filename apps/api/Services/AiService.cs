using SCIP.Api.DTOs;

namespace SCIP.Api.Services
{
    public interface IAiService
    {
        AiChatResponseDto Chat(AiChatRequestDto request);
    }

    public class AiService : IAiService
    {
        private static readonly Dictionary<string, (string Response, string[] Sources, string[] Actions)> KnowledgeMap = new()
        {
            ["ransomware"] = (
                """
                ### Ransomware Containment Protocol (NIST SP 800-61 Rev 2, Sec 3.3)

                1. **Immediate Containment**: Disconnect the affected endpoint from the network.
                   - Do NOT power off (preserve volatile forensic state).
                2. **Block C2 Communications**: Null-route identified C2 IPs at perimeter firewall.
                3. **Forensic Acquisition**: Dump RAM with FTK Imager CLI. Export `Security.evtx` and `PowerShell/Operational.evtx`.
                4. **Eradication**: Restore from last known clean backup after full disk wipe.
                5. **Post-Incident**: Update signatures, patch exploited CVE, archive timeline.
                """,
                new[] { "NIST SP 800-61 Rev 2 (Sec 3.3 Containment)", "Internal Ransomware Response SOP v2.1" },
                new[] { "Isolate Endpoint", "Block C2 IPs in Firewall", "Initiate Memory Forensics" }
            ),
            ["phishing"] = (
                """
                ### Phishing Incident Handling Checklist

                - [x] Quarantine reported phishing emails in mail gateway.
                - [x] Reset credentials of users who opened attachment.
                - [ ] Block sender domain and IP in email security gateway.
                - [ ] Submit attachment hash to Virustotal and internal sandbox.
                - [ ] Review sign-in logs for any suspicious OAuth grant activities.
                """,
                new[] { "MITRE ATT&CK T1566 (Phishing)", "NIST SP 800-61 Rev 2" },
                new[] { "Block Phishing Domain", "Reset Exposed Credentials", "Submit IOC Hash" }
            ),
            ["nist"] = (
                """
                ### NIST SP 800-61 Rev 2 – Incident Handling Lifecycle

                1. **Preparation** – IR team, tools, playbooks, and communication channels.
                2. **Detection & Analysis** – Alert triage, severity assignment, and scope determination.
                3. **Containment** – Short-term isolation & long-term containment strategy.
                4. **Eradication** – Remove threat artifacts, close exploit vectors.
                5. **Recovery** – Restore systems cautiously with enhanced monitoring.
                6. **Post-Incident Activity** – Lessons-learned review and playbook updates.
                """,
                new[] { "NIST SP 800-61 Rev 2 (Computer Security Incident Handling Guide)" },
                new[] { "Download Full NIST Guide", "Generate Checklist for Active Incident" }
            ),
            ["powershell"] = (
                """
                ### Suspicious PowerShell – Investigation Steps

                1. **Retrieve ScriptBlock**: Check Windows Event ID `4104` (PowerShell/Operational.evtx).
                2. **Decode Payload**: Use `[System.Text.Encoding]::Unicode.GetString([Convert]::FromBase64String('<base64>'))`.
                3. **Examine Parent Process**: Confirm if `svchost.exe` or `cmd.exe` spawned PowerShell (MITRE T1059.001).
                4. **Network Connections**: Run `netstat -anob | findstr powershell` on affected host.
                5. **Persistence Check**: Query scheduled tasks & `HKCU\SOFTWARE\Microsoft\Windows\CurrentVersion\Run`.
                """,
                new[] { "MITRE ATT&CK T1059.001 (PowerShell)", "NIST SP 800-61 Rev 2" },
                new[] { "Capture Memory Dump", "Extract IOC Hashes", "Escalate to Critical Incident" }
            )
        };

        public AiChatResponseDto Chat(AiChatRequestDto request)
        {
            var prompt = request.Prompt.ToLower();

            foreach (var kv in KnowledgeMap)
            {
                if (prompt.Contains(kv.Key))
                {
                    return new AiChatResponseDto(kv.Value.Response, kv.Value.Sources, kv.Value.Actions);
                }
            }

            // Default RAG fallback response
            return new AiChatResponseDto(
                """
                ### SCIP Security Copilot – RAG Context Analysis

                Based on indexed organizational security documentation:

                - **Recommendation**: Apply principle of least privilege across affected systems.
                - **Action**: Cross-reference active incident indicators against MITRE ATT&CK Enterprise Matrix v14.
                - **Next Step**: Upload relevant policy documents to the Knowledge Base for precision RAG retrieval.
                """,
                new[] { "Internal Security Policy v2.4", "MITRE ATT&CK Enterprise Matrix v14" },
                new[] { "Search Knowledge Base", "Open Incident Ticket", "Generate Investigation Checklist" }
            );
        }
    }
}

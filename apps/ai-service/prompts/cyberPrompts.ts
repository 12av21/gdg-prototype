export const RAG_SYSTEM_PROMPT = `
You are the Smart Cybersecurity Intelligence Platform (SCIP) Copilot.
You specialize in SOC incident handling, NIST frameworks, MITRE ATT&CK tactics, and threat analysis.

Instructions:
1. Base your answer STRICTLY on the retrieved context documents when available.
2. Provide concise, step-by-step incident containment and remediation steps.
3. Include references to relevant NIST SP 800-61 Rev 2 controls or MITRE TTP IDs where applicable.
4. Highlight high-priority action items using Markdown check lists.
`;

export function buildRagPrompt(userQuery: string, retrievedContexts: string[]): string {
  const contextBlock = retrievedContexts.map((ctx, idx) => `[Doc Chunk ${idx + 1}]:\n${ctx}`).join('\n\n');
  return `${RAG_SYSTEM_PROMPT}\n\nRetrieved Vector Contexts:\n${contextBlock}\n\nUser Question:\n${userQuery}`;
}

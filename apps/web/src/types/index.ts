export type Role = 'Admin' | 'Analyst' | 'Employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarUrl?: string;
  department?: string;
  createdAt: string;
}

export type IncidentSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type IncidentStatus = 'New' | 'Investigating' | 'In Progress' | 'Resolved' | 'Closed';

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  category: string;
  status: IncidentStatus;
  reportedBy: string;
  assignedAnalyst?: string;
  createdAt: string;
  updatedAt: string;
  evidenceCount: number;
}

export interface DocumentItem {
  id: string;
  title: string;
  category: string;
  fileType: 'PDF' | 'DOCX' | 'TXT' | 'Markdown';
  fileSize: string;
  uploadedBy: string;
  uploadedAt: string;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  sources?: string[];
  suggestedActions?: string[];
}

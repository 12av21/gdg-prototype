export type UserRole = 'Admin' | 'Analyst' | 'Employee';

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  createdAt: string;
}

export type SeverityLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type IncidentStatus = 'New' | 'Investigating' | 'In Progress' | 'Resolved' | 'Closed';

export interface IIncident {
  id: string;
  title: string;
  description: string;
  severity: SeverityLevel;
  status: IncidentStatus;
  category: string;
  reportedBy: string;
  assignedAnalyst?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IRagQueryResult {
  query: string;
  answer: string;
  sources: string[];
  suggestedActions: string[];
}

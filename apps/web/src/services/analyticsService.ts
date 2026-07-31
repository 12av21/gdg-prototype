import apiClient from './apiClient';

export interface DashboardStats {
  openIncidents: number;
  resolvedToday: number;
  totalDocuments: number;
  aiQueriesTotal: number;
  avgMttrMinutes: number;
}

export interface SeverityBreakdown {
  severity: string;
  count: number;
}

export const analyticsService = {
  async getDashboardStats(): Promise<DashboardStats> {
    const { data } = await apiClient.get<DashboardStats>('/analytics/dashboard');
    return data;
  },

  async getSeverityBreakdown(): Promise<SeverityBreakdown[]> {
    const { data } = await apiClient.get<SeverityBreakdown[]>('/analytics/severity-breakdown');
    return data;
  },
};

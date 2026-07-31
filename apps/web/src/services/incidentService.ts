import apiClient from './apiClient';
import { Incident, IncidentSeverity, IncidentStatus } from '../types';

export interface CreateIncidentPayload {
  title: string;
  description: string;
  severity: IncidentSeverity;
  category: string;
}

export interface UpdateStatusPayload {
  status: IncidentStatus;
  assignedAnalyst?: string;
}

export const incidentService = {
  async getAll(): Promise<Incident[]> {
    const { data } = await apiClient.get<Incident[]>('/incidents');
    return data;
  },

  async getById(id: string): Promise<Incident> {
    const { data } = await apiClient.get<Incident>(`/incidents/${id}`);
    return data;
  },

  async create(payload: CreateIncidentPayload): Promise<Incident> {
    const { data } = await apiClient.post<Incident>('/incidents', payload);
    return data;
  },

  async updateStatus(id: string, payload: UpdateStatusPayload): Promise<Incident> {
    const { data } = await apiClient.patch<Incident>(`/incidents/${id}/status`, payload);
    return data;
  },
};

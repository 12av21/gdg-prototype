import apiClient from './apiClient';
import { DocumentItem } from '../types';

export interface UploadDocumentPayload {
  title: string;
  category: string;
  fileType: string;
  tags: string[];
}

export const knowledgeService = {
  async getAll(): Promise<DocumentItem[]> {
    const { data } = await apiClient.get<DocumentItem[]>('/knowledge');
    return data;
  },

  async upload(payload: UploadDocumentPayload): Promise<DocumentItem> {
    const formData = new FormData();
    formData.append('title', payload.title);
    formData.append('category', payload.category);
    formData.append('fileType', payload.fileType);
    const { data } = await apiClient.post<DocumentItem>('/knowledge/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  async deleteDocument(id: string): Promise<void> {
    await apiClient.delete(`/knowledge/${id}`);
  },
};

import apiClient from './apiClient';
import { ChatMessage } from '../types';

export interface AiChatPayload {
  prompt: string;
  useRagContext?: boolean;
}

export interface AiChatApiResponse {
  response: string;
  sources: string[];
  suggestedActions: string[];
}

export const aiService = {
  async chat(payload: AiChatPayload): Promise<AiChatApiResponse> {
    const { data } = await apiClient.post<AiChatApiResponse>('/ai/chat', {
      prompt: payload.prompt,
      useRagContext: payload.useRagContext ?? true,
    });
    return data;
  },
};

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'X-API-KEY': API_KEY,
  },
});

export interface WhatsAppStatus {
  isConnected: boolean;
  qrCode?: string;
}

export interface Message {
  id: number;
  content: string;
  schedule_time: string;
  status: 'pending' | 'sent' | 'failed' | 'cancelled';
  recipients: string[];
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}

export const getWhatsAppStatus = async (): Promise<ApiResponse<WhatsAppStatus>> => {
  const response = await api.get<ApiResponse<WhatsAppStatus>>('/whatsapp/status');
  return response.data;
};

export const scheduleMessage = async (data: {
  content: string;
  scheduleTime: string;
  recipients: string[];
}): Promise<ApiResponse<Message>> => {
  const response = await api.post<ApiResponse<Message>>('/messages/schedule', data);
  return response.data;
};

export const getMessages = async (page = 1, limit = 10): Promise<ApiResponse<{ data: Message[]; page: number; limit: number }>> => {
  const response = await api.get<ApiResponse<{ data: Message[]; page: number; limit: number }>>('/messages', {
    params: { page, limit },
  });
  return response.data;
};

export const cancelMessage = async (id: number): Promise<ApiResponse<void>> => {
  const response = await api.delete<ApiResponse<void>>(`/messages/${id}/cancel`);
  return response.data;
}; 
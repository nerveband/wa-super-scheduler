import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const API_KEY = import.meta.env.VITE_API_KEY || 'your_api_key_here';

console.log('API Config:', { API_URL, API_KEY }); // For debugging

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'X-API-KEY': API_KEY,
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

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
  status: 'success' | 'error';
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T> {
  page: number;
  limit: number;
  total: number;
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

export const getMessages = async (page = 1, limit = 10): Promise<PaginatedResponse<Message[]>> => {
  const response = await api.get<PaginatedResponse<Message[]>>('/messages', {
    params: { page, limit },
  });
  return response.data;
};

export const cancelMessage = async (id: number): Promise<ApiResponse<void>> => {
  const response = await api.delete<ApiResponse<void>>(`/messages/${id}/cancel`);
  return response.data;
}; 
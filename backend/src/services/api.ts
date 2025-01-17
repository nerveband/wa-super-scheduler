import axios from 'axios';
import { Message, MessageLog, ScheduleMessagePayload, ApiResponse, PaginatedResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const API_KEY = import.meta.env.VITE_API_KEY;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': API_KEY
    }
});

export const messageApi = {
    schedule: async (payload: ScheduleMessagePayload): Promise<ApiResponse<Message>> => {
        const response = await api.post<ApiResponse<Message>>('/messages/schedule', payload);
        return response.data;
    },

    cancel: async (messageId: number): Promise<ApiResponse<void>> => {
        const response = await api.delete<ApiResponse<void>>(`/messages/${messageId}/cancel`);
        return response.data;
    },

    get: async (messageId: number): Promise<ApiResponse<Message>> => {
        const response = await api.get<ApiResponse<Message>>(`/messages/${messageId}`);
        return response.data;
    },

    getHistory: async (page = 1, limit = 10, status?: string): Promise<ApiResponse<PaginatedResponse<Message>>> => {
        const params = new URLSearchParams();
        params.append('page', page.toString());
        params.append('limit', limit.toString());
        if (status) params.append('status', status);

        const response = await api.get<ApiResponse<PaginatedResponse<Message>>>('/messages', { params });
        return response.data;
    },

    getLogs: async (messageId: number): Promise<ApiResponse<MessageLog[]>> => {
        const response = await api.get<ApiResponse<MessageLog[]>>(`/messages/${messageId}/logs`);
        return response.data;
    }
};

export const healthApi = {
    check: async (): Promise<ApiResponse<void>> => {
        const response = await api.get<ApiResponse<void>>('/health');
        return response.data;
    }
}; 
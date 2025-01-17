export interface Message {
    id: number;
    content: string;
    schedule_time: string;
    status: 'pending' | 'sent' | 'failed' | 'cancelled';
    created_at: string;
    updated_at: string;
    recipients: string[];
}

export interface MessageLog {
    id: number;
    message_id: number;
    recipient_id: number;
    status: string;
    error?: string;
    created_at: string;
}

export interface WhatsAppStatus {
    isConnected: boolean;
    qrCode?: string;
}

export interface ApiResponse<T> {
    status: 'success' | 'error';
    data?: T;
    message?: string;
}

export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    limit: number;
}

export interface ScheduleMessagePayload {
    content: string;
    scheduleTime: string;
    recipients: string[];
} 
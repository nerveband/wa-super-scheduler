import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { messageApi } from '../services/api';
import { ScheduleMessagePayload } from '../types';

export const useMessages = () => {
    const queryClient = useQueryClient();

    const getMessages = (page = 1, limit = 10, status?: string) => {
        return useQuery({
            queryKey: ['messages', page, limit, status],
            queryFn: () => messageApi.getHistory(page, limit, status)
        });
    };

    const getMessage = (messageId: number) => {
        return useQuery({
            queryKey: ['message', messageId],
            queryFn: () => messageApi.get(messageId),
            enabled: !!messageId
        });
    };

    const getMessageLogs = (messageId: number) => {
        return useQuery({
            queryKey: ['messageLogs', messageId],
            queryFn: () => messageApi.getLogs(messageId),
            enabled: !!messageId
        });
    };

    const scheduleMessage = () => {
        return useMutation({
            mutationFn: (payload: ScheduleMessagePayload) => messageApi.schedule(payload),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['messages'] });
            }
        });
    };

    const cancelMessage = () => {
        return useMutation({
            mutationFn: (messageId: number) => messageApi.cancel(messageId),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['messages'] });
            }
        });
    };

    return {
        getMessages,
        getMessage,
        getMessageLogs,
        scheduleMessage,
        cancelMessage
    };
}; 
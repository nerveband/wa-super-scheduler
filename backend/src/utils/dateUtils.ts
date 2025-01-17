export const formatDateTime = (date: string | Date): string => {
    const d = new Date(date);
    return d.toLocaleString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const formatDate = (date: string | Date): string => {
    const d = new Date(date);
    return d.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const formatTime = (date: string | Date): string => {
    const d = new Date(date);
    return d.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
    });
}; 
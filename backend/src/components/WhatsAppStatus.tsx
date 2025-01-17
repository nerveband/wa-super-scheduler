import { Box, Badge, Text, VStack, Image } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { WhatsAppStatus as WhatsAppStatusType } from '../types';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const WhatsAppStatus = () => {
    const { data: status, isLoading } = useQuery<WhatsAppStatusType>({
        queryKey: ['whatsapp-status'],
        queryFn: async () => {
            const response = await axios.get(`${API_URL}/whatsapp/status`);
            return response.data.data;
        },
        refetchInterval: 10000, // Refetch every 10 seconds
    });

    if (isLoading) {
        return <Text>Loading WhatsApp status...</Text>;
    }

    return (
        <VStack spacing={4} align="start">
            <Box>
                <Text fontWeight="bold" mb={2}>WhatsApp Status</Text>
                <Badge colorScheme={status?.isConnected ? 'green' : 'red'}>
                    {status?.isConnected ? 'Connected' : 'Disconnected'}
                </Badge>
            </Box>
            {!status?.isConnected && status?.qrCode && (
                <Box>
                    <Text mb={2}>Scan QR Code to connect:</Text>
                    <Image
                        src={`data:image/png;base64,${status.qrCode}`}
                        alt="WhatsApp QR Code"
                        boxSize="200px"
                    />
                </Box>
            )}
        </VStack>
    );
}; 
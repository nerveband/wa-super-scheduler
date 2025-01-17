import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Badge,
    IconButton,
    useToast,
    Text,
    HStack,
    Select,
    Tooltip,
    useDisclosure,
} from '@chakra-ui/react';
import { Message } from '../types';
import { useMessages } from '../hooks/useMessages';
import { useState, ChangeEvent } from 'react';
import { formatDateTime } from '../utils/dateUtils';
import { MessageDetails } from './MessageDetails';

const StatusBadge = ({ status }: { status: Message['status'] }) => {
    const colorScheme = {
        pending: 'yellow',
        sent: 'green',
        failed: 'red',
        cancelled: 'gray',
    }[status];

    return <Badge colorScheme={colorScheme}>{status}</Badge>;
};

export const MessageHistory = () => {
    const [page, setPage] = useState(1);
    const [status, setStatus] = useState<string>('');
    const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { getMessages, cancelMessage } = useMessages();
    const { data: messagesData, isLoading } = getMessages(page, 10, status);
    const cancelMutation = cancelMessage();
    const toast = useToast();

    const handleCancel = async (messageId: number) => {
        try {
            await cancelMutation.mutateAsync(messageId);
            toast({
                title: 'Message cancelled',
                status: 'success',
                duration: 3000,
            });
        } catch (error) {
            toast({
                title: 'Failed to cancel message',
                status: 'error',
                duration: 3000,
            });
        }
    };

    const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value);
        setPage(1); // Reset to first page when filter changes
    };

    const handleViewDetails = (messageId: number) => {
        setSelectedMessageId(messageId);
        onOpen();
    };

    if (isLoading) {
        return <Text>Loading messages...</Text>;
    }

    return (
        <Box overflowX="auto">
            <HStack mb={4} spacing={4}>
                <Select
                    value={status}
                    onChange={handleStatusChange}
                    placeholder="Filter by status"
                    w="200px"
                >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="sent">Sent</option>
                    <option value="failed">Failed</option>
                    <option value="cancelled">Cancelled</option>
                </Select>
            </HStack>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Message</Th>
                        <Th>Schedule Time</Th>
                        <Th>Recipients</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {messagesData?.data.data.map((message: Message) => (
                        <Tr key={message.id}>
                            <Td>
                                <Tooltip label={message.content}>
                                    <Text
                                        noOfLines={2}
                                        cursor="pointer"
                                        onClick={() => handleViewDetails(message.id)}
                                        _hover={{ color: 'blue.500' }}
                                    >
                                        {message.content}
                                    </Text>
                                </Tooltip>
                            </Td>
                            <Td>{formatDateTime(message.schedule_time)}</Td>
                            <Td>
                                <Tooltip label={message.recipients.join(', ')}>
                                    <Text noOfLines={1}>{message.recipients.join(', ')}</Text>
                                </Tooltip>
                            </Td>
                            <Td>
                                <StatusBadge status={message.status} />
                            </Td>
                            <Td>
                                <HStack spacing={2}>
                                    <IconButton
                                        aria-label="View details"
                                        icon={<Text>👁️</Text>}
                                        onClick={() => handleViewDetails(message.id)}
                                        variant="ghost"
                                        size="sm"
                                    />
                                    {message.status === 'pending' && (
                                        <IconButton
                                            aria-label="Cancel message"
                                            icon={<Text>❌</Text>}
                                            onClick={() => handleCancel(message.id)}
                                            isLoading={cancelMutation.isPending}
                                            variant="ghost"
                                            size="sm"
                                        />
                                    )}
                                </HStack>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            {selectedMessageId && (
                <MessageDetails
                    messageId={selectedMessageId}
                    isOpen={isOpen}
                    onClose={() => {
                        onClose();
                        setSelectedMessageId(null);
                    }}
                />
            )}
        </Box>
    );
}; 
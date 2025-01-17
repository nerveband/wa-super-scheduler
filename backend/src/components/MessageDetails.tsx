import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    VStack,
    Text,
    Badge,
    Divider,
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react';
import { Message, MessageLog } from '../types';
import { useMessages } from '../hooks/useMessages';
import { formatDateTime } from '../utils/dateUtils';

interface MessageDetailsProps {
    messageId: number;
    isOpen: boolean;
    onClose: () => void;
}

export const MessageDetails = ({ messageId, isOpen, onClose }: MessageDetailsProps) => {
    const { getMessage, getMessageLogs } = useMessages();
    const { data: messageData } = getMessage(messageId);
    const { data: logsData } = getMessageLogs(messageId);

    const message = messageData?.data;
    const logs = logsData?.data;

    if (!message) {
        return null;
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Message Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <VStack spacing={4} align="stretch">
                        <Box>
                            <Text fontWeight="bold" mb={1}>Status</Text>
                            <Badge colorScheme={
                                message.status === 'sent' ? 'green' :
                                message.status === 'pending' ? 'yellow' :
                                message.status === 'failed' ? 'red' : 'gray'
                            }>
                                {message.status}
                            </Badge>
                        </Box>
                        <Box>
                            <Text fontWeight="bold" mb={1}>Schedule Time</Text>
                            <Text>{formatDateTime(message.schedule_time)}</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold" mb={1}>Message</Text>
                            <Text whiteSpace="pre-wrap">{message.content}</Text>
                        </Box>
                        <Box>
                            <Text fontWeight="bold" mb={1}>Recipients</Text>
                            <Text>{message.recipients.join(', ')}</Text>
                        </Box>
                        {logs && logs.length > 0 && (
                            <Box>
                                <Text fontWeight="bold" mb={2}>Delivery Logs</Text>
                                <Table size="sm">
                                    <Thead>
                                        <Tr>
                                            <Th>Time</Th>
                                            <Th>Status</Th>
                                            <Th>Error</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {logs.map((log: MessageLog) => (
                                            <Tr key={log.id}>
                                                <Td>{formatDateTime(log.created_at)}</Td>
                                                <Td>
                                                    <Badge colorScheme={
                                                        log.status === 'sent' ? 'green' :
                                                        log.status === 'failed' ? 'red' : 'yellow'
                                                    }>
                                                        {log.status}
                                                    </Badge>
                                                </Td>
                                                <Td>{log.error || '-'}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </Box>
                        )}
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}; 
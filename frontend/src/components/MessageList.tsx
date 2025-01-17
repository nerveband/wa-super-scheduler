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
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getMessages, cancelMessage } from '../services/api';
import moment from 'moment';

function MessageList() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data: messages, isLoading } = useQuery({
    queryKey: ['messages'],
    queryFn: () => getMessages(),
  });

  const cancelMutation = useMutation({
    mutationFn: cancelMessage,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Message cancelled successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to cancel message',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'yellow';
      case 'sent':
        return 'green';
      case 'failed':
        return 'red';
      case 'cancelled':
        return 'gray';
      default:
        return 'gray';
    }
  };

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box overflowX="auto">
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
          {messages?.data.data.map((message) => (
            <Tr key={message.id}>
              <Td>{message.content}</Td>
              <Td>{moment(message.schedule_time).format('YYYY-MM-DD HH:mm')}</Td>
              <Td>{message.recipients.join(', ')}</Td>
              <Td>
                <Badge colorScheme={getStatusColor(message.status)}>
                  {message.status}
                </Badge>
              </Td>
              <Td>
                {message.status === 'pending' && (
                  <IconButton
                    aria-label="Cancel message"
                    icon={<span>❌</span>}
                    size="sm"
                    variant="ghost"
                    onClick={() => cancelMutation.mutate(message.id)}
                    isLoading={cancelMutation.isPending}
                  />
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

export default MessageList; 
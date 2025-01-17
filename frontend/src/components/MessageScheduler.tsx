import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { scheduleMessage } from '../services/api';

function MessageScheduler() {
  const [content, setContent] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [recipients, setRecipients] = useState('');
  const toast = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: scheduleMessage,
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Message scheduled successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setContent('');
      setScheduleTime('');
      setRecipients('');
      queryClient.invalidateQueries({ queryKey: ['messages'] });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to schedule message',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recipientList = recipients.split(',').map(r => r.trim());
    mutation.mutate({
      content,
      scheduleTime,
      recipients: recipientList,
    });
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4} bg="white" borderRadius="md" shadow="sm">
      <VStack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Message</FormLabel>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your message"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Schedule Time</FormLabel>
          <Input
            type="datetime-local"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Recipients</FormLabel>
          <Input
            value={recipients}
            onChange={(e) => setRecipients(e.target.value)}
            placeholder="Enter phone numbers (comma-separated)"
          />
        </FormControl>

        <Button
          type="submit"
          colorScheme="brand"
          isLoading={mutation.isPending}
          loadingText="Scheduling..."
          w="full"
        >
          Schedule Message
        </Button>
      </VStack>
    </Box>
  );
}

export default MessageScheduler; 
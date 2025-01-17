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
  Text,
  Heading,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { scheduleMessage } from '../services/api';

export default function MessageScheduler() {
  const [content, setContent] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [recipients, setRecipients] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const recipientList = recipients.split(',').map(r => r.trim());
      await scheduleMessage({
        content,
        scheduleTime,
        recipients: recipientList,
      });

      toast({
        title: 'Message Scheduled',
        description: 'Your message has been scheduled successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Reset form
      setContent('');
      setScheduleTime('');
      setRecipients('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to schedule message. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box>
      <VStack spacing={6} align="stretch">
        <Box>
          <Heading size="md" mb={2}>Schedule New Message</Heading>
          <Text color="gray.600">
            Schedule a message to be sent at a specific time to one or more recipients.
          </Text>
        </Box>

        <form onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Recipients</FormLabel>
              <Input
                placeholder="Enter phone numbers separated by commas (e.g., +1234567890, +9876543210)"
                value={recipients}
                onChange={(e) => setRecipients(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Message</FormLabel>
              <Textarea
                placeholder="Type your message here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                minH="150px"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Schedule Time</FormLabel>
              <Input
                type="datetime-local"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
              />
            </FormControl>

            <HStack spacing={4} mt={4}>
              <Button
                colorScheme="blue"
                type="submit"
                isLoading={isSubmitting}
                loadingText="Scheduling..."
              >
                Schedule Message
              </Button>
              <Badge colorScheme="red">Alpha</Badge>
            </HStack>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
} 
import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Textarea,
  VStack,
  useToast,
  Text,
  Heading,
  HStack,
  Badge,
} from '@chakra-ui/react';
import { scheduleMessage } from '../services/api';
import ContactSelector from '../components/ContactSelector';

export default function MessageScheduler() {
  const [content, setContent] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRecipients.length === 0) {
      toast({
        title: 'Error',
        description: 'Please select at least one recipient',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await scheduleMessage({
        content,
        scheduleTime,
        recipients: selectedRecipients,
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
      setSelectedRecipients([]);
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
          <VStack spacing={6} align="stretch">
            <FormControl isRequired>
              <FormLabel>Recipients</FormLabel>
              <ContactSelector
                value={selectedRecipients}
                onChange={setSelectedRecipients}
              />
              <Text fontSize="sm" color="gray.500" mt={1}>
                {selectedRecipients.length} recipient(s) selected
              </Text>
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
              <input
                type="datetime-local"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                min={new Date().toISOString().slice(0, 16)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #E2E8F0',
                  borderRadius: '6px',
                }}
              />
            </FormControl>

            <HStack spacing={4} mt={4}>
              <Button
                colorScheme="blue"
                type="submit"
                isLoading={isSubmitting}
                loadingText="Scheduling..."
                isDisabled={selectedRecipients.length === 0}
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
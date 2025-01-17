import { Box, Grid, Heading, Text, useToast } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import WhatsAppStatus from '../components/WhatsAppStatus';
import MessageScheduler from '../components/MessageScheduler';
import MessageList from '../components/MessageList';
import { getWhatsAppStatus } from '../services/api';

function Dashboard() {
  const toast = useToast();
  
  const { data: whatsappStatus, error } = useQuery({
    queryKey: ['whatsappStatus'],
    queryFn: getWhatsAppStatus,
    refetchInterval: 5000,
  });

  if (error) {
    toast({
      title: 'Error',
      description: 'Failed to fetch WhatsApp status',
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  }

  return (
    <Box>
      <Grid templateColumns={{ base: '1fr', lg: '1fr 2fr' }} gap={8}>
        <Box>
          <Heading size="md" mb={4}>WhatsApp Status</Heading>
          <WhatsAppStatus status={whatsappStatus?.data} />
          <Box mt={8}>
            <Heading size="md" mb={4}>Schedule Message</Heading>
            <MessageScheduler />
          </Box>
        </Box>
        <Box>
          <Heading size="md" mb={4}>Scheduled Messages</Heading>
          <MessageList />
        </Box>
      </Grid>
    </Box>
  );
}

export default Dashboard; 
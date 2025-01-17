import { Box, Text, Image, Alert, AlertIcon } from '@chakra-ui/react';
import { WhatsAppStatus as WhatsAppStatusType } from '../services/api';

interface WhatsAppStatusProps {
  status?: WhatsAppStatusType;
}

function WhatsAppStatus({ status }: WhatsAppStatusProps) {
  if (!status) {
    return (
      <Alert status="warning">
        <AlertIcon />
        Loading WhatsApp status...
      </Alert>
    );
  }

  return (
    <Box p={4} bg="white" borderRadius="md" shadow="sm">
      <Text fontSize="lg" mb={4}>
        Status: {status.isConnected ? (
          <Text as="span" color="green.500" fontWeight="bold">Connected</Text>
        ) : (
          <Text as="span" color="orange.500" fontWeight="bold">Disconnected</Text>
        )}
      </Text>

      {!status.isConnected && status.qrCode && (
        <Box>
          <Text mb={2}>Scan this QR code with WhatsApp to connect:</Text>
          <Box bg="white" p={4} borderRadius="md" display="inline-block">
            <Image
              src={`data:image/png;base64,${status.qrCode}`}
              alt="WhatsApp QR Code"
              width="200px"
              height="200px"
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default WhatsAppStatus; 
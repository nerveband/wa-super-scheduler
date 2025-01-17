import { Box, Text, Button, Image, Flex, Badge, Spinner } from '@chakra-ui/react'
import { WhatsAppStatus as WhatsAppStatusType } from '../services/api'

interface Props {
  status: WhatsAppStatusType
  onRefresh: () => void
}

export function WhatsAppStatus({ status, onRefresh }: Props) {
  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" bg="white">
      <Flex align="center" mb={4}>
        <Text fontSize="lg" fontWeight="medium">
          Status:
        </Text>
        {status.isConnected ? (
          <Badge ml={3} colorScheme="green" fontSize="0.9em" px={2} py={1}>
            Connected
          </Badge>
        ) : (
          <Badge ml={3} colorScheme="orange" fontSize="0.9em" px={2} py={1}>
            Disconnected
          </Badge>
        )}
      </Flex>
      
      {!status.isConnected && (
        <Box>
          {status.qrCode ? (
            <Box textAlign="center" py={4}>
              <Text mb={4} color="gray.600">
                Scan this QR code with WhatsApp to connect:
              </Text>
              <Box 
                p={4} 
                bg="white" 
                borderRadius="md" 
                boxShadow="sm"
                display="inline-block"
              >
                <Image 
                  src={`data:image/png;base64,${status.qrCode}`} 
                  alt="WhatsApp QR Code" 
                  maxW="200px"
                />
              </Box>
              <Button
                onClick={onRefresh}
                mt={6}
                colorScheme="blue"
                size="md"
                leftIcon={<Spinner size="sm" />}
              >
                Refresh QR Code
              </Button>
            </Box>
          ) : (
            <Box textAlign="center" py={4}>
              <Text color="gray.600" mb={4}>
                Waiting for QR code...
              </Text>
              <Spinner size="lg" color="blue.500" />
            </Box>
          )}
        </Box>
      )}
    </Box>
  )
}

export default WhatsAppStatus 
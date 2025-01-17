import { Box, Container, Heading, useToast, Divider } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import WhatsAppStatus from './components/WhatsAppStatus'
import MessageScheduler from './pages/MessageScheduler'
import { getWhatsAppStatus, WhatsAppStatus as WhatsAppStatusType } from './services/api'

function App() {
  const [status, setStatus] = useState<WhatsAppStatusType>({ isConnected: false, qrCode: undefined })
  const toast = useToast()

  const fetchStatus = async () => {
    try {
      const response = await getWhatsAppStatus()
      if (response.status === 'success') {
        setStatus(response.data)
      } else {
        toast({
          title: 'Error',
          description: response.message || 'Failed to fetch WhatsApp status',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    } catch (error) {
      toast({
        title: 'Error fetching status',
        description: 'Could not connect to the backend server',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    fetchStatus()
    const interval = setInterval(fetchStatus, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Box minH="100vh" bg="gray.50" py={10}>
      <Container maxW="container.md" bg="white" p={8} borderRadius="lg" boxShadow="sm">
        <Heading mb={8} textAlign="center" color="gray.800">WhatsApp Super Scheduler</Heading>
        <WhatsAppStatus 
          status={status} 
          onRefresh={fetchStatus}
        />
        
        {status.isConnected && (
          <>
            <Divider my={8} />
            <MessageScheduler />
          </>
        )}
      </Container>
    </Box>
  )
}

export default App

import { Box, Container, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { WhatsAppStatus } from '../components/WhatsAppStatus';

interface MainLayoutProps {
    children: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const headerBg = useColorModeValue('white', 'gray.800');

    return (
        <Box minH="100vh" bg={bgColor}>
            <Box bg={headerBg} px={4} borderBottom={1} borderStyle="solid" borderColor={useColorModeValue('gray.200', 'gray.700')}>
                <Container maxW="container.xl">
                    <Flex h={16} alignItems="center" justifyContent="space-between">
                        <Heading size="md">WA Super Scheduler</Heading>
                        <WhatsAppStatus />
                    </Flex>
                </Container>
            </Box>
            <Container maxW="container.xl" py={8}>
                {children}
            </Container>
        </Box>
    );
}; 
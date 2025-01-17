import { Box, Container, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <Box>
      <Box
        as="nav"
        bg={useColorModeValue('white', 'gray.800')}
        borderBottom="1px"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        py={4}
        px={8}
        position="fixed"
        w="100%"
        zIndex={10}
      >
        <Flex align="center" justify="space-between" maxW="7xl" mx="auto">
          <Heading size="md" color="brand.500">
            WA Super Scheduler
          </Heading>
        </Flex>
      </Box>
      <Box pt="72px">
        <Container maxW="7xl" py={8}>
          {children}
        </Container>
      </Box>
    </Box>
  );
}

export default MainLayout; 
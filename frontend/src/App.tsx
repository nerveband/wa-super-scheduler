import { ChakraProvider, Box } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './pages/Dashboard';
import Layout from './layouts/MainLayout';
import theme from './theme';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Router>
          <Layout>
            <Box minH="100vh" bg="gray.50">
              <Routes>
                <Route path="/" element={<Dashboard />} />
              </Routes>
            </Box>
          </Layout>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;

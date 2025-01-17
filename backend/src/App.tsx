import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { theme } from './theme';
import { Home } from './pages/Home';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            staleTime: 30000,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={theme}>
                <Router>
                    <MainLayout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                        </Routes>
                    </MainLayout>
                </Router>
            </ChakraProvider>
        </QueryClientProvider>
    );
}

export default App; 
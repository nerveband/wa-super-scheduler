import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    config: {
        initialColorMode: 'light',
        useSystemColorMode: true,
    },
    styles: {
        global: {
            body: {
                bg: 'gray.50',
                color: 'gray.900',
            },
        },
    },
    components: {
        Button: {
            defaultProps: {
                colorScheme: 'blue',
            },
        },
    },
}); 
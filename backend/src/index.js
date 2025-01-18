require('dotenv').config();
const { startServer } = require('./app');

// Start the server
startServer().catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});

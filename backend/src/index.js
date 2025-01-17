require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { initializeDatabase } = require('./config/database');
const { initializeWhatsApp } = require('./services/whatsapp');
const { setupMessageScheduler } = require('./services/scheduler');
const apiRoutes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'success', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Something went wrong!'
    });
});

async function startServer() {
    try {
        // Initialize database
        await initializeDatabase();
        console.log('Database initialized');

        // Initialize WhatsApp client
        await initializeWhatsApp();
        console.log('WhatsApp client initialized');

        // Setup message scheduler
        await setupMessageScheduler();
        console.log('Message scheduler initialized');

        // Start server
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();

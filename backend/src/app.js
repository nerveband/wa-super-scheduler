require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { initializeDatabase } = require('./config/database');
const { initializeWhatsApp } = require('./services/whatsapp');
const { setupMessageScheduler } = require('./services/scheduler');
const whatsappRoutes = require('./routes/whatsapp');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// API Key middleware
const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized'
        });
    }
    next();
};

// Routes
app.use('/api/whatsapp', apiKeyMiddleware, whatsappRoutes);

// Health check endpoint
app.get('/api/health', apiKeyMiddleware, (req, res) => {
    res.json({
        status: 'success',
        message: 'Server is running'
    });
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
        await initializeDatabase();
        console.log('✅ Database initialized');
        await initializeWhatsApp();
        console.log('✅ WhatsApp client initialized');
        await setupMessageScheduler();
        console.log('✅ Message scheduler initialized');
        
        app.listen(port, () => {
            console.log('\n🚀 Server is running!');
            console.log(`📡 Server URL: http://localhost:${port}`);
            console.log(`🔑 API Key: ${process.env.API_KEY}`);
            console.log('\n📍 Available endpoints:');
            console.log(`   Health Check: http://localhost:${port}/api/health`);
            console.log(`   WhatsApp Status: http://localhost:${port}/api/whatsapp/status`);
            console.log(`   WhatsApp Contacts: http://localhost:${port}/api/whatsapp/contacts`);
            console.log('\n👀 Waiting for requests...');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

module.exports = { startServer }; 
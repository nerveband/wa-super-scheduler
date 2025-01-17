const express = require('express');
const { connectToWhatsApp } = require('./config/whatsapp');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Basic security middleware
app.use((req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Initialize WhatsApp connection
connectToWhatsApp().catch(err => {
    console.error('Error initializing WhatsApp:', err);
    process.exit(1);
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

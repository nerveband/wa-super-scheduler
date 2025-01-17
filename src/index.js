const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { connectToWhatsApp } = require('./config/whatsapp');
const { errorHandler } = require('./middleware/errorHandler');
const messageRoutes = require('./routes/messageRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Basic security middleware
app.use((req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
});

// Routes
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api/messages', messageRoutes);

// Error handling
app.use(errorHandler);

// Handle 404
app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found'
    });
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

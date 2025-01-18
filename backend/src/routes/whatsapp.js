const express = require('express');
const router = express.Router();
const { getConnectionStatus, getContacts } = require('../services/whatsapp');

// Get WhatsApp connection status
router.get('/status', (req, res) => {
    console.log('Getting WhatsApp connection status...');
    try {
        const status = getConnectionStatus();
        res.json({
            status: 'success',
            data: status
        });
    } catch (error) {
        console.error('Error getting WhatsApp status:', error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

// Get WhatsApp contacts and groups
router.get('/contacts', async (req, res) => {
    console.log('Fetching WhatsApp contacts and groups...');
    try {
        const contacts = await getContacts();
        res.json({
            status: 'success',
            data: contacts
        });
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router; 
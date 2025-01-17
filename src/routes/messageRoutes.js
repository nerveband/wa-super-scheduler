const express = require('express');
const { scheduleMessageValidation } = require('../middleware/validator');
const {
    scheduleMessage,
    cancelMessage,
    getMessage,
    getMessageHistory,
    getMessageLogs
} = require('../controllers/messageController');

const router = express.Router();

// Schedule a new message
router.post('/schedule', scheduleMessageValidation, scheduleMessage);

// Cancel a scheduled message
router.delete('/:messageId/cancel', cancelMessage);

// Get a specific message
router.get('/:messageId', getMessage);

// Get message history with pagination
router.get('/', getMessageHistory);

// Get message delivery logs
router.get('/:messageId/logs', getMessageLogs);

module.exports = router; 
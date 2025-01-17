const express = require('express');
const { body, validationResult } = require('express-validator');
const { getDb } = require('../config/database');
const { getConnectionStatus } = require('../services/whatsapp');

const router = express.Router();

// Middleware to validate API key
const validateApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({
            status: 'error',
            message: 'Unauthorized'
        });
    }
    next();
};

// Apply API key validation to all routes
router.use(validateApiKey);

// WhatsApp status endpoint
router.get('/whatsapp/status', (req, res) => {
    const status = getConnectionStatus();
    res.json({
        status: 'success',
        data: status
    });
});

// Schedule a new message
router.post(
    '/messages/schedule',
    [
        body('content').notEmpty().withMessage('Message content is required'),
        body('scheduleTime').isISO8601().withMessage('Invalid schedule time'),
        body('recipients').isArray().withMessage('Recipients must be an array'),
        body('recipients.*').notEmpty().withMessage('Invalid recipient')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: 'error',
                message: 'Validation error',
                errors: errors.array()
            });
        }

        const { content, scheduleTime, recipients } = req.body;
        const db = getDb();

        try {
            const result = await new Promise((resolve, reject) => {
                db.serialize(() => {
                    db.run('BEGIN TRANSACTION');

                    db.run(
                        `INSERT INTO messages (content, schedule_time) VALUES (?, ?)`,
                        [content, scheduleTime],
                        function(err) {
                            if (err) {
                                db.run('ROLLBACK');
                                reject(err);
                                return;
                            }

                            const messageId = this.lastID;
                            const recipientValues = recipients.map(r => `(${messageId}, '${r}')`).join(',');

                            db.run(
                                `INSERT INTO message_recipients (message_id, recipient_id) VALUES ${recipientValues}`,
                                [],
                                (err) => {
                                    if (err) {
                                        db.run('ROLLBACK');
                                        reject(err);
                                        return;
                                    }

                                    db.run('COMMIT', (err) => {
                                        if (err) {
                                            reject(err);
                                            return;
                                        }

                                        resolve(messageId);
                                    });
                                }
                            );
                        }
                    );
                });
            });

            res.json({
                status: 'success',
                data: {
                    id: result,
                    content,
                    schedule_time: scheduleTime,
                    recipients
                }
            });
        } catch (error) {
            console.error('Error scheduling message:', error);
            res.status(500).json({
                status: 'error',
                message: 'Failed to schedule message'
            });
        }
    }
);

// Get message history
router.get('/messages', async (req, res) => {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;
    const db = getDb();

    try {
        let query = `
            SELECT m.*, GROUP_CONCAT(r.recipient_id) as recipients
            FROM messages m
            LEFT JOIN message_recipients r ON m.id = r.message_id
        `;

        const params = [];
        if (status) {
            query += ' WHERE m.status = ?';
            params.push(status);
        }

        query += ' GROUP BY m.id ORDER BY m.schedule_time DESC LIMIT ? OFFSET ?';
        params.push(limit, offset);

        const messages = await new Promise((resolve, reject) => {
            db.all(query, params, (err, rows) => {
                if (err) reject(err);
                else resolve(rows.map(row => ({
                    ...row,
                    recipients: row.recipients ? row.recipients.split(',') : []
                })));
            });
        });

        res.json({
            status: 'success',
            data: {
                data: messages,
                page: parseInt(page),
                limit: parseInt(limit)
            }
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch messages'
        });
    }
});

// Get message details
router.get('/messages/:id', async (req, res) => {
    const { id } = req.params;
    const db = getDb();

    try {
        const message = await new Promise((resolve, reject) => {
            db.get(
                `SELECT m.*, GROUP_CONCAT(r.recipient_id) as recipients
                 FROM messages m
                 LEFT JOIN message_recipients r ON m.id = r.message_id
                 WHERE m.id = ?
                 GROUP BY m.id`,
                [id],
                (err, row) => {
                    if (err) reject(err);
                    else resolve(row ? {
                        ...row,
                        recipients: row.recipients ? row.recipients.split(',') : []
                    } : null);
                }
            );
        });

        if (!message) {
            return res.status(404).json({
                status: 'error',
                message: 'Message not found'
            });
        }

        res.json({
            status: 'success',
            data: message
        });
    } catch (error) {
        console.error('Error fetching message:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch message'
        });
    }
});

// Get message logs
router.get('/messages/:id/logs', async (req, res) => {
    const { id } = req.params;
    const db = getDb();

    try {
        const logs = await new Promise((resolve, reject) => {
            db.all(
                'SELECT * FROM message_logs WHERE message_id = ? ORDER BY created_at DESC',
                [id],
                (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                }
            );
        });

        res.json({
            status: 'success',
            data: logs
        });
    } catch (error) {
        console.error('Error fetching message logs:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch message logs'
        });
    }
});

// Cancel a scheduled message
router.delete('/messages/:id/cancel', async (req, res) => {
    const { id } = req.params;
    const db = getDb();

    try {
        await new Promise((resolve, reject) => {
            db.run(
                `UPDATE messages 
                 SET status = 'cancelled', updated_at = datetime('now')
                 WHERE id = ? AND status = 'pending'`,
                [id],
                function(err) {
                    if (err) reject(err);
                    else resolve(this.changes);
                }
            );
        });

        res.json({
            status: 'success',
            message: 'Message cancelled successfully'
        });
    } catch (error) {
        console.error('Error cancelling message:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to cancel message'
        });
    }
});

module.exports = router; 
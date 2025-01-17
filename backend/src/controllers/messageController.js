const scheduler = require('../services/scheduler');
const { AppError } = require('../middleware/errorHandler');
const db = require('../config/database');

const scheduleMessage = async (req, res, next) => {
    try {
        const { content, scheduleTime, recipients } = req.body;
        const message = await scheduler.scheduleNewMessage(content, scheduleTime, recipients);
        
        res.status(201).json({
            status: 'success',
            data: {
                message
            }
        });
    } catch (error) {
        next(new AppError(500, 'Error scheduling message: ' + error.message));
    }
};

const cancelMessage = async (req, res, next) => {
    try {
        const { messageId } = req.params;
        await scheduler.cancelScheduledMessage(messageId);
        
        res.status(200).json({
            status: 'success',
            message: 'Message cancelled successfully'
        });
    } catch (error) {
        next(new AppError(500, 'Error cancelling message: ' + error.message));
    }
};

const getMessage = async (req, res, next) => {
    try {
        const { messageId } = req.params;
        
        const message = await new Promise((resolve, reject) => {
            const query = `
                SELECT m.*, GROUP_CONCAT(r.recipient_id) as recipients
                FROM messages m
                LEFT JOIN recipients r ON m.id = r.message_id
                WHERE m.id = ?
                GROUP BY m.id
            `;
            
            db.get(query, [messageId], (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (!row) {
                    reject(new AppError(404, 'Message not found'));
                    return;
                }
                resolve({
                    ...row,
                    recipients: row.recipients ? row.recipients.split(',') : []
                });
            });
        });

        res.status(200).json({
            status: 'success',
            data: {
                message
            }
        });
    } catch (error) {
        next(error);
    }
};

const getMessageHistory = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        const offset = (page - 1) * limit;
        
        let query = `
            SELECT m.*, GROUP_CONCAT(r.recipient_id) as recipients
            FROM messages m
            LEFT JOIN recipients r ON m.id = r.message_id
        `;
        
        const params = [];
        if (status) {
            query += ' WHERE m.status = ?';
            params.push(status);
        }
        
        query += `
            GROUP BY m.id
            ORDER BY m.created_at DESC
            LIMIT ? OFFSET ?
        `;
        params.push(limit, offset);

        const messages = await new Promise((resolve, reject) => {
            db.all(query, params, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows.map(row => ({
                    ...row,
                    recipients: row.recipients ? row.recipients.split(',') : []
                })));
            });
        });

        res.status(200).json({
            status: 'success',
            data: {
                messages,
                page: parseInt(page),
                limit: parseInt(limit)
            }
        });
    } catch (error) {
        next(new AppError(500, 'Error fetching message history: ' + error.message));
    }
};

const getMessageLogs = async (req, res, next) => {
    try {
        const { messageId } = req.params;
        
        const logs = await new Promise((resolve, reject) => {
            const query = `
                SELECT *
                FROM message_logs
                WHERE message_id = ?
                ORDER BY created_at DESC
            `;
            
            db.all(query, [messageId], (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });

        res.status(200).json({
            status: 'success',
            data: {
                logs
            }
        });
    } catch (error) {
        next(new AppError(500, 'Error fetching message logs: ' + error.message));
    }
};

module.exports = {
    scheduleMessage,
    cancelMessage,
    getMessage,
    getMessageHistory,
    getMessageLogs
}; 
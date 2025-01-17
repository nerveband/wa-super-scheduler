const cron = require('node-cron');
const moment = require('moment');
const { getDb } = require('../config/database');
const { sendMessage } = require('./whatsapp');

async function setupMessageScheduler() {
    // Check for messages to send every minute
    cron.schedule('* * * * *', async () => {
        try {
            const db = getDb();
            const now = moment().format('YYYY-MM-DD HH:mm:00');

            // Get pending messages scheduled for now
            const messages = await new Promise((resolve, reject) => {
                db.all(
                    `SELECT * FROM messages 
                     WHERE status = 'pending' 
                     AND datetime(schedule_time) <= datetime(?)`,
                    [now],
                    (err, rows) => {
                        if (err) reject(err);
                        else resolve(rows);
                    }
                );
            });

            // Process each message
            for (const message of messages) {
                try {
                    // Get recipients for this message
                    const recipients = await new Promise((resolve, reject) => {
                        db.all(
                            'SELECT recipient_id FROM message_recipients WHERE message_id = ?',
                            [message.id],
                            (err, rows) => {
                                if (err) reject(err);
                                else resolve(rows.map(row => row.recipient_id));
                            }
                        );
                    });

                    // Send message to each recipient
                    for (const recipient of recipients) {
                        try {
                            await sendMessage(recipient, message.content);
                            
                            // Log successful delivery
                            await new Promise((resolve, reject) => {
                                db.run(
                                    `INSERT INTO message_logs (message_id, recipient_id, status, created_at)
                                     VALUES (?, ?, 'sent', datetime('now'))`,
                                    [message.id, recipient],
                                    (err) => {
                                        if (err) reject(err);
                                        else resolve();
                                    }
                                );
                            });
                        } catch (error) {
                            // Log failed delivery
                            await new Promise((resolve, reject) => {
                                db.run(
                                    `INSERT INTO message_logs (message_id, recipient_id, status, error, created_at)
                                     VALUES (?, ?, 'failed', ?, datetime('now'))`,
                                    [message.id, recipient, error.message],
                                    (err) => {
                                        if (err) reject(err);
                                        else resolve();
                                    }
                                );
                            });
                        }
                    }

                    // Update message status
                    await new Promise((resolve, reject) => {
                        db.run(
                            `UPDATE messages 
                             SET status = 'sent', updated_at = datetime('now')
                             WHERE id = ?`,
                            [message.id],
                            (err) => {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });
                } catch (error) {
                    console.error(`Error processing message ${message.id}:`, error);
                    
                    // Update message status to failed
                    await new Promise((resolve, reject) => {
                        db.run(
                            `UPDATE messages 
                             SET status = 'failed', updated_at = datetime('now')
                             WHERE id = ?`,
                            [message.id],
                            (err) => {
                                if (err) reject(err);
                                else resolve();
                            }
                        );
                    });
                }
            }
        } catch (error) {
            console.error('Error in message scheduler:', error);
        }
    });
}

module.exports = {
    setupMessageScheduler,
}; 
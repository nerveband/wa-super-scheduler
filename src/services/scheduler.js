const cron = require('node-cron');
const db = require('../config/database');
const { sendMessage } = require('../config/whatsapp');

class MessageScheduler {
    constructor() {
        this.scheduledTasks = new Map();
        this.initializeScheduler();
    }

    async initializeScheduler() {
        try {
            // Load all pending messages from database
            const messages = await this.getPendingMessages();
            messages.forEach(message => {
                this.scheduleMessage(message);
            });
            console.log(`Initialized scheduler with ${messages.length} pending messages`);
        } catch (error) {
            console.error('Error initializing scheduler:', error);
        }
    }

    async getPendingMessages() {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT m.*, GROUP_CONCAT(r.recipient_id) as recipients
                FROM messages m
                LEFT JOIN recipients r ON m.id = r.message_id
                WHERE m.status = 'pending'
                AND m.schedule_time > datetime('now')
                GROUP BY m.id
            `;
            
            db.all(query, [], (err, rows) => {
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
    }

    scheduleMessage(message) {
        const scheduledTime = new Date(message.schedule_time);
        const now = new Date();

        if (scheduledTime <= now) {
            console.log(`Message ${message.id} scheduled time has passed`);
            return;
        }

        const task = cron.schedule(this.getSchedulePattern(scheduledTime), async () => {
            try {
                await this.sendScheduledMessage(message);
                task.stop(); // Stop the cron job after sending
            } catch (error) {
                console.error(`Error sending scheduled message ${message.id}:`, error);
                await this.updateMessageStatus(message.id, 'failed');
            }
        });

        this.scheduledTasks.set(message.id, task);
    }

    getSchedulePattern(date) {
        return `${date.getSeconds()} ${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1} *`;
    }

    async sendScheduledMessage(message) {
        try {
            for (const recipient of message.recipients) {
                await sendMessage(recipient, message.content);
                await this.logMessageDelivery(message.id, recipient, 'sent');
            }
            await this.updateMessageStatus(message.id, 'sent');
        } catch (error) {
            console.error(`Error sending message ${message.id}:`, error);
            await this.updateMessageStatus(message.id, 'failed');
            throw error;
        }
    }

    async updateMessageStatus(messageId, status) {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE messages 
                SET status = ?, updated_at = datetime('now')
                WHERE id = ?
            `;
            
            db.run(query, [status, messageId], (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    async logMessageDelivery(messageId, recipientId, status, error = null) {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO message_logs (message_id, recipient_id, status, error)
                VALUES (?, ?, ?, ?)
            `;
            
            db.run(query, [messageId, recipientId, status, error], (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    async scheduleNewMessage(content, scheduleTime, recipients) {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run('BEGIN TRANSACTION');

                db.run(
                    `INSERT INTO messages (content, schedule_time, status) VALUES (?, ?, 'pending')`,
                    [content, scheduleTime],
                    function(err) {
                        if (err) {
                            db.run('ROLLBACK');
                            reject(err);
                            return;
                        }

                        const messageId = this.lastID;
                        const recipientValues = recipients.map(r => `(${messageId}, 'individual', '${r}')`).join(',');
                        
                        db.run(
                            `INSERT INTO recipients (message_id, recipient_type, recipient_id) VALUES ${recipientValues}`,
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

                                    const message = {
                                        id: messageId,
                                        content,
                                        schedule_time: scheduleTime,
                                        recipients
                                    };

                                    this.scheduleMessage(message);
                                    resolve(message);
                                });
                            }
                        );
                    }
                );
            });
        });
    }

    cancelScheduledMessage(messageId) {
        const task = this.scheduledTasks.get(messageId);
        if (task) {
            task.stop();
            this.scheduledTasks.delete(messageId);
            return this.updateMessageStatus(messageId, 'cancelled');
        }
        return Promise.resolve();
    }
}

// Create a singleton instance
const scheduler = new MessageScheduler();

module.exports = scheduler; 
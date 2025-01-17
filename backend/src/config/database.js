const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs').promises;

let db = null;

const dbPath = process.env.DB_PATH || path.join(__dirname, '../../data/scheduler.sqlite');

async function initializeDatabase() {
    try {
        // Create data directory if it doesn't exist
        await fs.mkdir(path.dirname(dbPath), { recursive: true });

        return new Promise((resolve, reject) => {
            db = new sqlite3.Database(dbPath, async (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                try {
                    await createTables();
                    resolve();
                } catch (error) {
                    reject(error);
                }
            });
        });
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

async function createTables() {
    const queries = [
        `CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT NOT NULL,
            schedule_time DATETIME NOT NULL,
            status TEXT CHECK(status IN ('pending', 'sent', 'failed', 'cancelled')) DEFAULT 'pending',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        `CREATE TABLE IF NOT EXISTS message_recipients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            message_id INTEGER,
            recipient_id TEXT NOT NULL,
            FOREIGN KEY (message_id) REFERENCES messages(id)
        )`,
        `CREATE TABLE IF NOT EXISTS message_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            message_id INTEGER,
            recipient_id TEXT NOT NULL,
            status TEXT CHECK(status IN ('sent', 'failed')) NOT NULL,
            error TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (message_id) REFERENCES messages(id)
        )`,
        `CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status)`,
        `CREATE INDEX IF NOT EXISTS idx_messages_schedule ON messages(schedule_time)`,
        `CREATE INDEX IF NOT EXISTS idx_message_recipients ON message_recipients(message_id)`,
        `CREATE INDEX IF NOT EXISTS idx_message_logs ON message_logs(message_id)`
    ];

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run('BEGIN TRANSACTION');

            for (const query of queries) {
                db.run(query, (err) => {
                    if (err) {
                        db.run('ROLLBACK');
                        reject(err);
                        return;
                    }
                });
            }

            db.run('COMMIT', (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    });
}

function getDb() {
    if (!db) {
        throw new Error('Database not initialized');
    }
    return db;
}

module.exports = {
    initializeDatabase,
    getDb,
};

const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();

const dbPath = process.env.DB_PATH || path.join(__dirname, '../../data/scheduler.sqlite');
const migrationsPath = path.join(__dirname, 'migrations');

// Ensure the data directory exists
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        process.exit(1);
    }
    console.log('Connected to SQLite database');
    initializeDatabase();
});

async function runMigration(migrationFile) {
    const filePath = path.join(migrationsPath, migrationFile);
    const sql = await fs.readFile(filePath, 'utf8');
    
    return new Promise((resolve, reject) => {
        db.exec(sql, (err) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

async function initializeDatabase() {
    try {
        // Create migrations table if it doesn't exist
        await new Promise((resolve, reject) => {
            db.run(`
                CREATE TABLE IF NOT EXISTS migrations (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `, (err) => {
                if (err) reject(err);
                else resolve();
            });
        });

        // Get executed migrations
        const executedMigrations = await new Promise((resolve, reject) => {
            db.all('SELECT name FROM migrations', (err, rows) => {
                if (err) reject(err);
                else resolve(rows.map(row => row.name));
            });
        });

        // Get all migration files
        const migrationFiles = (await fs.readdir(migrationsPath))
            .filter(file => file.endsWith('.sql'))
            .sort();

        // Run pending migrations
        for (const file of migrationFiles) {
            if (!executedMigrations.includes(file)) {
                console.log(`Running migration: ${file}`);
                await runMigration(file);
                await new Promise((resolve, reject) => {
                    db.run('INSERT INTO migrations (name) VALUES (?)', [file], (err) => {
                        if (err) reject(err);
                        else resolve();
                    });
                });
            }
        }

        console.log('Database initialization complete');
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
}

module.exports = db;

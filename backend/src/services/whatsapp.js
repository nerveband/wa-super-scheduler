const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, makeInMemoryStore } = require('@whiskeysockets/baileys');
const path = require('path');
const fs = require('fs').promises;
const winston = require('winston');

let sock = null;
let qrCode = null;
let isConnected = false;
let isContactSynced = false;
let contactSyncStartTime = 0;

const dataDir = process.env.WA_DATA_DIR || './data';
const sessionDir = path.join(dataDir, 'sessions');
const storeFile = path.join(dataDir, 'store.json');
const logsDir = path.join(dataDir, 'logs');
const reconnectInterval = parseInt(process.env.WA_RECONNECT_INTERVAL) || 5000;

// Create logs directory
fs.mkdir(logsDir, { recursive: true }).catch(console.error);

// Configure winston logger
const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ 
            filename: path.join(logsDir, 'error.log'), 
            level: 'error',
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        }),
        new winston.transports.File({ 
            filename: path.join(logsDir, 'whatsapp.log'),
            maxsize: 5242880, // 5MB
            maxFiles: 5,
        }),
        // Always show important logs in console
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
});

// Add debug console logging in development
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )
    }));
}

// Initialize store with logger
const store = makeInMemoryStore({ 
    logger: {
        info: (msg) => logger.info(msg),
        debug: (msg) => logger.debug(msg),
        warn: (msg) => logger.warn(msg),
        error: (msg) => logger.error(msg)
    }
})

// Read store from file
try {
    store.readFromFile(storeFile);
    logger.info('Store loaded from file');
} catch (err) {
    logger.info('No existing store found, creating new one');
}

// Save store every 10s
setInterval(() => {
    store.writeToFile(storeFile);
}, 10_000);

// Cache contacts and groups
let cachedContacts = [];
let lastFetchTime = 0;
const CACHE_TTL = 30000; // 30 seconds

async function initializeWhatsApp() {
    try {
        // Create data and sessions directories
        await fs.mkdir(dataDir, { recursive: true });
        await fs.mkdir(sessionDir, { recursive: true });
        
        const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
        
        sock = makeWASocket({
            auth: state,
            printQRInTerminal: true,
            defaultQueryTimeoutMs: 60000,
            syncFullHistory: true,
            markOnlineOnConnect: true,
            getMessage: async (key) => {
                if (store) {
                    const msg = await store.loadMessage(key.remoteJid, key.id)
                    return msg?.message || undefined
                }
                return {
                    conversation: ''
                }
            }
        });

        // Reset sync state
        isContactSynced = false;
        contactSyncStartTime = Date.now();
        
        // Bind store events BEFORE registering other listeners
        store.bind(sock.ev);
        
        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr } = update;
            if (qr) {
                qrCode = qr;
                isConnected = false;
            }
            if (connection === 'close') {
                const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
                logger.warn('WhatsApp connection closed due to:', lastDisconnect?.error);
                isConnected = false;
                isContactSynced = false;
                if (shouldReconnect) {
                    setTimeout(initializeWhatsApp, reconnectInterval);
                }
            } else if (connection === 'open') {
                logger.info('WhatsApp connection opened');
                qrCode = null;
                isConnected = true;
                
                // Fetch initial data when connection opens
                logger.info('Fetching initial data...');
                try {
                    // Fetch all groups
                    const groups = await sock.groupFetchAllParticipating();
                    logger.info(`Initial groups fetched: ${Object.keys(groups).length}`);
                    
                    // Force sync of chat history
                    logger.info('Syncing chat history and contacts...');
                    await sock.sendPresenceUpdate('available');
                } catch (err) {
                    logger.error('Error fetching initial data:', err);
                }
            }
        });

        // Listen for message updates
        sock.ev.on('messages.upsert', async ({ messages, type }) => {
            if (type === 'notify') {
                logger.debug('New message received, invalidating cache');
                lastFetchTime = 0;
                
                // Update store with new message
                for (const msg of messages) {
                    if (msg.key.remoteJid) {
                        const chat = store.chats.get(msg.key.remoteJid);
                        if (!chat) {
                            store.chats.insert({
                                id: msg.key.remoteJid,
                                conversationTimestamp: msg.messageTimestamp,
                                unreadCount: 1
                            });
                        }
                    }
                }
                store.writeToFile(storeFile);
            }
        });

        // Listen for chat updates
        sock.ev.on('chats.set', ({ chats }) => {
            logger.debug(`Got chats from store: ${chats.length}`);
            lastFetchTime = 0;
            store.writeToFile(storeFile);
        });

        sock.ev.on('chats.update', (updates) => {
            logger.debug(`Chats updated: ${updates.length}`);
            lastFetchTime = 0;
            store.writeToFile(storeFile);
        });

        sock.ev.on('chats.upsert', (chats) => {
            logger.debug(`Chats upserted: ${chats.length}`);
            lastFetchTime = 0;
            store.writeToFile(storeFile);
        });

        // Listen for contact updates
        sock.ev.on('contacts.upsert', (contacts) => {
            const syncTime = Date.now() - contactSyncStartTime;
            logger.info(`Contacts synced after ${syncTime}ms - Received ${contacts.length} contacts`);
            
            // Update contacts in store
            for (const contact of contacts) {
                if (contact.id) {
                    store.contacts[contact.id] = {
                        ...(store.contacts[contact.id] || {}),
                        ...contact
                    };
                }
            }
            
            // Mark contacts as synced
            isContactSynced = true;
            lastFetchTime = 0; // Invalidate cache to force refresh
            store.writeToFile(storeFile);
            
            logger.info(`Total contacts in store: ${Object.keys(store.contacts).length}`);
        });

        sock.ev.on('contacts.update', (updates) => {
            logger.debug(`Contacts updated: ${updates.length}`);
            lastFetchTime = 0;
            
            // Update contacts in store
            for (const update of updates) {
                if (update.id) {
                    store.contacts[update.id] = {
                        ...(store.contacts[update.id] || {}),
                        ...update
                    };
                }
            }
            store.writeToFile(storeFile);
        });

        sock.ev.on('creds.update', saveCreds);
    } catch (error) {
        logger.error('Error initializing WhatsApp:', error);
        throw error;
    }
}

async function getContacts() {
    if (!isConnected || !sock) {
        throw new Error('WhatsApp is not connected');
    }

    // Wait for initial contact sync if needed
    if (!isContactSynced) {
        logger.info('Waiting for contacts to sync...');
        const maxWaitTime = 30000; // 30 seconds
        const startWait = Date.now();
        
        while (!isContactSynced && (Date.now() - startWait) < maxWaitTime) {
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        if (!isContactSynced) {
            logger.warn('Contact sync timed out after 30 seconds');
        }
    }

    // Return cached results if within TTL
    if (Date.now() - lastFetchTime < CACHE_TTL && cachedContacts.length > 0) {
        logger.debug('Returning cached contacts:', { count: cachedContacts.length });
        return cachedContacts;
    }

    try {
        logger.info('Fetching contacts and groups...');
        
        // Get groups
        const groups = await sock.groupFetchAllParticipating();
        const groupList = Object.entries(groups).map(([id, group]) => ({
            id,
            name: group.subject || 'Unknown Group',
            number: id.split('@')[0],
            type: 'group',
            lastMessageTime: new Date().toISOString(),
            participants: group.participants?.length || 0
        }));
        
        // Get all contacts from store
        const contacts = Object.entries(store.contacts);
        logger.debug(`Found ${contacts.length} contacts in store`);

        // Process contacts
        const contactList = contacts
            .filter(([id]) => id.endsWith('@s.whatsapp.net'))
            .map(([id, contact]) => {
                const chat = store.chats.get(id);
                return {
                    id: id,
                    name: contact.notify || contact.verifiedName || contact.name || 
                          contact.pushname || (chat?.name) || id.split('@')[0],
                    number: id.split('@')[0],
                    type: 'individual',
                    lastMessageTime: chat?.conversationTimestamp 
                        ? new Date(chat.conversationTimestamp * 1000).toISOString()
                        : new Date().toISOString(),
                    pushname: contact.pushname,
                    notify: contact.notify,
                    verifiedName: contact.verifiedName,
                    syncState: isContactSynced ? 'synced' : 'partial'
                };
            });

        // Update cache
        cachedContacts = [...groupList, ...contactList];
        lastFetchTime = Date.now();

        logger.info(`Fetched ${cachedContacts.length} total contacts (${groupList.length} groups, ${contactList.length} individuals)`);
        
        return cachedContacts;
    } catch (error) {
        logger.error('Error fetching contacts:', error);
        throw error;
    }
}

async function sendMessage(to, message) {
    if (!isConnected || !sock) {
        throw new Error('WhatsApp is not connected');
    }

    try {
        const jid = to.includes('@g.us') ? to : `${to}@s.whatsapp.net`;
        await sock.sendMessage(jid, { text: message });
        return true;
    } catch (error) {
        console.error('Error sending WhatsApp message:', error);
        throw error;
    }
}

function getConnectionStatus() {
    return {
        isConnected,
        qrCode,
    };
}

module.exports = {
    initializeWhatsApp,
    sendMessage,
    getConnectionStatus,
    getContacts,
    get sock() { return sock; }
}; 
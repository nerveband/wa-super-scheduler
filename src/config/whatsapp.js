const { default: makeWASocket, DisconnectReason, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const path = require('path');
require('dotenv').config();

const sessionDir = process.env.WA_SESSION_DIR || path.join(__dirname, '../../sessions');
const reconnectInterval = parseInt(process.env.WA_RECONNECT_INTERVAL) || 5000;

let sock = null;
let isConnected = false;

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

    sock = makeWASocket({
        printQRInTerminal: true,
        auth: state,
        defaultQueryTimeoutMs: undefined
    });

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'close') {
            const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Connection closed due to:', lastDisconnect?.error, 'Reconnecting:', shouldReconnect);
            
            isConnected = false;
            
            if (shouldReconnect) {
                setTimeout(connectToWhatsApp, reconnectInterval);
            }
        } else if (connection === 'open') {
            console.log('WhatsApp connection established');
            isConnected = true;
        }
    });

    sock.ev.on('creds.update', saveCreds);
}

async function sendMessage(jid, content) {
    if (!isConnected) {
        throw new Error('WhatsApp is not connected');
    }

    try {
        const result = await sock.sendMessage(jid, { text: content });
        return result;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}

module.exports = {
    connectToWhatsApp,
    sendMessage,
    isConnected: () => isConnected
};

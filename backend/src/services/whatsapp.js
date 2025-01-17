const { default: makeWASocket, DisconnectReason, useMultiFileAuthState } = require('@whiskeysockets/baileys');
const path = require('path');
const fs = require('fs').promises;

let sock = null;
let qrCode = null;
let isConnected = false;

const sessionDir = process.env.WA_SESSION_DIR || './sessions';
const reconnectInterval = parseInt(process.env.WA_RECONNECT_INTERVAL) || 5000;

async function initializeWhatsApp() {
    try {
        // Create sessions directory if it doesn't exist
        await fs.mkdir(sessionDir, { recursive: true });

        const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

        sock = makeWASocket({
            auth: state,
            printQRInTerminal: true,
        });

        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr } = update;

            if (qr) {
                qrCode = qr;
                isConnected = false;
            }

            if (connection === 'close') {
                const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
                console.log('WhatsApp connection closed due to:', lastDisconnect.error);
                isConnected = false;

                if (shouldReconnect) {
                    setTimeout(initializeWhatsApp, reconnectInterval);
                }
            } else if (connection === 'open') {
                console.log('WhatsApp connection opened');
                qrCode = null;
                isConnected = true;
            }
        });

        sock.ev.on('creds.update', saveCreds);
    } catch (error) {
        console.error('Error initializing WhatsApp:', error);
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
}; 
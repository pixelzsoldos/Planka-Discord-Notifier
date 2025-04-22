// config.js
require('dotenv').config();

// Version information
const VERSION = '1.0.3';

// Server configuration
const PORT = process.env.PORT || 3001;
const PLANKA_BASE_URL = process.env.PLANKA_BASE_URL || 'http://localhost:3000';

// Discord webhook configuration
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

// Board configuration
let BOARDS = {};
try {
    if (process.env.BOARDS) {
        BOARDS = JSON.parse(process.env.BOARDS);
    }
} catch (error) {
    console.error('Error parsing BOARDS environment variable:', error);
    BOARDS = {};
}

// Get webhook URL for a specific board
function getWebhookUrl(boardId) {
    // Find board by ID
    const board = Object.values(BOARDS).find(b => b.id === boardId);
    
    if (board && board.webhook) {
        return board.webhook;
    }
    
    // Return default webhook URL if no specific board webhook exists
    return DISCORD_WEBHOOK_URL;
}

// Get board name for a specific board ID
function getBoardName(boardId) {
    // Find board by ID
    const board = Object.values(BOARDS).find(b => b.id === boardId);
    
    if (board) {
        return board.name;
    }
    
    return "Unknown Board";
}

// Language configuration
const LANGUAGE = process.env.LANGUAGE || 'en';
const strings = require(`./languages/${LANGUAGE}.js`);

module.exports = {
    VERSION,
    PORT,
    PLANKA_BASE_URL,
    DISCORD_WEBHOOK_URL,
    BOARDS,
    LANGUAGE,
    strings,
    getWebhookUrl,
    getBoardName
};
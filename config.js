// config.js
require('dotenv').config();

// Version information
const VERSION = '1.0.3';

// Server configuration
const PORT = process.env.PORT || 3001;
const PLANKA_BASE_URL = process.env.PLANKA_BASE_URL || 'http://localhost:3000';

// Discord webhook configuration
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

// Board name mapping
const BOARD_NAMES = process.env.BOARD_NAMES ? JSON.parse(process.env.BOARD_NAMES) : {};

// Get webhook URL for a specific board
function getWebhookUrl(boardId) {
    // Get board name from ID
    const boardName = BOARD_NAMES[boardId];
    
    if (boardName) {
        // Get board-specific webhook URL from environment variable
        const boardWebhookUrl = process.env[`${boardName.toUpperCase()}_WEBHOOK_URL`];
        if (boardWebhookUrl) {
            return boardWebhookUrl;
        }
    }
    
    // Return default webhook URL if no specific board webhook exists
    return DISCORD_WEBHOOK_URL;
}

// Get board name for a specific board ID
function getBoardName(boardId) {
    return BOARD_NAMES[boardId] || "Unknown Board";
}

// Language configuration
const LANGUAGE = process.env.LANGUAGE || 'en';
const strings = require(`./languages/${LANGUAGE}.js`);

module.exports = {
    VERSION,
    PORT,
    PLANKA_BASE_URL,
    DISCORD_WEBHOOK_URL,
    BOARD_NAMES,
    LANGUAGE,
    strings,
    getWebhookUrl,
    getBoardName
};
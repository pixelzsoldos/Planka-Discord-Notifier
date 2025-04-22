// config.js
require('dotenv').config();

// Version information
const VERSION = '1.0.3';

// Server configuration
const PORT = process.env.PORT || 3001;
const PLANKA_BASE_URL = process.env.PLANKA_BASE_URL || 'http://localhost:3000';

// Discord webhook configuration
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
const BOARD_WEBHOOKS = JSON.parse(process.env.BOARD_WEBHOOKS || '{}');

// Board name mapping
const BOARD_NAMES = JSON.parse(process.env.BOARD_NAMES || '{}');

// Language configuration
const LANGUAGE = process.env.LANGUAGE || 'en';
const strings = require(`./languages/${LANGUAGE}.js`);

// Get webhook URL for a specific board
function getWebhookUrl(boardId) {
    // Get board name from ID
    const boardName = BOARD_NAMES[boardId] || config.strings.unknownBoard;
    
    // Return webhook URL for board name or default
    return BOARD_WEBHOOKS[boardName] || DISCORD_WEBHOOK_URL;
}

module.exports = {
    VERSION,
    PORT,
    PLANKA_BASE_URL,
    DISCORD_WEBHOOK_URL,
    BOARD_WEBHOOKS,
    BOARD_NAMES,
    LANGUAGE,
    strings,
    getWebhookUrl
};
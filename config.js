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
const { getWebhookUrl, getBoardName } = require('./config/boards/boards');

// Language configuration
const LANGUAGE = process.env.LANGUAGE || 'en';
const strings = require(`./languages/${LANGUAGE}.js`);

module.exports = {
    VERSION,
    PORT,
    PLANKA_BASE_URL,
    DISCORD_WEBHOOK_URL,
    LANGUAGE,
    strings,
    getWebhookUrl,
    getBoardName
};
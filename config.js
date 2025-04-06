// config.js
const { version } = require('./package.json');
require('dotenv').config();

// Default configuration values
const defaultConfig = {
    PLANKA_BASE_URL: "https://your-planka-url.com",
    PORT: 3001,
    LANGUAGE: "en",
    BOARD_NAMES: {
        "board-id-1": "Board 1",
        "board-id-2": "Board 2"
        // További táblák...
    },
    VERSION: version
};

// Load language file based on configuration
const loadLanguage = (lang) => {
    try {
        return require(`./languages/${lang}.js`);
    } catch (error) {
        console.warn(`Language ${lang} not found, falling back to English`);
        return require('./languages/en.js');
    }
};

// Environment variables or default values
const config = {
    PLANKA_BASE_URL: process.env.PLANKA_BASE_URL || defaultConfig.PLANKA_BASE_URL,
    PORT: process.env.PORT || defaultConfig.PORT,
    LANGUAGE: process.env.LANGUAGE || defaultConfig.LANGUAGE,
    BOARD_NAMES: process.env.BOARD_NAMES ? JSON.parse(process.env.BOARD_NAMES) : defaultConfig.BOARD_NAMES,
    DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,
    VERSION: version
};

// Load language strings
config.strings = loadLanguage(config.LANGUAGE);

module.exports = config;
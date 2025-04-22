// Board configurations
const boards = {
    // Example board configurations
    "keleti": {
        name: "Keleti",
        webhookUrl: process.env.KELETI_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL
    },
    "nyugati": {
        name: "Nyugati",
        webhookUrl: process.env.NYUGATI_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL
    }
    // Add more boards as needed
};

// Get webhook URL for a specific board
function getWebhookUrl(boardId) {
    // Get board name from ID
    const boardName = process.env.BOARD_NAMES ? JSON.parse(process.env.BOARD_NAMES)[boardId] : null;
    
    if (boardName && boards[boardName.toLowerCase()]) {
        return boards[boardName.toLowerCase()].webhookUrl;
    }
    
    // Return default webhook URL if no specific board configuration exists
    return process.env.DISCORD_WEBHOOK_URL;
}

// Get board name for a specific board ID
function getBoardName(boardId) {
    const boardName = process.env.BOARD_NAMES ? JSON.parse(process.env.BOARD_NAMES)[boardId] : null;
    
    if (boardName && boards[boardName.toLowerCase()]) {
        return boards[boardName.toLowerCase()].name;
    }
    
    return boardName || "Unknown Board";
}

module.exports = {
    boards,
    getWebhookUrl,
    getBoardName
}; 
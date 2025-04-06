// English language configuration
module.exports = {
    actions: {
        cardCreate: "created",
        cardDelete: "deleted",
        cardUpdate: "modified",
        cardMemberAdd: "added member to",
        cardMemberRemove: "removed member from",
        cardDueDateAdd: "set due date for",
        cardDueDateComplete: "marked as complete",
        cardMove: "moved"
    },
    errors: {
        webhookError: "Discord webhook error:",
        payloadError: "Failed to process payload:",
        missingData: "Could not identify required data in webhook payload"
    },
    logging: {
        webhookReceived: "Webhook received:",
        processedData: "Processed event data:",
        notificationSent: "Discord notification sent successfully",
        serverRunning: "Webhook listener running at http://localhost:"
    },
    board: "board",
    card: "card",
    unknownBoard: "Unknown board",
    unknownUser: "Unknown user",
    cardLink: "View card"
}; 
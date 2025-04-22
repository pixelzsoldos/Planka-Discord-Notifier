// Magyar nyelvi konfiguráció
module.exports = {
    actions: {
        cardCreate: "létrehozta",
        cardDelete: "törölte",
        cardUpdate: "módosította",
        cardMemberAdd: "tagot adott",
        cardMemberRemove: "tagot törölt",
        cardDueDateAdd: "határidőt állított be",
        cardDueDateComplete: "teljesítettként jelölte",
        cardMove: "áthelyezte"
    },
    errors: {
        webhookError: "Discord webhook hiba:",
        payloadError: "Hiba történt a payload feldolgozása során:",
        missingData: "Nem sikerült azonosítani a szükséges adatokat a webhook payload-ban"
    },
    logging: {
        webhookReceived: "Webhook érkezett:",
        processedData: "Feldolgozott eventData:",
        notificationSent: "Discord értesítés sikeresen elküldve",
        errorNotificationSent: "Hiba értesítés elküldve a Discordra",
        serverRunning: "Webhook listener fut a http://localhost:"
    },
    board: "táblán",
    card: "kártyát",
    unknownBoard: "Ismeretlen tábla",
    unknownUser: "Ismeretlen felhasználó",
    cardLink: "Kártya megtekintése"
}; 
// index.js
const express = require("express");
const config = require("./config");
const app = express();

app.use(express.json());

app.post("/", (req, res) => {
  console.log(config.strings.logging.webhookReceived, req.body);

  // Process webhook data
  let eventData = {
    name: "",
    id: "",
    event: "",
    type: "",
    list: "",
    board: "",
    created: "",
    user: "",
    url: "",
    boardName: "",
    avatarUrl: ""
  };

  try {
    // Normalize payload
    const payload = req.body;
    
    // Save event type
    eventData.event = payload.event || "unknown event";

    let itemData = null;
    let userData = null;

    if (typeof payload === 'object') {
      // Search for item and user data
      Object.keys(payload).forEach(key => {
        const value = payload[key];
        if (value && typeof value === 'object') {
          if (value.item) {
            itemData = value.item;
          }
          if (value.username && value.name) {
            userData = value;
          }
        }
      });

      if (payload.item) {
        itemData = payload.item;
      }
    }

    // Process item data if found
    if (itemData) {
      eventData.name = itemData.name;
      eventData.id = itemData.id;
      eventData.list = itemData.listId;
      eventData.board = itemData.boardId;
      eventData.boardName = config.getBoardName(itemData.boardId);
      eventData.created = itemData.createdAt;
      eventData.url = `${config.PLANKA_BASE_URL}/cards/${itemData.id}`;
    }

    if (userData) {
      eventData.user = userData.name;
      eventData.avatarUrl = userData.avatarUrl;
    }

    console.log(config.strings.logging.processedData, eventData);

  } catch (error) {
    console.error(config.strings.errors.payloadError, error);
    
    // Send error notification to Discord
    if (config.DISCORD_WEBHOOK_URL) {
      const fetch = (...args) =>
        import("node-fetch").then(({ default: fetch }) => fetch(...args));

      const errorMessage = {
        content: "@planka",
        embeds: [{
          title: "❌ Error in Planka Discord Notifier",
          description: `**Error Message:** ${error.message}\n**Stack Trace:** \`\`\`${error.stack}\`\`\``,
          color: 0xFF0000, // Red color for errors
          fields: [
            {
              name: "Version",
              value: `v${config.VERSION}`,
              inline: true
            },
            {
              name: "Time",
              value: new Date().toISOString(),
              inline: true
            }
          ],
          timestamp: new Date().toISOString()
        }]
      };

      fetch(config.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(errorMessage),
      })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              throw new Error(
                `${config.strings.errors.webhookError} ${response.status} ${text}`,
              );
            });
          }
          console.log(config.strings.logging.errorNotificationSent);
        })
        .catch(console.error);
    }
  }

  if (eventData.name || eventData.id) {
    // Get webhook URL for the specific board
    const webhookUrl = config.getWebhookUrl(eventData.board);
    
    if (webhookUrl) {
      const fetch = (...args) =>
        import("node-fetch").then(({ default: fetch }) => fetch(...args));

      // Format Discord message based on event type
      let actionText = "";
      let showCardLink = true;
      let emoji = "";
      let boardEmoji = "📋";

      switch(eventData.event) {
        case 'cardCreate':
          emoji = "📝";
          actionText = config.strings.actions.cardCreate;
          break;
        case 'cardDelete':
          emoji = "🗑️";
          actionText = config.strings.actions.cardDelete;
          showCardLink = false;
          break;
        case 'cardUpdate':
          emoji = "✏️";
          actionText = config.strings.actions.cardUpdate;
          break;
        case 'cardMemberAdd':
          emoji = "👥";
          actionText = config.strings.actions.cardMemberAdd;
          break;
        case 'cardMemberRemove':
          emoji = "👤";
          actionText = config.strings.actions.cardMemberRemove;
          break;
        case 'cardDueDateAdd':
          emoji = "📅";
          actionText = config.strings.actions.cardDueDateAdd;
          break;
        case 'cardDueDateComplete':
          emoji = "✅";
          actionText = config.strings.actions.cardDueDateComplete;
          break;
        case 'cardMove':
          emoji = "↔️";
          actionText = config.strings.actions.cardMove;
          break;
        default:
          emoji = "ℹ️";
          actionText = "performed action on";
      }

      // Build description with new format
      const mainText = `${boardEmoji} **${eventData.boardName}** ${config.strings.board} ${emoji} **${eventData.name}** ${config.strings.card} ${actionText}`;
      const description = showCardLink ? 
        `${mainText}\n\n[${config.strings.cardLink}](${eventData.url})` : 
        mainText;

      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [{
            author: {
              name: eventData.user || config.strings.unknownUser,
              icon_url: eventData.avatarUrl || null
            },
            description: description,
            color: eventData.event === 'cardCreate' ? 0x2ecc71 : 
                   eventData.event === 'cardDelete' ? 0xe74c3c : 
                   eventData.event === 'cardUpdate' ? 0x3498db : 
                   0x95a5a6,
            timestamp: eventData.created
          }]
        }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((text) => {
              throw new Error(
                `${config.strings.errors.webhookError} ${response.status} ${text}`,
              );
            });
          }
          console.log(config.strings.logging.notificationSent);
        })
        .catch(console.error);
    }
  } else {
    console.error(config.strings.errors.missingData);
  }

  res.status(200).send("OK");
});

function detectChanges(prevData, currentData) {
    const changes = [];
    
    // Name change
    if (prevData.item.name !== currentData.item.name) {
        changes.push({
            field: "name",
            old: prevData.item.name,
            new: currentData.item.name
        });
    }
    
    // Description change
    if (prevData.item.description !== currentData.item.description) {
        changes.push({
            field: "description",
            old: prevData.item.description,
            new: currentData.item.description
        });
    }
    
    // List change
    if (prevData.item.listId !== currentData.item.listId) {
        changes.push({
            field: "list",
            old: prevData.item.listId,
            new: currentData.item.listId
        });
    }
    
    return changes;
}

app.listen(config.PORT, () => {
  console.log(`Planka Discord Notifier v${config.VERSION}`);
  console.log(`${config.strings.logging.serverRunning}${config.PORT}`);
});


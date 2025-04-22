# Planka Discord Notifier

A webhook service that sends Planka board events to Discord channels using webhooks.

## Features

### Supported Events and Emojis
- 📝 Card Creation
- 🗑️ Card Deletion
- ✏️ Card Update
- 👥 Member Addition
- 👤 Member Removal
- 📅 Due Date Setting
- ✅ Card Completion
- ↔️ Card Movement

### Message Format
```
[Avatar] Username
📋 Board Name board 📝 Card Name card action

Jump to card
```

### Change Detection
When a card is updated, the notification includes:
- Previous and new values for changed fields
- Detailed change history
- Visual indicators for different types of changes

Example of change detection:
```
[Avatar] Username
📋 Board Name board ✏️ Card Name was updated

Changes:
• Name: "Old Name" → "New Name"
• Description: "Old description" → "New description"
• List: "Old List" → "New List"

Jump to card
```

### Supported Languages
- 🇬🇧 English (default)
- 🇭🇺 Hungarian

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/planka-discord-notifier.git
cd planka-discord-notifier
```
2. Install dependencies:
```bash
npm install
```
3. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
4. Configure your environment variables in `.env` file (DO NOT commit this file):
   - `PLANKA_BASE_URL`: Your Planka server URL
   - `PORT`: Webhook server port (default: 3001)
   - `DISCORD_WEBHOOK_URL`: Default Discord webhook URL (used if no specific board webhook is found)
   - `BOARD_WEBHOOKS`: JSON object mapping board IDs to Discord webhook URLs
   - `BOARD_NAMES`: JSON object mapping board IDs to names
   - `LANGUAGE`: Language code (`en` or `hu`, default: `en`)

> ⚠️ **Security Note**: Never commit your `.env` file to version control. The `.gitignore` file is configured to exclude it. Always use `.env.example` as a template and create your own `.env` file locally.

Example `.env` file structure (replace with your actual values):
```env
PLANKA_BASE_URL=https://your-planka-url.com
PORT=3001
LANGUAGE=en
DISCORD_WEBHOOK_URL=your-default-discord-webhook-url
BOARD_WEBHOOKS={"board-id-1":"webhook-url-1","board-id-2":"webhook-url-2"}
BOARD_NAMES={"board-id-1":"Board 1","board-id-2":"Board 2"}
```

## Usage

1. Start the server:
```bash
node index.js
```
2. Configure your Planka webhook URL to point to: `http://your-server:3001`
3. The server will automatically receive Planka events and forward them to Discord

### Language Configuration

The service supports multiple languages for Discord notifications. You can change the language by setting the `LANGUAGE` environment variable in your `.env` file:

```env
# For English
LANGUAGE=en

# For Hungarian
LANGUAGE=hu
```

If an unsupported language code is provided, the service will automatically fall back to English.

## Message Colors

Messages are color-coded based on event type:
- 🟢 Green: Creation
- 🔴 Red: Deletion
- 🔵 Blue: Modification
- ⚪ Gray: Other actions

## Adding New Languages

To add a new language:

1. Create a new file in the `languages` directory (e.g., `languages/de.js` for German)
2. Copy the structure from `languages/en.js`
3. Translate all strings to the new language
4. Use the new language code in the `LANGUAGE` environment variable

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

### Planned Features

#### Discord Mention System
- Ping Discord roles based on different events
- Customizable mention rules:
  - Notify project managers when deadlines are approaching
  - Ping dedicated teams for urgent cards
  - Notify specific roles for board events
- Configure mention settings through environment variables

<details>
<summary>Changelog</summary>

### [1.0.3] - 2024-03-19
#### Added
- Change detection system for card updates
- Detailed change history in notifications
- Visual indicators for different types of changes
- Previous and new value comparison

### [1.0.2] - 2024-03-19
#### Added
- Error notification system with Discord integration
- @planka mention for error notifications
- Detailed error reporting with stack traces
- Version and timestamp information in error messages

### [1.0.1] - 2024-03-19
#### Changed
- Modified Discord message format: "View card" link instead of "moved"
- Improved Hungarian translations

### [1.0.0] - 2024-03-19
#### Added
- Webhook service for forwarding Planka events to Discord
- Supported events:
  - Card Creation
  - Card Deletion
  - Card Update
  - Member Addition
  - Member Removal
  - Due Date Setting
  - Card Completion
  - Card Movement
- Multi-language support (English, Hungarian)
- Color-coded messages based on event type
- Environment variable configuration
- Custom board name mapping
</details>
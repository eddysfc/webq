# IRS UIUC WebQ

Web-based queue management system for Illini Rhythm Syndicate freeplays.

## Prerequisites

- Node.js

## Discord App Setup

1. Go to [Discord Developer Portal](https://discord.com/developers/applications) and create a new application.
2. Copy Client ID and Client Secret.
3. Add a redirect URI (`http://localhost:3000/auth/discord/callback`).
4. Create a bot and copy the Bot Token.
5. Add the bot to your Discord server with the `Send Messages` permission.
6. With Developer Mode enabled, copy the Channel ID of notifications channel.

These steps have already been completed for the IRS Discord app.

## Setup

```
git clone https://github.com/Illini-Rhythm-Syndicate/webq.git
cd webq
npm i
```

Create `.env` by copying `.env.example` and populating all values.

`npm run css` to generate CSS styling with Tailwind CLI. Keep terminal running for hot updates.

`npm run dev` to start app, server runs on `http://localhost:3000` by default.

## Admin Setup

Create `src/admins.js` and copy-paste contents of `src/admins.example.js`. Add Discord IDs as strings to the array to grand admin permissions.

## Notes

- Queue state is in-memory and resets on server restart.

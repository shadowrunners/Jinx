const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [
	Intents.FLAGS.GUILDS,
	Intents.FLAGS.GUILD_MESSAGES,
	Intents.FLAGS.GUILD_MEMBERS,
	Intents.FLAGS.GUILD_INVITES,
	Intents.FLAGS.GUILD_BANS,
	Intents.FLAGS.GUILD_INVITES,
	Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
	Intents.FLAGS.GUILD_VOICE_STATES
], partials: [
	"MESSAGE",
	"CHANNEL",
	"GUILD_MEMBER"
]});
const { token } = require('./config.json');

client.commands = new Collection();

require('discord-logs')(client);
require('colors');

["commands", "events"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

process.on('unhandledRejection', (err) => {
	console.error(`Unhandled Rejection: ${err}`);
});
  
process.on('uncaughtException', (err) => {
	console.error(`Uncaught Exception: ${err}`);
});
  
client.login(token);
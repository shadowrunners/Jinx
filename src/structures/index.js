const { Client, Collection } = require("discord.js");
const client = new Client({intents: 32767,});
const { Token } = require("./config.json");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
const { DiscordTogether } = require("discord-together");

client.commands = new Collection();
client.DiscordTogether = new DiscordTogether(client);
client.manager = require("../utils/manager.js")(client);
client.maintenance = false;

require("../systems/giveawaySystem.js")(client);

module.exports = client;

["events", "commands"].forEach(handler => {
    require(`./handlers/${handler}`)(client, PG, Ascii);
});

client.login(Token);
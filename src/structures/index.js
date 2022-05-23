const { Client, Collection } = require("discord.js");
const client = new Client({intents: 32767});
const { token, nodes, SpotifyClientID, SpotifySecret } = require("./config.json");
const Spotify = require("better-erela.js-spotify").default;
const Deezer = require("erela.js-deezer");
const { Manager } = require("erela.js");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
const { DiscordTogether } = require("discord-together");

client.commands = new Collection();
client.DiscordTogether = new DiscordTogether(client);

client.manager = new Manager({
    nodes,
    plugins: [ 
        new Spotify({
            clientID: SpotifyClientID,
            clientSecret: SpotifySecret,
        }),
        new Deezer()
        ], 
    send: (id, payload) => {
        let guild = client.guilds.cache.get(id);
        if(guild) guild.shard.send(payload);
    },
});

require("../systems/giveawaySystem.js")(client);

module.exports = client;

["events", "commands"].forEach(handler => {
    require(`./handlers/${handler}`)(client, PG, Ascii);
});

client.login(token);
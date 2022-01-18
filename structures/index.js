const { Client, Collection } = require("discord.js");
const client = new Client({intents: 32767});
const { Token, SpotifyClientID, SpotifySecret } = require("./config.json");
const { promisify } = require("util");
const { glob } = require("glob");
const PG = promisify(glob);
const Ascii = require("ascii-table");
const { DiscordTogether } = require("discord-together");

client.commands = new Collection();

require("../systems/giveawaysystem.js")(client);

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
client.DiscordTogether = new DiscordTogether(client);

client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    leaveOnEmpty: true,
    leaveOnFinish: false,
    emitAddSongWhenCreatingQueue: false,
    plugins: [new SpotifyPlugin({
        parallel: true, 
        emitEventsAfterFetching: false,
        api: {
            clientId: SpotifyClientID,
            clientSecret: SpotifySecret
        }, }), new SoundCloudPlugin()]
});

module.exports = client;
client.maintenance = false;

["events", "commands"].forEach(handler => {
    require(`./handlers/${handler}`)(client, PG, Ascii);
});

client.login(Token);
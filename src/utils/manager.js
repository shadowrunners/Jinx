const { nodes, SpotifyClientID, SpotifySecret } = require("../structures/config.json");
const Spotify = require("better-erela.js-spotify").default;
const Deezer = require("erela.js-deezer");
const { Manager } = require("erela.js");

module.exports = function (client) {
    return new Manager({
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
    })};



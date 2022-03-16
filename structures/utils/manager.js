const { nodes, SpotifyClientID, SpotifySecret } = require("../config.json");
const Spotify = require("better-erela.js-spotify").default;
const apple = require("erela.js-apple");
const { Manager } = require("erela.js");

module.exports = function (client) {
    return new Manager({
        nodes,
        plugins: [ 
            new Spotify({
                clientID: SpotifyClientID,
                clientSecret: SpotifySecret,
            }),
            new apple()
        ], 
        send: (id, payload) => {
            let guild = client.guilds.cache.get(id);
            if(guild) guild.shard.send(payload);
        },
    })};



const { Client } = require("discord.js");
const mongoose = require("mongoose");
const { Database } = require("../../structures/config.json")

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client 
     */
    execute(client) {
        console.log("Ready to rock, bitch.")
        client.user.setActivity("BonkCat 4.0", {type: "PLAYING"})

        if(!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Valk has successfully connected to the database.")
        }).catch((err) => {
            console.log(err)
        });
    }
}
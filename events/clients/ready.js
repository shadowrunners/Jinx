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
        setInterval(() => {
            if (client.maintenance) {
                client.user.setStatus("online")
                client.user.setActivity("MaintenanceMaster 1.2", { type: "PLAYING"})
                return;
            }
            if (!client.maintenance) {
                client.user.setStatus("online")
                client.user.setActivity("Get Jinxed", { type: "LISTENING" })
            }
        }, 30000);

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
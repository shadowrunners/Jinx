const { Client } = require("discord.js");
const mongoose = require("mongoose");
const { Database } = require("../../structures/config.json");

module.exports = {
    name: "ready",
    once: true,
    /**
     * @param {Client} client 
     */
    execute(client) {
        console.log("[Client] >> Ready to rock, bitch.")
        setInterval(() => {
            if (client.maintenance) {
                client.user.setStatus("dnd")
                client.user.setActivity("MaintenanceMaster 1.2", { type: "PLAYING" })
                return;
            }
            if (!client.maintenance) {
                client.user.setStatus("online")
                client.user.setActivity("Get Jinxed", { type: "LISTENING" })
            }
        });

        require("../../systems/lockdownSystem.js")(client);
        
        client.manager.init(client.user.id);
        if (!Database) return;
        mongoose.connect(Database, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("[DB] >> Jinx has successfully connected to the database.")
        }).catch((err) => {
            console.log(err)
        });
    }
}
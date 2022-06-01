const glob = require('glob');
const { Client } = require("discord.js")
const { devGuildID } = require("../config.json");
const Ascii = require("ascii-table");

module.exports = (client) => {
    /**
    * @param {Client} client
     */
    const public_CommandsArray = [];
    const dev_CommandsArray = [];

    const publicTable = new Ascii("Public Commands Loaded");
    const devTable = new Ascii("Developer Commands Loaded");

    glob(`${process.cwd()}/src/commands/**/*.js`, function(err, files) {
        files.map(async (file) => {
            const command = require(file);

            if(!command.name) {
                delete require.cache[require.resolve(file)];
                return console.log(`${file.split("/").pop()} does not have a command name! Removing the command.`)
            }

            if(command.public) {
                public_CommandsArray.push(command);
                await publicTable.addRow(command.name, "🔷 Successfully loaded command.")
            } else {
                dev_CommandsArray.push(command);
                await devTable.addRow(command.name, "🔷 Successfully loaded command.")
            }
            
            client.commands.set(command.name, command);
            delete require.cache[require.resolve(file)];
        });

        console.log(publicTable.toString());
        console.log(devTable.toString());

        client.on("ready", async () => {
            client.guilds.cache.forEach((g) => {
                if(g.id === devGuildID) g.commands.set(dev_CommandsArray);
                else g.commands.set(public_CommandsArray);
            })
        })
    });
}
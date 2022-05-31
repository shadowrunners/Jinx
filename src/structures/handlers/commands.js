const glob = require('glob');
const { Client } = require("discord.js")
const { devGuildID } = require(`${process.cwd()}/src/structures/config.json`)
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
                //console.log(blueBright(`Loaded ${command.name.toUpperCase()} from ${file.split("/").pop()}\n`))
            } else {
                dev_CommandsArray.push(command);
                await devTable.addRow(command.name, "🔷 Successfully loaded command.")
                //console.log(`Loaded ${command.name.toUpperCase()} from ${file.split("/").pop()}`)
            }
            
            client.commands.set(command.name, command);
            delete require.cache[require.resolve(file)];
        });

        console.log(publicTable.toString());
        console.log(devTable.toString());

        client.on("ready", async () => {
            client.publicCommands = public_CommandsArray;
            const guild = client.guilds.cache.get(devGuildID);
            if(guild) {
                await guild.commands.set(dev_CommandsArray);
                //console.log(`Loaded ${dev_CommandsArray.length} developer commands`);
            }
            await client.application.commands.set(public_CommandsArray);
            //console.log(`Loading ${public_CommandsArray.length} global commands`);
        });
    });
}
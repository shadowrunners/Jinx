const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require('fs');
const path = require('path');
require('colors');
const { token, clientID } = require('./config.json');

const commands = [];

readdirSync("./commands/").map(async dir => {
	readdirSync(`./commands/${dir}/`).map(async (cmd) => {
		commands.push(require(path.join(__dirname, `./commands/${dir}/${cmd}`)))
	})
})

const rest = new REST({ version: "9" }).setToken(token);

(async () => {
	try {
		console.log('Discord API >> Started refreshing application (/) commands.'.yellow);
		await rest.put(
			Routes.applicationCommands(clientID),
			{ body: commands },
		);
		console.log('Discord API >> Successfully reloaded application (/) commands.'.green);
	} catch (error) {
		console.error(error);
	}
})();
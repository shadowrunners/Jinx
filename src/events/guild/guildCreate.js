const { Guild, Client } = require("discord.js")
const { promisify } = require("util")
const { glob } = require("glob")
const PG = promisify(glob)

module.exports = {
  name: "guildCreate",
  /**
   * @param {Client} client 
   * @param {Guild} guild
   */
  async execute(guild, client) {
    CommandsArray = [];

    (await PG(`${process.cwd()}/src/commands/*/*.js`)).map(async (file) => {
      const command = require(file);

      client.commands.set(command.name, command);
      CommandsArray.push(command);
    });

    guild.commands.set(CommandsArray);
  }
};
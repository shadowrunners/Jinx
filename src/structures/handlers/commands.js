const { Perms } = require("../handlers/validation/permissions");
const { Client } = require("discord.js");

/**
 * @param {Client} client
 */
module.exports = async (client, PG, Ascii) => {
  const Table = new Ascii("Command Loaded");

  CommandsArray = [];

  (await PG(`${process.cwd()}/src/commands/*/*.js`)).map(async (file) => {
    const command = require(file);

    if (!command.name)
      return Table.addRow(command.name, "🔸 Failed", "Missing name.");

    if (!command.context && !command.description)
      return Table.addRow(command.name, "🔸 Failed", "Missing a description.");

    if (command.permission) {
      if (Perms.includes(command.permission)) command.defaultPermission = false;
      else
        return Table.addRow(command.name, "♦ Failed", "Permission is invalid.");
    }

    client.commands.set(command.name, command);
    CommandsArray.push(command);

    await Table.addRow(command.name, "🔷 Successfully loaded.");
  });

  console.log(Table.toString());
};

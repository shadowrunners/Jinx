const {
  Client,
  CommandInteraction,
  MessageEmbed,
  version: discordjsVersion,
} = require("discord.js");
const ms = require("pretty-ms");
const moment = require("moment");
const os = require("os");
const client = require("../../structures/index.js");

module.exports = {
  name: "about",
  description: "Displays information about Jinx.",
  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    const model = os.cpus()[0].model;
    const cores = os.cpus().length;
    const platform = os.platform();

    const botinfoEmbed = new MessageEmbed()
      .setTitle("Information about Jinx")
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setAuthor({
        name: client.user.username,
        iconURL: client.user.displayAvatarURL({ format: "png" }),
      })
      .setTimestamp()
      .setColor("BLURPLE")
      .addField(
        "> Statistics",
        `\`\`\`js\nUsername: ${client.user.username}\nStatus: ${status}\nCurrently in ${client.guilds.cache.size} servers.\n${client.guilds.cache.size} shard(s) are currently up and running.\`\`\``
      )
      .addField(
        "> System Information",
        `\`\`\`js\nNode: ${process.version}\nOS: ${process.platform}\nArch: ${
          process.arch
        }\nDiscord.js: ${discordjsVersion}\nDeveloper: scrappie#5451\nExisting since: ${moment
          .utc(client.user.createdAt)
          .format("dddd, MMMM Do YYYY")}\`\`\``
      )
      .addField(
        "> Hosting",
        `\`\`\`js\nWebSocket Ping: ${client.ws.ping}ms\nUptime: ${ms(
          client.uptime
        )}\nHost: EpikHost\nMemory : ${(
          process.memoryUsage().rss /
          1024 /
          1024
        ).toFixed(2)} MB\nCPU: ${model}\nCores: ${cores}\`\`\``
      );
    interaction.reply({ embeds: [botinfoEmbed] });
  },
};
let status;
switch (client.presence.status) {
  case "online":
    status = "Online";
    break;
  case "dnd":
    status = "DND";
    break;
  case "idle":
    status = "Idling";
    break;
  case "offline":
    status = "Offline";
    break;
}

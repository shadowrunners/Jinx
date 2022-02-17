const { CommandInteraction, Client, MessageEmbed, Guild } = require("discord.js");
const { connection } = require("mongoose");

module.exports = {
    name: "status",
    description: "Shows the bot's status.",
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const statusEmbed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setTitle("JinxStats")
            .setDescription(`**Client**: \`🔷 Online\` - \`${client.ws.ping}ms\`\n **Uptime**: <t:${parseInt(client.readyTimestamp / 1000)}:R>\n
            **Database**: \`${switchTo(connection.readyState)}\` \n \n **__Tools__**: \n - **Node.js**: \`${process.version}\`\n - **Discord.js**: \`${require("discord.js").version}\`\n - **MongoDB**: \`${require("mongoose").version}\`\n - **Mongoose**: \`${require("mongoose").version}\`\n`)
            .addField("**__Commands__**", `\`${client.commands.size}\` commands loaded.`, true)
            .addField("**__Guilds__**", `\`${client.guilds.cache.size}\` guilds connected.`, true)
            .addField("**__Users__**", `\`${client.users.cache.size}\` users connected.`, true)
            .setThumbnail(client.user.avatarURL({ format: "png", dynamic: true, size: 1024 }))
            .setTimestamp()
            .setFooter({text: "JinxStats"});

        interaction.reply({ embeds: [statusEmbed] });
    }
};

function switchTo(val) {
    var status = " ";
    switch (val) {
        case 0:
            status = "🟥 Disconnected";
            break;
        case 1:
            status = `🔷 Connected`
            break;
        case 2:
            status = `🟨 Connecting`
            break;
        case 3:
            status = `🟨 Disconnecting`
            break;
    }
    return status;
}
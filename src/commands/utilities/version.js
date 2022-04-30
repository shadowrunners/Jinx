const { CommandInteraction, Client, MessageEmbed } = require("discord.js");

module.exports = {
    name: "version",
    description: "Shows the version that the bot is currently running.",
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const verEmbed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setTitle("Jinx | Version")
            .setDescription("🔹 | Currently running version `v3.0.0 - Developer Preview 2`\n ⚠️ You are currently running a Developer Preview build of Jinx v3, so expect bugs. ⚠️")
            .setThumbnail(client.user.avatarURL({ format: "png", dynamic: true, size: 1024 }))
            .setTimestamp()
            .setFooter({text: "I love you. <3"});

        interaction.reply({ embeds: [verEmbed] });
    }
};

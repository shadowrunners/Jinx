const { Client, MessageEmbed, CommandInteraction } = require("discord.js");
const BDB = require("../../structures/schemas/blacklistDB.js"); // Blacklisted Users DB

module.exports = {
    name: "interactionCreate",
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if (interaction.isCommand() || interaction.isContextMenu()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return interaction.reply({
                embeds: [
                    new MessageEmbed()
                        .setColor("RED")
                        .setDescription("An error occured while running this command.")
                ]
            }) && client.commands.delete(interaction.commandName);

            if (command.permission) {
                if (!interaction.member.permissions.has(command.permission)) {
                    return interaction.reply({ content: `You do not have the required permission for this command: \`${interaction.commandName}\`.`, ephemeral: true })
                }
            }

            const blacklist = await BDB.findOne({ UserID: interaction.user.id });
            if (blacklist) {
                await interaction.reply({
                    embeds: [
                        new MessageEmbed()
                            .setColor("BLURPLE")
                            .setTitle(`${client.user.username} | Notice`)
                            .setDescription(`You have been permanently blacklisted from using ${client.user.username}.\n For further information, contact the bot owner.`)
                            .setFooter({ text: "If you believe this is a mistake, contact the bot owner." })
                            .setTimestamp()
                    ]
                });
            } else {
                command.execute(interaction, client)
            }
        }
    }
}

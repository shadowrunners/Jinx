const { Client, MessageEmbed, CommandInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if (client.maintenance && interaction.user.id != "292743562213457920") {
            const Response = new MessageEmbed()
                .setTitle("NOTICE")
                .setDescription("Jinx is currently in emergency maintenance mode. [Join the support server for updates.](https://discord.gg/HwkDSs7X82)")
                .setFooter({ text: "Take a break and have a coffee while we work." })
                .setColor("DARK_PURPLE")
            return interaction.reply({ embeds: [Response] })
        }

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

            command.execute(interaction, client);
        }
    }
}
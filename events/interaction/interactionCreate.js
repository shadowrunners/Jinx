const { Client, MessageEmbed, CommandInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        if (client.maintenance && interaction.user.id != "292743562213457920") {
            const Response = new MessageEmbed()
            .setTitle("Maintenance")
            .setDescription("Jinx is currently in maintenance mode.")
            .setColor("DARK_PURPLE")

            return interaction.reply({embeds: [Response]})
        }

        if(interaction.isCommand() || interaction.isContextMenu()) {
            const command = client.commands.get(interaction.commandName);
            if(!command) return interaction.reply({embeds: [
                new MessageEmbed()
                .setColor("RED")
                .setDescription("An error occured while running this command.")
            ]}) && client.commands.delete(interaction.commandName);

            command.execute(interaction, client);
        }
    }
}
const { ButtonInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * @param {ButtonInteraction} interaction
     */
    execute(interaction, client) {
        if(!interaction.isButton()) return;
        const button = client.buttons.get(interaction.customId);
        if(!button) return;

        const faeliureEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setTitle("You tried and failed miserably.")
            .setDescription(`You are missing the required permissions to use these buttons.`);

        if(button.permission && !interaction.member.permissions.has(button.permission)) 
            return interaction.reply({embeds: [faeliureEmbed], ephemeral: true});

        if(button.ownerOnly && interaction.member.id !== interaction.guild.ownerId) 
            return interaction.reply({embeds: [new MessageEmbed({color: "BLURPLE", description: `🔹 | Only the owner has access to these buttons.`, ephemeral: true})]})

        button.execute(interaction, client);
    }
}
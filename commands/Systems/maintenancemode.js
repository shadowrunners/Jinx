const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "maintenance",
    description: "Puts the bot in maintenance mode, available only for the bot owner.",
    /**
    * @param {CommandInteraction} interaction
    */
    execute(interaction, client) {
    
        if (client.maintenance === false && interaction.user.id == "292743562213457920") {
        client.maintenance = true;
            
        const maintenanceOn = new MessageEmbed()
        .setColor("DARK_PURPLE")
        .setTitle("🔹 | Maintenance mode is now on!")
        .setDescription(`The bot is currently in maintenance mode.`)
        .setTimestamp()
                
        return interaction.reply({ embeds: [maintenanceOn], fetchReply: true })
    }

        if (client.maintenance && interaction.user.id == "292743562213457920"){
        client.maintenance = false;

        const maintenanceOff = new MessageEmbed()
        .setColor("RED")
        .setTitle("🔹 | Maintenance mode is now off!")
        .setDescription("The bot is no longer in maintenance mode.")
        .setTimestamp()

        return interaction.reply({embeds: [maintenanceOff], fetchReply: true})
    }
        interaction.reply({ content: "You do not have acccess to this command!", fetchReply: true }).then(msg => {setTimeout(() => msg.delete(), 5000)});
    }
}
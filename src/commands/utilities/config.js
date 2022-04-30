const { CommandInteraction } = require("discord.js");
const muteDB = require('../../structures/schemas/muteDB.js')

module.exports = {
    name: "config",
    description: "Configure parts of the bot.",
    options: [
        {
            name: "setmuterole",
            description: "Set the mute role.",
            type: 1,
            options: [{ name: "role", description: "Provide the Muted role.", type: 8, required: true }]
        },
    ],
    /**
    * @param {CommandInteraction} interaction 
    */
    async execute(interaction) {
        const { options } = interaction;

        try {
            switch (options.getSubcommand()) {
                case "setmuterole": {
                    const role = options.getRole("role");
                    const data = await muteDB.findOne({Guild: interaction.guild.id})

                    if (!data) {
                        await muteDB.create({
                            Guild: interaction.guild.id,
                            Role: role.id
                        })
                        return interaction.reply({content: `🔹 | The mute role has been set to ${role.toString()}.`})
                    } else {
                        await muteDB.findOneAndUpdate({Guild: interaction.guild.id}, {Role: role.id})
                        return interaction.reply({content: `🔹 | The mute role has been changed to ${role.toString()}.`})
                    }
                }
            }
        } catch (e) {
            let errEmbed = new MessageEmbed()
                .setColor("BLURPLE")
                .setTitle("Uh oh...")
                .setDescription(`🔹 | An error has occured. ${e} \nReport this issue to scrappie in the [Black Hawk Support Server.](https://discord.gg/HwkDSs7X82)`)
                .setFooter({ text: "Don't worry as long as you're not scrappie." })
            return interaction.reply({ embeds: [errEmbed] })
        }
    }
}
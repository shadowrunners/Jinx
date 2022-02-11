const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const superagent = require("superagent");

// Credits to Ureshi#9090 for the original /hug command which I used as a template for all of these emotion commands.

module.exports = {
    name: "lick",
    description: "Lick someone.",
    options: [
        {
            name: "target",
            description: "Provide a target.",
            type: "USER",
            required: true,
        },
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const lickEmbed = new MessageEmbed()
        .setColor("BLURPLE")
        .setTitle("Uh oh..")
        .setDescription("🔹 | This command has been disabled globally by a system admin.")
        .setTimestamp()

        interaction.reply({embeds: [lickEmbed]});
    },
};
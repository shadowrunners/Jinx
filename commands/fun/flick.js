const { CommandInteraction, MessageEmbed, Client } = require("discord.js");
const superagent = require("superagent");

// Credits to Ureshi#9090 for the original /hug command which I used as a template for all of these emotion commands.

module.exports = {
    name: "testlick",
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
        const target = interaction.options.getMember("target");
            await target.user.fetch();
        const { body } = await superagent.get("https://api.waifu.pics/sfw/lick");

        if (target.id === interaction.user.id)
        return interaction.reply({ content: "Friend, don't go that low, please. <:peepo_stare:640305010135007255>" });

        const lickEmbed = new MessageEmbed()
        .setColor("BLURPLE")
        .setAuthor({name: `${interaction.user.username} licks ${target.user.username}!`, iconURL: `${target.user.avatarURL({dynamic: true})}`})
        .setImage(body.url)
        .setTimestamp()

        interaction.reply({embeds: [lickEmbed]});
    },
};
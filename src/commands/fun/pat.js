const { CommandInteraction, MessageEmbed } = require("discord.js");
const superagent = require("superagent");

// Credits to Ureshi#9090 for the original /hug command which I used as a template for all of these emotion commands.

module.exports = {
    name: "pat",
    description: "Pat someone.",
    public: true,
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
        const { body } = await superagent.get("https://api.waifu.pics/sfw/pat");

        if (target.id === interaction.user.id)
        return interaction.reply({ content: "I can pat you instead. ^-^", ephemeral: true });

        const lickEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setAuthor({name: `${interaction.user.username} pats ${target.user.username}!`, iconURL: `${target.user.avatarURL({dynamic: true})}`})
            .setImage(body.url)
            .setTimestamp()
        interaction.reply({embeds: [lickEmbed]});
    }
}
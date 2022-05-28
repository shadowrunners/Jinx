const { CommandInteraction, MessageEmbed } = require("discord.js");
const superagent = require("superagent");

// Credits to Ureshi#9090 for the original /hug command which I used as a template for all of these emotion commands.

module.exports = {
    name: "wave",
    description: "Wave at someone.",
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
        const { body } = await superagent.get("https://api.waifu.pics/sfw/wave");

        if (target.id === interaction.user.id)
        return interaction.reply({ content: "Why would you wanna wave at yourself?", ephemeral: true });

        const waveEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setAuthor({name: `${interaction.user.username} waves at ${target.user.username}!`, iconURL: `${target.user.avatarURL({dynamic: true})}`})
            .setImage(body.url)
            .setTimestamp()
        interaction.reply({embeds: [waveEmbed]});
    }
}
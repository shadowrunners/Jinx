const { CommandInteraction, MessageEmbed } = require("discord.js");
const superagent = require("superagent");

// Credits to Ureshi#9090 for the original /hug command which I used as a template for all of these emotion commands.

module.exports = {
    name: "highfive",
    description: "Highfive someone.",
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
        const { body } = await superagent.get("https://api.waifu.pics/sfw/highfive");

        const yourselfEmbed = new MessageEmbed()
        .setAuthor({
          name: `${interaction.user.username} highfives... themselves? I can do that with you instead if you want. ^-^`,
          iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
        })
        .setImage(body.url)
        .setTimestamp();
    
      if (target.id === interaction.user.id)
        return interaction.reply({ embeds: [yourselfEmbed] });

        const highfiveEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setAuthor({name: `${interaction.user.username} highfives ${target.user.username}!`, iconURL: `${target.user.avatarURL({dynamic: true})}`})
            .setImage(body.url)
            .setTimestamp()
        interaction.reply({embeds: [highfiveEmbed]});
    }
}
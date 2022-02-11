const { CommandInteraction, MessageEmbed } = require("discord.js");
const superagent = require("superagent");

// Credits to Ureshi#9090 for the original /hug command which I used as a template for all of these emotion commands.

module.exports = {
  name: "slap",
  description: "Slap someone.",
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
    const { body } = await superagent.get("https://api.waifu.pics/sfw/slap");

    if (target.id === interaction.user.id)
    return interaction.reply({ content: "Why would you wanna slap yourself, friend?", ephemeral: true });

    const slapEmbed = new MessageEmbed()
      .setColor("BLURPLE")
      .setAuthor({
        name: `${interaction.user.username} slaps ${target.user.username}!`,
        iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
      })
      .setImage(body.url)
      .setTimestamp();
    interaction.reply({ embeds: [slapEmbed] });
  },
};

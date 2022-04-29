const { CommandInteraction, MessageEmbed } = require("discord.js");
const superagent = require("superagent");

// Credits to Ureshi#9090 for the original /hug command which I used as a template for all of these emotion commands.

module.exports = {
  name: "bonk",
  description: "Bonk someone.",
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
    const { body } = await superagent.get("https://api.waifu.pics/sfw/bonk");

    const yourselfEmbed = new MessageEmbed()
      .setAuthor({
        name: `${interaction.user.username} bonks... themselves?`,
        iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
      })
      .setImage(body.url)
      .setTimestamp();

    if (target.id === interaction.user.id)
      return interaction.reply({ embeds: [yourselfEmbed] });

    const bonkEmbed = new MessageEmbed()
      .setColor("BLURPLE")
      .setAuthor({
        name: `${interaction.user.username} bonks ${target.user.username}!`,
        iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
      })
      .setImage(body.url)
      .setTimestamp();
    interaction.reply({ embeds: [bonkEmbed] });
  },
};

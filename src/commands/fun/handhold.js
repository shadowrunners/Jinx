const { CommandInteraction, MessageEmbed } = require("discord.js");
const superagent = require("superagent");

// Credits to Ureshi#9090 for the original /hug command which I used as a template for all of these emotion commands.

module.exports = {
  name: "handhold",
  description: "Hold hands with someone.",
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
    const { body } = await superagent.get("https://api.waifu.pics/sfw/handhold");

    const yourselfEmbed = new MessageEmbed()
    .setAuthor({
      name: `${interaction.user.username} holds... their own hands? I can do that with you if you want. ^-^`,
      iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
    })
    .setImage(body.url)
    .setTimestamp();

  if (target.id === interaction.user.id)
    return interaction.reply({ embeds: [yourselfEmbed] });

    const handholdEmbed = new MessageEmbed()
      .setColor("BLURPLE")
      .setAuthor({
        name: `${interaction.user.username} is holding hands with ${target.user.username}!`,
        iconURL: `${interaction.user.avatarURL({ dynamic: true })}`,
      })
      .setImage(body.url)
      .setTimestamp();
    interaction.reply({ embeds: [handholdEmbed] });
  },
};

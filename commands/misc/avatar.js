const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Get a person's avatar.",
  options: [
    {
      name: "target",
      description: "Provide a target.",
      type: "USER",
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const target =
      interaction.options.getMember("target") || interaction.member;
    await target.user.fetch();

    const avatarEmbed = new MessageEmbed()
      .setColor("BLURPLE")
      .setTitle(`${target.user.tag}'s Avatar`)
      .setImage(target.user.avatarURL({ dynamic: true, size: 2048 }))
      .setURL(target.avatarURL());
    interaction.reply({ embeds: [avatarEmbed] });
  },
};

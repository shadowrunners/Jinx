const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "unban",
  description: "Unban a user.",
  permission: "BAN_MEMBERS",
  public: true,
  options: [
    {
      name: "targetid",
      description: "Provide the ID of the person you banned.",
      type: "STRING",
      required: true,
    },
  ],
  /**
  * @param {CommandInteraction} interaction 
  */
  execute(interaction) {
    const targetID = interaction.options.getString("targetid");

    const unbanEmbed = new MessageEmbed()
      .setColor("BLURPLE")
      .setDescription(
        `🔹 | This person has been unbanned.`
      );

    const failEmbed = new MessageEmbed()
      .setColor("BLURPLE")
      .setDescription(`🔹 | Please provide a valid ID of a banned member.`);

    interaction.guild.members
      .unban(targetID)
      .then((user) => {
        interaction.reply({ embeds: [unbanEmbed], ephemeral: true });
      })
      .catch(() => {
        interaction.reply({ embeds: [failEmbed], ephemeral: true });
      });
  },
};

const { CommandInteraction, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "phcomment",
  description: "Write a spicy PH comment on your behalf.",
  options: [
    {
      name: "text",
      description: "Provide the text for the comment.",
      type: "STRING",
      required: true,
    },
  ],
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const text = interaction.options.getString("text");

    fetch(`https://nekobot.xyz/api/imagegen?type=phcomment&username=${interaction.user.username}&image=${interaction.user.avatarURL({ format: "png", size: 512 })}&text=${text}`)
    
    .then(function(result) { return result.json(); })
    .then(function(data) {
        const phEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setAuthor({name: "Here's your PH comment, you horny little shit."})
            .setImage(data.message)
            .setTimestamp()
          return interaction.reply({ embeds: [phEmbed] });
    });
  },
};


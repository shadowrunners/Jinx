const { CommandInteraction, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "tweet",
  description: "Tweet something about someone.",
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
    await interaction.deferReply({})
    const text = interaction.options.getString("text");

    //var responses = [
      //"Friend, I'm gonna be honest with you. `*breaths in*` Your comment is complete ass.",
      //"Friend, you're a genius. This comment is literally as perfect as you.",
      //"Bestie, what the fuck is this?",
      //"Friend, to be completely honest, this comment is why your mother considered putting you up for adoption.",
  //];

    fetch(`https://nekobot.xyz/api/imagegen?type=tweet&username=${interaction.user.username}&text=${text}`)
    
    .then(function(result) { return result.json(); })
    .then(function(data) {
        const tweetEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setImage(data.message)
            .setTimestamp()
        interaction.editReply({embeds: [tweetEmbed]})
    });
  },
};


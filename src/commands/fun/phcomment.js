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

    //var responses = [
      //"Friend, I'm gonna be honest with you. `*breaths in*` Your comment is complete ass.",
      //"Friend, you're a genius. This comment is literally as perfect as you.",
      //"Bestie, what the fuck is this?",
      //"Friend, to be completely honest, this comment is why your mother considered putting you up for adoption.",
  //];

    fetch(`https://nekobot.xyz/api/imagegen?type=phcomment&username=${interaction.user.username}&image=${interaction.user.avatarURL({ format: "png", size: 512 })}&text=${text}`)
    
    .then(function(result) { return result.json(); })
    .then(function(data) {
        const phEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setAuthor({name: "Here's your PH comment, you horny little shit."})
            .setImage(data.message)
            .setTimestamp()
          return interaction.reply({ embeds: [phEmbed]} ) //content: responses[Math.floor(Math.random() * responses.length)],
    });
  },
};


const { CommandInteraction, Message, Client, MessageAttachment, Discord } = require('discord.js');
const { Canvas } = require('canvacord');
 
module.exports = {
    name: "spank",
    description: "spank ur bestie",
    options: [
        {
            name: "targetuser",
            description: "Provide a target.",
            type: "USER",
            required: true
        },
    ],

    /**
    * @param {CommandInteraction} interaction
    * @param {Message} message
    * @param {Client} client
    */

     async execute(interaction, message, client) {
        const { options } = interaction
         const spuser = options.getUser("targetuser");
         const avatar = spuser.displayAvatarURL({ format: 'png' });
         const image = await Canvas.spank(interaction.user.displayAvatarURL({ format: "png"}), avatar);
         const attachment = new MessageAttachment(image, "spank.gif");

         interaction.reply({ files: [attachment]})

     },
};
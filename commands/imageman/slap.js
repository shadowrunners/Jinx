const { CommandInteraction, Message, Client, MessageAttachment, Discord } = require('discord.js');
const { Canvas } = require('canvacord');
 
module.exports = {
    name: "slap",
    description: "slap ur bestie",
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
         const suser = options.getUser("targetuser");
         const avatar = suser.displayAvatarURL({ format: 'png' });
         const image = await Canvas.slap(interaction.user.displayAvatarURL({ format: "png"}), avatar);
         const attachment = new MessageAttachment(image, "slap.gif");

         interaction.reply({ files: [attachment]})
     },
};

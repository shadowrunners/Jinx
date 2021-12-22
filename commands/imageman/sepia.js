const { CommandInteraction, MessageEmbed, Client, MessageAttachment } = require('discord.js');
const { Canvas } = require('canvacord');
 
module.exports = {
    name: "sepia",
    description: "sEPIA",
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
    */

     async execute(interaction) {
        const { options } = interaction
         const ssuser = options.getUser("targetuser");
         const avatar = ssuser.displayAvatarURL({ format: 'png' });
         const image = await Canvas.sepia(avatar);
         const attachment = new MessageAttachment(image, "sepia.gif");

         interaction.reply({ files: [attachment]})
     },
};
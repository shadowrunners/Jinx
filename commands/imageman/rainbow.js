const { CommandInteraction, MessageEmbed, Client, MessageAttachment } = require('discord.js');
const { Canvas } = require('canvacord');
 
module.exports = {
    name: "rainbow",
    description: "rgb",
    options: [
        {
            name: "target",
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
         const rgbuser = options.getUser("target");
         const avatar = rgbuser.displayAvatarURL({ format: 'png' });
         const image = await Canvas.rainbow(avatar);
         const attachment = new MessageAttachment(image, "rainbow.gif");

         interaction.reply({ files: [attachment]})
     },
};
const { CommandInteraction, MessageEmbed, Client, MessageAttachment } = require('discord.js');
const { Canvas } = require('canvacord');
 
module.exports = {
    name: "shit",
    description: "ew shit",
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
        const suser = options.getUser("targetuser");
        const avatar = suser.displayAvatarURL({ format: 'png' });
        const image = await Canvas.shit(avatar);
        const attachment = new MessageAttachment(image, "shit.gif");

        interaction.reply({ files: [attachment]})
     },
};
const { CommandInteraction, MessageEmbed, Client, MessageAttachment } = require('discord.js');
const { Canvas } = require('canvacord');
 
module.exports = {
    name: "rip",
    description: "wasted but more ded",
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
        const ripuser = options.getUser("targetuser");
        const avatar = ripuser.displayAvatarURL({ format: 'png' });
        const image = await Canvas.rip(avatar);
        const attachment = new MessageAttachment(image, "rip.gif");

        interaction.reply({ files: [attachment]})
     },
};
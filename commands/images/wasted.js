const { CommandInteraction, MessageEmbed, Client, MessageAttachment } = require('discord.js');
const { Canvas } = require('canvacord');
 
module.exports = {
    name: "wasted",
    description: "ded",
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
        const wasteduser = options.getUser("targetuser");
        const avatar = wasteduser.displayAvatarURL({ format: 'png' });
        const image = await Canvas.wasted(avatar);
        const attachment = new MessageAttachment(image, "wasted.gif");

        interaction.reply({ files: [attachment]})
     },
};
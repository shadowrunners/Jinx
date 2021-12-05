const { CommandInteraction, MessageEmbed, Client, MessageAttachment } = require('discord.js');
const { Canvas } = require('canvacord');

module.exports = {
    name: "trash",
    description: "literally trash",
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
        const tuser = options.getUser("targetuser");
        const avatar = tuser.displayAvatarURL({ format: 'png' });
        const image = await Canvas.trash(avatar);
        const attachment = new MessageAttachment(image, "trash.gif");

        interaction.reply({ files: [attachment] })
    },
};
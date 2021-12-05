const { CommandInteraction, MessageEmbed, Client, MessageAttachment } = require('discord.js');
const { Canvas } = require('canvacord');
 
module.exports = {
    name: "wanted",
    description: "man's wanted",
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
        const wanteduser = options.getUser("targetuser");
        const avatar = wanteduser.displayAvatarURL({ format: 'png' });
        const image = await Canvas.wanted(avatar);
        const attachment = new MessageAttachment(image, "wanted.gif");

        interaction.reply({ files: [attachment]})
     },
};
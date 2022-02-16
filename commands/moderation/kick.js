const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "kick",
    description: "Kick someone.",
    permission: "KICK_MEMBERS",
    options: [
        {
            name: "target",
            description: "Specify a target.",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "Type the reason for the kick.",
            type: "STRING",
            required: false
        },
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const guild = interaction;
        const target = interaction.options.getMember("target");
        const reason = interaction.options.getString("reason") || "No reason specified.";

        const higherEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription("You can't kick someone with a role higher than yours.")
        
        const successEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`${target.user.tag} has been kicked for ${reason}`);

        const kickedEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`You have been kicked from ${interaction.guild.name} for ${reason}`)

        if(target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({embeds: [higherEmbed], ephemeral: true});
            //await target.send(`You have been kicked from ${interaction.guild.name} for ${reason}`);
            await target.send({embeds: [kickedEmbed]})

        target.kick(reason);
        
    return interaction.reply({embeds: [successEmbed]});
    },
};

const { Client, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ban",
    description: "Ban someone.",
    permission: "BAN_MEMBERS",
    options: [
        {
            name: "target",
            description: "Specify a target.",
            type: "USER",
            required: true
        },
        {
            name: "reason",
            description: "Type the reason for the ban.",
            type: "STRING",
            required: false
        },
    ],
    /**
    * @param {CommandInteraction} interaction 
    * @param {Client} client 
    */
    async execute(interaction, client) {
        const target = interaction.options.getMember("target");
        const reason = interaction.options.getString("reason") || "No reason specified.";

        const higherEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription("You can't ban someone with a role higher than yours.")
        
            const successEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`${target.user.tag} has been banned for ${reason}`);

        const bannedEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`You have been banned from ${interaction.guild.name} for ${reason}`)

        if(target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({embeds: [higherEmbed], ephemeral: true});
            await target.send({embeds: [bannedEmbed]})

        target.ban({reason});
        
    return interaction.reply({embeds: [successEmbed]});
    },
};

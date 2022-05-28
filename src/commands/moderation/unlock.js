const { CommandInteraction, MessageEmbed } = require("discord.js");
const DB = require("../../structures/schemas/lockdownDB.js");

module.exports = {
    name: "unlock",
    description: "Lifts the quarantine off a channel.",
    permission: 'MANAGE_CHANNELS',
    public: true,
    /**
    * @param {CommandInteraction} interaction 
    */
    async execute(interaction) {
        const { guild, channel } = interaction;
        const Embed = new MessageEmbed()

        if(channel.permissionsFor(guild.id).has("SEND_MESSAGES")) return interaction.reply({embeds: [Embed.setColor("BLURPLE").setDescription("🔹 | This channel is not under quarantine.")]});
        channel.permissionOverwrites.edit(guild.id, {
            SEND_MESSAGES: null,
        })

        await DB.deleteOne({ChannelID: channel.id});
        interaction.reply({embeds: [Embed.setColor("BLURPLE").setDescription("🔹 | Quarantine has been lifted.")]});
    }
}
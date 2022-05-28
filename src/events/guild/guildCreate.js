const { Client, Guild, MessageEmbed } = require("discord.js")

module.exports = {
    name: "guildCreate",
    once: false,
    /**
     * @param {Client} client 
     * @param {Guild} guild
     */

    async execute(guild, client) {
        console.log(`Joined ${guild.name} | ${guild.id}`);
        await guild.commands.set(client.publicCommands);

        try { 
            guild.members.cache.get(guild.ownerId)?.send({ embeds: [new MessageEmbed()
                .setColor("GREEN")
                .setTitle("Hey 👋, thanks for inviting me to your server!")
                .setDescription("If you need help setting me up use `/help`!")
            ]})
        } catch(err) {};
    },
};
const { Client, Guild, MessageEmbed } = require("discord.js")

module.exports = {
    name: "guildCreate",
    once: false,
    /**
     * @param {Client} client 
     * @param {Guild} guild
     */

    async execute(guild, client) {
        await guild.commands.set(client.publicCommands);

        try { 
            guild.members.cache.get(guild.ownerId)?.send({ embeds: [new MessageEmbed()
                .setColor("BLURPLE")
                .setTitle("Hiya! Thanks for inviting Jinx to your server!")
                .setDescription("We hope you have a fun time!\n\nIf you have any questions, feel free to join our support server [here](https://discord.gg/HwkDSs7X82).")
            ]})
        } catch(err) {};
    },
};
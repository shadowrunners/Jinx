const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const superagent = require("superagent");

// Credits to Ureshi#9090 for the original /hug command which I used as a template for all of these emotion commands.

module.exports = {
    name: "kiss",
    description: "Kiss someone.",
    public: true,
    options: [
        {
            name: "target",
            description: "Provide a target.",
            type: "USER",
            required: true,
        },
    ],
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const target = interaction.options.getMember("target");
            await target.user.fetch();
        const { body } = await superagent.get("https://api.waifu.pics/sfw/kiss");

        var responses = [
            "Shush friend, we both know you're lonely as fuck. Instead of exposing your loneliness to others, just let me kiss you instead.",
            "If you need a friend, I'm here. <3",
            "Friend, you really are this sad. Come here. "
        ]

        if (target.id === interaction.user.id) {
            const selfkissEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setAuthor({name: `${client.user.username} kisses ${target.user.username}!`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
            .setImage(body.url)
            .setTimestamp()
            return interaction.reply({content: responses[Math.floor(Math.random() * responses.length)], embeds: [selfkissEmbed]});
        }

        if (interaction.user.id === "706135795991445604") {
            const eg1Embed = new MessageEmbed()
            .setColor("BLURPLE")
            .setAuthor({name: `what a cutie`, iconURL: `${client.user.avatarURL({dynamic: true})}`})
            .setImage(body.url)
            .setTimestamp()
            return interaction.reply({content: responses[Math.floor(Math.random() * responses.length)], embeds: [eg1Embed]});
        }

        if (target.id !== interaction.user.id) {
            const kissEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setAuthor({name: `${interaction.user.username} kisses ${target.user.username}!`, iconURL: `${target.user.avatarURL({dynamic: true})}`})
            .setImage(body.url)
            .setTimestamp()
            return interaction.reply({embeds: [kissEmbed]});
        }
    }
}
const { Client, CommandInteraction } = require("discord.js");
const { DiscordTogether } = require("discord-together");

module.exports = {
    name: 'activity',
    description: "Run activities with your homies.",
    options: [
        {
            name: "activity",
            description: "Select an activity.",
            type: "STRING",
            required: true,
            choices: [
                {
                    name: "youtube",
                    value: "youtube"
                },
                {
                    name: "chess",
                    value: "chess"
                },
                {
                    name: "checkers",
                    value: "checkers"
                },
                {
                    name: "betrayal",
                    value: "betrayal"
                },
                {
                    name: "poker",
                    value: "poker"
                },
                {
                    name: "fish",
                    value: "fish"
                },
                {
                    name: "lettertile",
                    value: "lettertile"
                },
                {
                    name: "wordsnack",
                    value: "wordsnack"
                },
                {
                    name: "doodlecrew",
                    value: "doodlecrew"
                },
                {
                    name: "spellcast",
                    value: "spellcast"
                },
                {
                    name: "awkword",
                    value: "awkword"
                },
            ]
        }
    ],
    /**
    * @param {CommandInteraction} interaction
    * @param {Client} client
    */
    async execute(interaction, client) {
        const choices = interaction.options.getString("activity");
        const { options, member, guild, channel } = interaction;

        switch(choices) {
            case "youtube": {
                const connected = member.voice.channel;

                if(!connected) return interaction.reply({content: "You aren't connected to a voice channel, join a voice channel to create a YouTube Together invite!"})
                client.DiscordTogether.createTogetherCode(interaction.member.voice.channelId, 'youtube').then(async invite => {
                    interaction.reply({ content: `Click the link to join the activity: ${invite.code}`})
                })
            }
            break;
            case "chess": {
                const connected = member.voice.channel;

                if(!connected) return interaction.reply({content: "You aren't connected to a voice channel, join a voice channel to create a Chess in the Park invite!"})
                client.DiscordTogether.createTogetherCode(interaction.member.voice.channelId, 'chess').then(async invite => {
                    interaction.reply({ content: `Click the link to join the activity: ${invite.code}`})
                })
            }
            break;
            case "checkers": {
                const connected = member.voice.channel;

                if(!connected) return interaction.reply({content: "You aren't connected to a voice channel, join a voice channel to create a Checkers in the Park invite!"})
                client.DiscordTogether.createTogetherCode(interaction.member.voice.channelId, 'checkers').then(async invite => {
                    interaction.reply({ content: `Click the link to join the activity: ${invite.code}`})
                })
            }
            break;
            case "betrayal": {
                const connected = member.voice.channel;

                if(!connected) return interaction.reply({content: "You aren't connected to a voice channel, join a voice channel to create a Betrayal.io invite!"})
                client.DiscordTogether.createTogetherCode(interaction.member.voice.channelId, 'betrayal').then(async invite => {
                    interaction.reply({ content: `Click the link to join the activity: ${invite.code}`})
                })
            }
            break;
            case "poker": {
                const connected = member.voice.channel;

                if(!connected) return interaction.reply({content: "You aren't connected to a voice channel, join a voice channel to create a Poker Night invite!"})
                client.DiscordTogether.createTogetherCode(interaction.member.voice.channelId, 'poker').then(async invite => {
                    interaction.reply({ content: `Click the link to join the activity: ${invite.code}`})
                })
            }
            break;
            case "fish": {
                const connected = member.voice.channel;

                if(!connected) return interaction.reply({content: "You aren't connected to a voice channel, join a voice channel to create a Fishington.io invite!"})
                client.DiscordTogether.createTogetherCode(interaction.member.voice.channelId, 'fishing').then(async invite => {
                    interaction.reply({ content: `Click the link to join the activity: ${invite.code}`})
                })
            }
            break;
            case "lettertile": {
                const connected = member.voice.channel;

                if(!connected) return interaction.reply({content: "You aren't connected to a voice channel, join a voice channel to create a Letter Tile invite!"})
                client.DiscordTogether.createTogetherCode(interaction.member.voice.channelId, 'lettertile').then(async invite => {
                    interaction.reply({ content: `Click the link to join the activity: ${invite.code}`})
                })
            }
            break;
            case "wordsnack": {
                const connected = member.voice.channel;

                if(!connected) return interaction.reply({content: "You aren't connected to a voice channel, join a voice channel to create a Word Snacks invite!"})
                client.DiscordTogether.createTogetherCode(interaction.member.voice.channelId, 'wordsnack').then(async invite => {
                    interaction.reply({ content: `Click the link to join the activity: ${invite.code}`})
                })
            }
            break;
            case "doodlecrew": {
                const connected = member.voice.channel;

                if(!connected) return interaction.reply({content: "You aren't connected to a voice channel, join a voice channel to create a Doodle Crew invite!"})
                client.DiscordTogether.createTogetherCode(interaction.member.voice.channelId, 'doodlecrew').then(async invite => {
                    interaction.reply({ content: `Click the link to join the activity: ${invite.code}`})
                })
            }
            break;
            case "spellcast": {
                const connected = member.voice.channel;

                if(!connected) return interaction.reply({content: "You aren't connected to a voice channel, join a voice channel to create a SpellCast invite!"})
                client.DiscordTogether.createTogetherCode(interaction.member.voice.channelId, 'spellcast').then(async invite => {
                    interaction.reply({ content: `Click the link to join the activity: ${invite.code}`})
                })
            }
            break;
            case "awkword": {
                const connected = member.voice.channel;

                if(!connected) return interaction.reply({content: "You aren't connected to a voice channel, join a voice channel to create a Awkword invite!"})
                client.DiscordTogether.createTogetherCode(interaction.member.voice.channelId, 'awkword').then(async invite => {
                    interaction.reply({ content: `Click the link to join the activity: ${invite.code}`})
                })
            }
            break;
        }
    } 
}
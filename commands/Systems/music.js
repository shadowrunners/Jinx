const { CommandInteraction, MessageEmbed, Client } = require('discord.js');
const { disconnect } = require('mongoose');

module.exports = {
    name: "music",
    description: "A complete music system",
    options: [
        {
            name: "play",
            description: "Plays a song.",
            type: "SUB_COMMAND",
            options: [{ name: "query", description: "Provide the name of the song or URL.", type: "STRING", required: true}]
        },
        {
            name: "volume",
            description: "Alter the volume.",
            type: "SUB_COMMAND",
            options: [{ name: "percent", description: "10 = 10%", type: "NUMBER", required: true}]
        },
        {
            name: "seek",
            description: "Seeks the song to the specified position.",
            value: "seek",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "time",
                    description: "Provide a position (in seconds) to seek.",
                    type: "NUMBER",
                    required: true
                },
            ]
        },
        {
            name: "filters",
            description: "Toggle filters.",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "set",
                    description: "Choose a filter.",
                    type: "STRING",
                    required: true,
                    choices: [
                        {name: "🔹 | Turn off all filters.", value: "false"},
                        {name: "🔹 | 8D Filter", value: "8d"},
                        {name: "🔹 | Bass Boost Filter", value: "bassboost"},
                        {name: "🔹 | Echo Filter", value: "echo"},
                        {name: "🔹 | Nightcore Filter", value: "nightcore"},
                        {name: "🔹 | Surround Filter", value: "surround"},
                        {name: "🔹 | Karaoke Filter", value: "karaoke"},
                        {name: "🔹 | Vaporwave Filter", value: "vaporwave"},
                        {name: "🔹 | Flanger Filter", value: "flanger"},
                        {name: "🔹 | Gate Filter", value: "gate"},
                        {name: "🔹 | Haas Filter", value: "haas"},
                        {name: "🔹 | Reverse Filter", value: "reverse"},
                        {name: "🔹 | Mcompand Filter", value: "mcompand"},
                        {name: "🔹 | Phaser Filter", value: "phaser"},
                        {name: "🔹 | Tremolo Filter", value: "tremolo"},
                        {name: "🔹 | EarWax Filter", value: "earwax"},
                    ],
                }
            ]
        },
        {
            name: "settings",
            description: "Select an option",
            type: "SUB_COMMAND",
            options: [{ name: "options", description: "Select an option.", type: "STRING", required: true,
            choices: [
                {name: "🔹| View Queue", value: "queue"},
                {name: "🔹| Skip", value: "skip"},
                {name: "🔹| Pause", value: "pause"},
                {name: "🔹| Resume", value: "resume"},
                {name: "🔹| Stop", value: "stop"},
                {name: "🔹| Shuffle", value: "shuffle"},
                {name: "🔹| Toggle AutoPlay", value: "AutoPlay"},
                {name: "🔹| Add a Related Song", value: "RelatedSong"},
                {name: "🔹| Repeat", value: "RepeatMode"},
            ]}]
        }
    ],
    /**
     * @param {CommandInteraction} interaction 
     * @param {Client} client 
     */
    async execute(interaction, client) {
        const { options, member, guild, channel } = interaction;
        const VoiceChannel = member.voice.channel;
        
        if(!VoiceChannel)
        return interaction.reply({content: "You aren't in a voice channel. Join one to be able to play music!", ephemeral: true});

        if(guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
        return interaction.reply({content: `I'm already playing music in <#${guild.me.voice.channelId}>.`, ephemeral: true});

        try {
            switch(options.getSubcommand()) {
                case "play": {
                    client.distube.play(VoiceChannel, options.getString("query"), { textChannel: channel, member: member });
                    return interaction.reply({content: "🎧 Music request received, asking MusicMan to start playing."});
                }
                case "volume": {
                    const Volume = options.getNumber("percent");
                    if(Volume > 100 || Volume < 1)
                    return interaction.reply({content: "🔹 | You have to specify a number between 1-100."});

                    client.distube.setVolume(VoiceChannel, Volume)
                    return interaction.reply({content: `🔹 | Volume has been set to \`${Volume}%\``});
                }
                case "settings": {
                    const queue = await client.distube.getQueue(VoiceChannel);

                    if(!queue)
                    return interaction.reply({content: "🔹 | Queue is empty."});

                    switch(options.getString("options")) {
                        case "skip": 
                        await queue.skip(VoiceChannel);
                        return interaction.reply({content: "🔹 | Song skipped."})

                        case "stop":
                        await queue.stop(VoiceChannel);
                        return interaction.reply({content: "🔹 | Music stopped."});

                        case "pause":
                        await queue.pause(VoiceChannel);
                        return interaction.reply({content: "🔹 | Song paused."});

                        case "resume":
                        await queue.resume(VoiceChannel);
                        return interaction.reply({content: "🔹 | Music has been resumed."});

                        case "shuffle":
                        await queue.shuffle(VoiceChannel);
                        return interaction.reply({content: "🔹 | Queue shuffled."});
                        
                        case "AutoPlay":
                        let Mode = await queue.toggleAutoplay(VoiceChannel);
                        return interaction.reply({content: `🔹 | AutoPlay Mode is set to: ${Mode ? "On" : "Off"}`});
                        
                        case "RelatedSong":
                        await queue.addRelatedSong(VoiceChannel);
                        return interaction.reply({content: "🔹 | A related song has been added to the queue."});
                                   
                        case "RepeatMode":
                        let Mode2 = await client.distube.setRepeatMode(queue);
                        return interaction.reply({content: `🔹 | Repeat Mode is set to: ${Mode2 = Mode2 ? Mode2 == 2 ? "Queue" : "Song" : "Off"}`});

                        case "queue":
                        return interaction.reply({embeds: [new MessageEmbed()
                        .setColor("DARK_PURPLE")
                        .setDescription(`${queue.songs.slice(0, 10).map(
                            (song, id) => `\n**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``)}`)]});
                    } try {

                    } catch (err) {
                         const err2Embed = new MessageEmbed()
                            .setColor("RED")
                            .setDescription(`⚠ An error has occured: ${e}`)
                            return interaction.reply({embeds: [err2Embed]});
                    }
                    return;
                }
                case "filters": {
                    const queue = await client.distube.getQueue(VoiceChannel);
                    if(!queue) return interaction.reply({content: "🔹 | Queue is empty."});

                    switch(options.getString("set")) {
                        case "false" : 
                        await queue.setFilter(false);
                        return interaction.reply({content: `🔹 | Disabled all applied filters.`});

                        case "8d" : 
                        await queue.setFilter(`3d`);
                        return interaction.reply({content: `🔹 | Toggled the 8D filter.`});

                        case "karaoke" : 
                        await queue.setFilter(`karaoke`);
                        return interaction.reply({content: `🔹 | Toggled the Karaoke filter.`});
                        
                        case "vaporwave" : 
                        await queue.setFilter(`vaporwave`);
                        return interaction.reply({content: `🔹 | Toggled the Vaporwave filter.`});

                        case "flanger" : 
                        await queue.setFilter(`flanger`);
                        return interaction.reply({content: `🔹 | Toggled the Flanger filter.`});

                        case "gate" : 
                        await queue.setFilter(`gate`);
                        return interaction.reply({content: `🔹 | Toggled the Gate filter.`});

                        case "haas" : 
                        await queue.setFilter(`haas`);
                        return interaction.reply({content: `🔹 | Toggled the Haas filter.`});

                        case "reverse" : 
                        await queue.setFilter(`reverse`);
                        return interaction.reply({content: `🔹 | Toggled the Reverse filter.`});

                        case "mcompand" : 
                        await queue.setFilter(`mcompand`);
                        return interaction.reply({content: `🔹 | Toggled the Mcompand filter.`});

                        case "phaser" : 
                        await queue.setFilter(`phaser`);
                        return interaction.reply({content: `🔹 | Toggled the Phaser filter.`});

                        case "tremolo" : 
                        await queue.setFilter(`tremolo`);
                        return interaction.reply({content: `🔹 | Toggled the Tremolo filter.`});

                        case "earwax" : 
                        await queue.setFilter(`earwax`);
                        return interaction.reply({content: `🔹 | Toggled the EarWax filter.`});

                        case "bassboost" : 
                        await queue.setFilter(`bassboost`);
                        return interaction.reply({content: `🔹 | Toggled the Bass Boost filter.`});
                        
                        case "echo" : 
                        await queue.setFilter(`echo`);
                        return interaction.reply({content: `🔹 | Toggled the Echo filter.`});
                        
                        case "nightcore" : 
                        await queue.setFilter(`nightcore`);
                        return interaction.reply({content: `🔹 | Toggled the Nightcore filter.`});
                        
                        case "surround" : 
                        await queue.setFilter(`surround`);
                        return interaction.reply({content: `🔹 | Toggled the Surround filter.`});
                    }
                }
            }
        } catch (e) {
            const errorEmbed = new MessageEmbed()
            .setColor("RED")
            .setDescription(`⚠ An error has occured: ${e}`)
            return interaction.reply({embeds: [errorEmbed]});
        }
    }
}
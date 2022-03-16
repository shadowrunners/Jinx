const { CommandInteraction, MessageEmbed, Client, MessageButton } = require("discord.js");
const ms = require("pretty-ms");
const paginationEmbed = require('discordjs-button-pagination');
const util = require("../../structures/utils/util.js")

module.exports = {
    name: "music",
    description: "A complete music system",
    options: [
        {
            name: "play",
            description: "Plays a song.",
            type: "SUB_COMMAND",
            options: [{ name: "query", description: "Provide the name of the song or URL.", type: "STRING", required: true }]
        },
        {
            name: "volume",
            description: "Alter the volume.",
            type: "SUB_COMMAND",
            options: [{ name: "percent", description: "10 = 10%", type: "NUMBER", required: true }]
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
            ],
        },
        {
            name: "settings",
            description: "Select an option",
            type: "SUB_COMMAND",
            options: [{
                name: "options", description: "Select an option.", type: "STRING", required: true,
                choices: [
                    { name: "🔹| View Queue", value: "queue" },
                    { name: "🔹| Skip", value: "skip" },
                    { name: "🔹| Pause", value: "pause" },
                    { name: "🔹| Resume", value: "resume" },
                    { name: "🔹| Stop", value: "stop" },
                    { name: "🔹| Shuffle", value: "shuffle" },
                    { name: "🔹| Now Playing", value: "nowplaying" },
                ]
            }],
        }
    ],
    /**
    * @param {CommandInteraction} interaction 
    * @param {Client} client 
    */
    async execute(interaction, client) {
        const { options, member, guild } = interaction;
        const VoiceChannel = member.voice.channel;

        if (!VoiceChannel)
            return interaction.reply({ content: "You aren't in a voice channel. Join one to be able to play music!", ephemeral: true });

        if (guild.me.voice.channelId && VoiceChannel.id !== guild.me.voice.channelId)
            return interaction.reply({ content: `I'm already playing music in <#${guild.me.voice.channelId}>.`, ephemeral: true });

        const player = client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: member.voice.channel.id,
            textChannel: interaction.channelId,
            selfDeafen: true
        });

        let res;
        try {
            switch (options.getSubcommand()) {
                case "play": {
                    const query = interaction.options.getString("query");
                    res = await player.search(query, interaction.user.username);

                    if (res.loadType === "LOAD_FAILED") {
                        if (!player.queue.current) player.destroy();
                        return interaction.reply({content: "🔹 | An error has occured while trying to add this song."})
                    }
                  
                    if (res.loadType === "NO_MATCHES") {
                        if (!player.queue.current) player.destroy();
                        return interaction.reply({content: "🔹 | No results found."})
                    }

                    if (res.loadType === "PLAYLIST_LOADED") {
                        player.queue.add(res.tracks);
                        if (!player.playing &&!player.paused && player.queue.totalSize === res.tracks.length) player.play();
                        const playlistEmbed = new MessageEmbed()
                            .setDescription(`🔹 | **[${res.playlist.name}](${query})** has been added to the queue.`)
                            .addField("Enqueued", `\`${res.tracks.length}\` tracks`)
                        return interaction.reply({ embeds: [playlistEmbed] })
                    }

                    if (res.loadType === "TRACK_LOADED" || res.loadType === "SEARCH_RESULT") {
                        player.connect();
                        player.queue.add(res.tracks[0]);
                    }

                    const enqueueEmbed = new MessageEmbed()
                        .setColor("BLURPLE")
                        .setDescription(`Enqueued **[${res.tracks[0].title}](${res.tracks[0].uri})** [${member}]`)
                    await interaction.reply({ embeds: [enqueueEmbed] });

                    if (!player.playing && !player.paused && !player.queue.size) player.play()

                    if (player.queue.totalSize > 1)
                        enqueueEmbed.addField("Position in queue", `${player.queue.size - 0}`);
                    return interaction.editReply({ embeds: [enqueueEmbed] })
                }
                case "volume": {
                    const volume = options.getNumber("percent");
                    if (!player.playing) return interaction.reply({ content: "There is nothing in the queue." })
                    if (volume < 0 || volume > 100) return interaction.reply({ content: `You can only set the volume from 0 to 100.` })
                    player.setVolume(volume);

                    const volumeEmbed = new MessageEmbed()
                        .setColor("BLURPLE")
                        .setDescription(`🔹 | Volume has been set to **${player.volume}%**.`)
                    return interaction.reply({ embeds: [volumeEmbed] })
                }
                case "seek": {
                    const seekEmbed = new MessageEmbed()
                        .setColor("BLURPLE")
                        .setDescription(`🔹 | This feature was not ported yet, it will be come in a future Developer Preview build.`)
                    return interaction.reply({ embeds: [seekEmbed] })
                }
                case "settings": {  
                    switch (options.getString("options")) {
                        case "skip": {
                            if (!player.playing) return interaction.reply({ content: "There is nothing in the queue." })
                            await player.stop();

                            const skipEmbed = new MessageEmbed()
                            .setColor("BLURPLE")
                            .setDescription(`🔹 | Skipped.`)

                            return interaction.reply({embeds: [skipEmbed]});
                        }
                        case "nowplaying": {
                            const track = player.queue.current;

                            const npEmbed = new MessageEmbed()
                            .setColor("BLURPLE")
                            .setDescription(`**<:nowplayingnote:952554583513780285> | Now Playing: [${track.title}](${track.uri})**`)
                            .addFields(
                                {
                                  name: "Duration",
                                  value: [
                                    `\`${ms(player.position, { colonNotation: true })} / ${ms(
                                        player.queue.current.duration,
                                        { colonNotation: true }
                                      )}\``
                                  ].join("\n"),
                                  inline: true,
                                },
                                {
                                  name: "Volume",
                                  value: [
                                    `\`${player.volume}\``
                                  ].join("\n"),
                                  inline: true,
                                },
                                {
                                  name: "Requester",
                                  value: [
                                    `\`${player.queue.current.requester}\``
                                  ].join("\n"),
                                  colonNotation: true,
                                  inline: true,
                                }
                              );
                            return interaction.reply({embeds: [npEmbed]})
                        }
                        case "pause": {
                            if (!player.playing) return interaction.reply({ content: "There is nothing in the queue." })

                            await player.pause(true);

                            const pauseEmbed = new MessageEmbed()
                                .setColor("BLURPLE")
                                .setDescription("🔹 | Paused.")
                            return interaction.reply({embeds: [pauseEmbed]})
                        }
                        case "resume": {
                            await player.pause(false);

                            const resumeEmbed = new MessageEmbed()
                                .setColor("BLURPLE")
                                .setDescription("🔹 | Resumed.")
                            return interaction.reply({embeds: [resumeEmbed]})
                        }
                        case "stop": {
                            player.destroy()
                            const disconnectEmbed = new MessageEmbed()
                                .setColor("BLURPLE")
                                .setDescription("🔹 | Disconnected.")
                            return interaction.reply({embeds: [disconnectEmbed]})
                        }
                        case "shuffle": {
                            if (!player.playing) return interaction.reply({ content: "There is nothing in the queue." });
                            if (!player.queue.length) return interaction.reply({ content: "There is nothing in the queue." });

                            player.queue.shuffle()
                            const shuffleEmbed = new MessageEmbed()
                                .setColor("BLURPLE")
                                .setDescription("🔹 | Shuffled the queue.")
                            return interaction.reply({embeds: [shuffleEmbed]})
                        }
                        case "queue": {
                            if (!player.playing) return interaction.reply({ content: "There is nothing in the queue." });
                            if (!player.queue.length) return interaction.reply({ content: "There is nothing in the queue." });

                            await interaction.deferReply()
                            let pagesNum = Math.ceil(player.queue.length / 10);
                            if (pagesNum === 0) pagesNum = 1;

                            const { title, requester, uri } = player.queue.current;
		                    
		                    const songStrings = [];
		                    for (let i = 0; i < player.queue.length; i++) {
			                    const song = player.queue[i];
			                        songStrings.push(
				                        `**${i + 1}.** [${song.title}](${song.uri}) \`[${ms(player.queue.current.duration)}]\` • [${song.requester}]\n`)};


		                    const user = `[${requester}]`;
                            const queue = player.queue.map((t, i) => `\`${++i}.\` **${t.title}** [${t.requester}]`);
                            const chunked = util.chunk(queue, 10).map(x => x.join("\n"));
                            const str = chunked[0]
                            const str2 = chunked[1]
                            const str3 = chunked[3]
			                        const embed = new MessageEmbed()
				                        .setAuthor({ name: `Queue - ${guild.name}`, iconURL: guild.iconURL()})
				                        .setDescription(`**Now Playing**: [${title}](${uri}) \`[${ms(player.queue.current.duration)}]\` • ${user}\n\n**Up Next**:${str == '' ? '  Nothing' : '\n' + str }`)
                                    const embed2 = new MessageEmbed()
				                        .setAuthor({ name: `Queue - ${guild.name}`, iconURL: guild.iconURL()})
				                        .setDescription(`**Now Playing**: [${title}](${uri}) \`[${ms(player.queue.current.duration)}]\` • ${user}\n\n**Up Next**:${str2 == '' ? '  Nothing' : '\n' + str2 }`)
                                    const embed3 = new MessageEmbed()
				                        .setAuthor({ name: `Queue - ${guild.name}`, iconURL: guild.iconURL()})
				                        .setDescription(`**Now Playing**: [${title}](${uri}) \`[${ms(player.queue.current.duration)}]\` • ${user}\n\n**Up Next**:${str3 == '' ? '  Nothing' : '\n' + str3 }`)

                            const button1 = new MessageButton()
                                .setCustomId('previousbtn')
                                .setLabel('Previous')
                                .setStyle('DANGER');
                            const button2 = new MessageButton()
                                .setCustomId('nextbtn')
                                .setLabel('Next')
                                .setStyle('SUCCESS');
			                
                                pages = [
                                    embed,
                                    embed2,
                                    embed3
                                ]

                                buttonList = [
                                    button1,
                                    button2
                                ]
                                return paginationEmbed(interaction, pages, buttonList);
		                    }
                        }
                    
                    }
                
            }
        } catch (e) {
            console.log(e)
        } 
    }
}
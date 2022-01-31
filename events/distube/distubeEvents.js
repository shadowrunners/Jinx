const client = require("../../structures/index.js");
const { MessageEmbed, VoiceChannel } = require("discord.js");

const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("BLURPLE")
    .setDescription(`Playing \`${song.name}\` [\`${song.formattedDuration}\`]\nRequested by: ${song.user}\n${status(queue)}`)]}
    ))

    .on("addSong", (queue, song) => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("BLURPLE")
    .setDescription(`${song.name} has been added to the queue by ${song.user}!`)]}))

    .on("addList", (queue, playlist) => queue.textChannel.send({embeds: [new MessageEmbed()
    .setColor("BLURPLE")
    .setDescription(`🔹 | Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`)]}
    ))

    .on("error", (channel, e) => {
        channel.send({embeds: [new MessageEmbed().setColor("RED")
        .setDescription(`🔹 | An error has occured: ${e}`)]})
    })

    .on("empty", queue => queue.textChannel.send({embeds: [new MessageEmbed().setColor("RED")
    .setDescription(`🔹 | Voice channel is empty! Leaving the channel.`)]
    })

    .on("searchNoResult", message => message.channel.send({embeds: [new MessageEmbed().setColor("RED")
    .setDescription(`🔹 | No result found!`)]}))
    )
    
    //.on("finish", queue => queue.textChannel.send({embeds: [new MessageEmbed().setColor("DARK_PURPLE")
    //.setDescription(`🔹 | Queue finished!`)]})))


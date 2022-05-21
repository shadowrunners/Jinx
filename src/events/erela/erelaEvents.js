const client = require("../../structures/index.js");
const { MessageEmbed } = require("discord.js");
const actualTime = require("humanize-duration");

client.manager
    .on("nodeConnect", (node) => {
        console.log(`[Erela] >> Connection has been established to "${node.options.identifier}".`)
    })

    .on("nodeDisconnect", (node, error) => {
        console.log(`[Erela] >> Lost connection to "${node.options.identifier}" due to an error: ${error.message}.`)
    })

    .on("nodeError", (node, error) => {
        console.log(`[Erela] >> Node "${node.options.identifier}" has encountered an error: ${error.message}.`)
    })

    .on("trackStart", (player, track) => {
        const npEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`**<:nowplayingnote:952554583513780285> | Now Playing: [${track.title}](${track.uri})**`)
            .addFields(
                {
                  name: "Duration",
                  value: [
                    `\`${actualTime(player.position)} / ${actualTime(
                        player.queue.current.duration,
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
                  name: "Total Tracks",
                  value: [
                    `\`${player.queue.totalSize - 1}\``
                  ].join("\n"),
                  colonNotation: true,
                  inline: true,
                }
              );

        client.channels.cache
          .get(player.textChannel)
          .send({embeds: [npEmbed]});
      })
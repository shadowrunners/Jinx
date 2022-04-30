const { MessageEmbed } = require("discord.js")
const client = require("../../index.js");
const pms = require("pretty-ms");

module.exports = {
    name: "trackStart",
    run: client.manager.on("trackStart", (player, track) => {
        const npEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`**<:nowplayingnote:952554583513780285> | Now Playing: [${track.title}](${track.uri})**`)
            .addFields(
                {
                  name: "Duration",
                  value: [
                    `\`${pms(player.position, { colonNotation: true })} / ${pms(
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
}



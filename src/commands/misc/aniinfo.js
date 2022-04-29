const { CommandInteraction, MessageEmbed } = require("discord.js");
const mal = require("mal-scraper");

module.exports = {
    name: "aniinfo",
    description: "See information about an anime.",
    options: [
        {
            name: "title",
            description: "Provide the name of the anime.",
            type: "STRING",
            required: true,
        },
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const title = interaction.options.getString("title");
        const titleSearch = title;

        mal.getInfoFromName(titleSearch).then((data) => {
            const aniEmbed = new MessageEmbed()
                .setAuthor({name: `${data.title}`})
                .setColor("BLURPLE")
                .setThumbnail(data.picture)
                .setDescription(data.synopsis)
                .addFields(
                    {
                        name: "Premiere Date",
                        inline: true,
                        value: [
                            `${data.premiered}` || "Unknown."
                        ].join("\n")
                    },
                    {
                        name: "Genres",
                        inline: true,
                        value: [
                            `${data.genres}`.split(',').join(', ')
                        ].join("\n")
                    },
                    {
                        name: "English Title",
                        inline: true,
                        value: [
                            `${data.englishTitle}` || "Unknown.",
                        ].join("\n")
                    },
                    {
                        name: "Japanese Title",
                        inline: true,
                        value: [
                            `${data.japaneseTitle}` || "Unknown.",
                        ].join("\n")
                    },
                    {
                        name: "Rating",
                        inline: true,
                        value: [
                            `${data.rating}` || "Unknown.",
                        ].join("\n")
                    },
                    {
                        name: "Aired",
                        inline: true,
                        value: [
                            `${data.aired}` || "Unknown.",
                        ].join("\n")
                    },
                    {
                        name: "Score",
                        inline: true,
                        value: [
                            `${data.score}` || "Unknown.",
                        ].join("\n")
                    },
                    {
                        name: "Duration",
                        inline: true,
                        value: [
                            `${data.duration}` || "Unknown.",
                        ].join("\n")
                    },
                    {
                        name: "Status",
                        inline: true,
                        value: [
                            `${data.status}` || "Unknown.",
                        ].join("\n")
                    },
                )
            interaction.reply({embeds: [aniEmbed]});
        }).catch((err) => {
            const errEmbed = new MessageEmbed()
                .setColor("BLURPLE")
                .setDescription(`🔹 | No anime found.`)
            return interaction.reply({embeds: [errEmbed]})
        })
    },
};
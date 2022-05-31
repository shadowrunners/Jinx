const { CommandInteraction, Client, MessageEmbed } = require("discord.js");
const BDB = require("../../structures/schemas/blacklistDB.js");

module.exports = {
    name: "blacklist",
    description: "A blacklisting system. (Developer Only)",
    permission: "ADMINISTRATOR",
    public: false,
    options: [
        {
            name: "add",
            description: "Add a user to the blacklist.",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "user",
                    description: "Provide the ID of the user you want to add to the blacklist.",
                    type: "STRING",
                    required: true
                },
            ],
        },
        {
            name: "remove",
            description: "Remove a user from the blacklist.",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "user",
                    description: "Provide the ID of the user you want to add to the blacklist.",
                    type: "STRING",
                    required: true,
                },
            ],
        },
    ],
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const { options } = interaction;
        const Sub = options.getSubcommand();

        const Embed = new MessageEmbed()

        switch(Sub) {
            case "add": {
                const user = options.getString("user");

                BDB.findOne({ UserID: user }, async (err, data) => {
                    if(err) console.log(err);
                    if(data) {
                        await interaction.reply({ embeds: [Embed.setColor("BLURPLE").setDescription(`${user.tag} is already blacklisted from using ${client.user.username}.`)]})
                    };
                    if(!data) {
                        data = new BDB({ UserID: user });
                        await data.save();
                        interaction.reply({ embeds: [Embed.setColor("BLURPLE").setDescription(`${user.tag} has been blacklisted from using ${client.user.username}.`)]})
                    };
                })
            }
            break;
            case "remove": {
                const user = options.getString("user");
                
                BDB.findOne({ UserID: user }, async (err, data) => {
                    if(data) {
                        if(err) console.log(err);
                        await data.remove();
                        await interaction.reply({ embeds: [Embed.setColor("BLURPLE").setDescription(`This user has been removed from the blacklist.`)], ephemeral: true})
                    }
                    if(!data) {
                        await interaction.reply({ embeds: [Embed.setColor("BLURPLE").setDescription(`This user is not blacklisted from using ${client.user.username}.`)], ephemeral: true})
                    }
                }
            )};
            break;
        }
    }
}
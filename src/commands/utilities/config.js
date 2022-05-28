const { MessageEmbed, CommandInteraction, MessageActionRow, MessageButton } = require("discord.js");
const TDB = require("../../structures/schemas/ticketSetup.js");

module.exports = {
    name: "configv2",
    description: "Configure parts of the bot.",
    public: true,
    options: [
        {
            name: "ticketspanel",
            description: "Set up the ticket panel.",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "channel",
                    description: "Select the channel where the ticket panel will be sent.",
                    type: "CHANNEL",
                    required: true,
                    channelTypes: ["GUILD_TEXT"],
                },
                {
                    name: "category",
                    description: "Select the category where the ticket selection channel is.",
                    required: true,
                    type: "CHANNEL",
                    channelTypes: ["GUILD_CATEGORY"],
                },
                {
                    name: "transcripts",
                    description: "Select the channel where the transcripts will be sent.",
                    required: true,
                    type: "CHANNEL",
                    channelTypes: ["GUILD_TEXT"],
                },
                {
                    name: "handlers",
                    description: "Select the role which will respond to all tickets.",
                    required: true,
                    type: "ROLE",
                },
                {
                    name: "everyone",
                    description: "Provide the @everyone role, pretty important.",
                    required: true,
                    type: "ROLE",
                },
                {
                    name: "description",
                    description: "Set the description of the ticket creation panel.",
                    required: true,
                    type: "STRING",
                },
                {
                    name: "firstbutton",
                    description: "Give your first button a name and an emoji by adding a comma followed by the emoji.",
                    required: true,
                    type: "STRING",
                },
                {
                    name: "secondbutton",
                    description: "Give your second button a name and an emoji by adding a comma followed by the emoji.",
                    required: true,
                    type: "STRING",
                },
                {
                    name: "thirdbutton",
                    description: "Give your third button a name and an emoji by adding a comma followed by the emoji.",
                    required: true,
                    type: "STRING",
                },  
            ],
        }, 
    ],
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
        const { guild, options } = interaction;
        try {
            switch(options.getSubcommand()) {
                case "ticketspanel": {
                    const Channel = options.getChannel("channel");
                    const Category = options.getChannel("category");
                    const Transcripts = options.getChannel("transcripts");
                    const Handlers = options.getRole("handlers");
                    const Everyone = options.getRole("everyone");

                    const Description = options.getString("description");

                    const Button1 = options.getString("firstbutton").split(",");
                    const Button2 = options.getString("secondbutton").split(",");
                    const Button3 = options.getString("thirdbutton").split(",");

                    const Emoji1 = Button1[1];
                    const Emoji2 = Button2[1];
                    const Emoji3 = Button3[1];

                    await TDB.findOneAndUpdate(
                        { GuildID: guild.id },
                        {
                          Channel: Channel.id,
                          Category: Category.id,
                          Transcripts: Transcripts.id,
                          Handlers: Handlers.id,
                          Everyone: Everyone.id,
                          Description: Description,
                          Buttons: [Button1[0], Button2[0], Button3[0]],
                        },
                        {
                          new: true,
                          upsert: true,
                        },
                      );
                
                    const buttons = new MessageActionRow();
                      buttons.addComponents(
                        new MessageButton()
                          .setCustomId(Button1[0])
                          .setLabel(Button1[0])
                          .setStyle("PRIMARY")
                          .setEmoji(Emoji1),
                        new MessageButton()
                          .setCustomId(Button2[0])
                          .setLabel(Button2[0])
                          .setStyle("SECONDARY")
                          .setEmoji(Emoji2),
                        new MessageButton()
                          .setCustomId(Button3[0])
                          .setLabel(Button3[0])
                          .setStyle("SUCCESS")
                          .setEmoji(Emoji3)
                    );
                
                    const ticketEmbed = new MessageEmbed()
                      .setAuthor({
                        name: `${guild.name}` + " | Ticketing System",
                        iconURL: guild.iconURL({ dynamic: true })
                      })
                      .setDescription(Description)
                      .setColor("BLURPLE");
                
                    await guild.channels.cache
                        .get(Channel.id)
                        .send({ embeds: [ticketEmbed], components: [buttons] });
                    interaction.reply({ content: "Done", ephemeral: true });
                }
                case "setmuterole": {
                    const role = options.getRole("role");
                    const data = await MDB.findOne({Guild: interaction.guild.id})

                    const muteSet = new MessageEmbed()
                        .setColor("BLURPLE")
                        .setDescription(`🔹 | The mute role has been set to ${role.toString()}.`)

                    const muteReset = new MessageEmbed()
                        .setColor("BLURPLE")
                        .setDescription(`🔹 | The mute role has been changed to ${role.toString()}.`)
                    
                    if(!data) {
                        await MDB.create({
                            Guild: interaction.guild.id,
                            Role: role.id
                        })
                        return interaction.reply({ embeds: [muteSet]});
                    } else {
                        await MDB.findOneAndUpdate({Guild: interaction.guild.id}, {Role: role.id})
                        return interaction.reply({ embeds: [muteReset]});
                    }
                }
            }
        } catch (e) {
            console.log(e)
            //let errEmbed = new MessageEmbed()
                //.setColor("BLURPLE")
                //.setTitle("Uh oh...")
                //.setDescription(`🔹 | An error has occured. ${e} \nReport this issue to scrappie in the [Black Hawk Support Server.](https://discord.gg/HwkDSs7X82)`)
                //.setFooter({ text: "Don't worry as long as you're not scrappie." })
            //return interaction.reply({ embeds: [errEmbed] })
        }
    }
}
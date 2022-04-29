const {
  ButtonInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const DB = require("../../structures/schemas/ticketDB.js");
const TicketSetupData = require("../../structures/schemas/ticketSetup.js");

module.exports = {
  name: "interactionCreate",
  /**
  * @param {ButtonInteraction} interaction
  */
  async execute(interaction) {
    if (!interaction.isButton()) return;
    const { guild, member, customId } = interaction;

    const Data = await TicketSetupData.findOne({ GuildID: guild.id });
    if (!Data) return;
    if (!Data.Buttons.includes(customId)) return;

    const ID = Math.floor(Math.random() * 90000) + 10000;

    await guild.channels
      .create(`${"ticket" + "-" + ID}`, {
        type: "GUILD_TEXT",
        parent: Data.Category,
        permissionOverwrites: [
          {
            id: member.id,
            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"],
          },
          {
            id: Data.Everyone,
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"],
          },
        ],
      })
      .then(async (channel) => {
        await DB.create({
          GuildID: guild.id,
          MembersID: member.id,
          TicketID: ID,
          ChannelID: channel.id,
          Closed: false,
          Locked: false,
          Type: customId,
          Claimed: false,
          OpenTime: parseInt(channel.createdTimestamp / 1000),
        });
        const Embed = new MessageEmbed()
          .setAuthor({
            name: `${guild.name} | Ticket: ${ID}`,
            iconURL: guild.iconURL({ dynamic: true }),
          })
          .setDescription(
            "Please wait patiently while a staff member is coming to assist you with your issue. In the meantime, describe your issue as detailed as possible."
          )
          .setFooter({ text: "The buttons below are Staff Only buttons!" });
        const Buttons = new MessageActionRow();
        Buttons.addComponents(
          new MessageButton()
            .setCustomId("close")
            .setLabel("Save & Close Ticket")
            .setStyle("PRIMARY")
            .setEmoji("⛔"),
          new MessageButton()
            .setCustomId("lock")
            .setLabel("Lock")
            .setStyle("SECONDARY")
            .setEmoji("🔒"),
          new MessageButton()
            .setCustomId("unlock")
            .setLabel("Unlock")
            .setStyle("SUCCESS")
            .setEmoji("🔓"),
          new MessageButton()
            .setCustomId("claim")
            .setLabel("Claim")
            .setStyle("PRIMARY")
            .setEmoji("🛄")
        );
        channel.send({ embeds: [Embed], components: [Buttons] });
        await channel
          .send({
            content: `${member}, your ticket has been created: ${channel}`,
          })
          .then((m) => {
            setTimeout(() => {
              m.delete().catch(() => {});
            }, 1 * 5000);
          });
        interaction.reply({
          content: `${member}, your ticket has been created: ${channel}`,
          ephemeral: true,
        });
      });
  },
};

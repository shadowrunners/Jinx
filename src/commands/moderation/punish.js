const { CommandInteraction, MessageEmbed, MessageActionRow, MessageButton, Client } = require("discord.js");
const muteDB = require('../../structures/schemas/muteDB.js');

module.exports = {
    name: "punish",
    description: "Send a punishment to a user.",
    permission: "ADMINISTRATOR",
    options: [
        {
            name: "target",
            description: "Provide a target.",
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "Provide a reason for the ban.",
            type: "STRING",
            required: false,
        },
    ],
    /**
     * @param {CommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {
        const target = interaction.options.getMember("target");
        const reason = interaction.options.getString("reason") || "No reason specified.";

        const higherEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription("You can't punish someone with a role higher than yours.")

        const evenHigherEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription("I can't punish someone with a role higher than mine.")

        if (target.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ embeds: [higherEmbed], ephemeral: true });
        if (target.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.reply({ embeds: [evenHigherEmbed], ephemeral: true });

        let modEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setAuthor({ name: "Jinx | Moderation", iconURL: `${client.user.avatarURL({ dynamic: true })}` })
            .setDescription("Choose an action to perform on the user.")
            .setTimestamp()

        let successEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setDescription(`${target.user.tag} has been banned for ${reason}.`);

        let bannedEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setTitle("Jinx | Notice")
            .setDescription(`You have been banned from ${interaction.guild.name} for ${reason}`)

        let kickedEmbed = new MessageEmbed()
            .setColor("BLURPLE")
            .setTitle("Jinx | Notice")
            .setDescription(`You have been kicked from ${interaction.guild.name} for ${reason}`)

        let epicFail = new MessageEmbed()
            .setColor("BLURPLE")
            .setAuthor({name: "You tried and failed miserably"})
            .setDescription("🔹 | You don't have the necessary permissions to run this command.")

        const buttons = new MessageActionRow();

        buttons.addComponents(
            new MessageButton()
                .setCustomId("Ban")
                .setLabel("Ban")
                .setStyle("PRIMARY")
                .setEmoji("🔨"),
            new MessageButton()
                .setCustomId("muteButton")
                .setLabel("Mute")
                .setStyle("PRIMARY")
                .setEmoji("🔇"),
            new MessageButton()
                .setCustomId("unmuteButton")
                .setLabel("Unmute")
                .setStyle("PRIMARY")
                .setEmoji("🔈"),
            new MessageButton()
                .setCustomId("kickButton")
                .setLabel("Kick")
                .setStyle("PRIMARY")
                .setEmoji("🥾"),
        );
        await interaction.reply({ embeds: [modEmbed], components: [buttons] })

        const filter = (i) => i.user.id === interaction.user.id
        const collector = interaction.channel.createMessageComponentCollector({ filter, componentType: 'BUTTON', time: 10000 })
        collector.on('collect', async (i) => {
            if (i.customId === "banButton") {
                if (!interaction.member.permissions.has('MANAGE_ROLES')) return interaction.reply({embeds: [epicFail], ephemeral: true})
                await target.send({ embeds: [bannedEmbed] }).catch(err => {
                    return;
                });
                target.ban({ reason });
                let successEmbed = new MessageEmbed().setColor("BLURPLE").setAuthor({ name: "Jinx | Moderation", iconURL: `${client.user.avatarURL({ dynamic: true })}` }).setDescription(`${target.user.tag} has been banned from the server for ${reason}`)
                i.update({ embeds: [successEmbed] });
            } else if (i.customId === "muteButton") {
                if (!interaction.member.permissions.has('MANAGE_ROLES')) return i.reply({embeds: [epicFail], ephemeral: true})
                const data = await muteDB.findOne({Guild: interaction.guildId})
                if (!data) return i.reply({embeds: [new MessageEmbed({color: "BLURPLE", author: "Jinx | Moderation", description: `🔹 | I can't mute this user because I don't have the mute role set up. Set it up via /config.`})], ephemeral: true})
                const role = interaction.guild.roles.cache.get(data.Role)
                if (!role) return;
                const hasRole = target.roles.cache.has(role.id)
                if (hasRole) return i.reply({embeds: [new MessageEmbed({color: "BLURPLE", author: "Jinx | Moderation", description: '🔹 | This user is already muted.'})], ephemeral: true})
                await target.roles.add(role)
                let successEmbed = new MessageEmbed().setColor("BLURPLE").setAuthor({ name: "Jinx | Moderation", iconURL: `${client.user.avatarURL({ dynamic: true })}` }).setDescription(`${target.user.tag} has been muted for ${reason}`)
                interaction.reply({ embeds: [successEmbed] });
            } else if (i.customId === "unmuteButton") {
                if (!interaction.member.permissions.has('MANAGE_ROLES')) return interaction.reply({embeds: [new MessageEmbed({color: client.colors.lightyellow, description: '<:greycross:907281080275599401> You need the `MANAGE_ROLES` permission to use this command.'})], ephemeral: true})
                const data = await muteDB.findOne({Guild: interaction.guildId})
                if (!data) return i.reply({embeds: [new MessageEmbed({color: client.colors.lightyellow, description: '<:greycross:907281080275599401> I cannot mute this user because I do not have a mute role set up.'})], ephemeral: true})
                const role = interaction.guild.roles.cache.get(data.Role)
                if (!role) return
                const hasRole = member.roles.cache.has(role.id)
                if (!hasRole) return i.reply({embeds: [new MessageEmbed({color: client.colors.lightyellow, description: '<:greycross:907281080275599401> This user is not muted.'})], ephemeral: true})
                await member.roles.remove(role)
                const embed3 = new MessageEmbed().setColor(client.colors.lightgoldenrodyellow).setDescription(`<:greymic:917266224507924550> Successfully unmuted ${member.toString()} for \`${reason}\``)
                i.update({embeds: [embed3]})
            } else if (i.customId === "kickButton") {
                if (!interaction.member.permissions.has('KICK_MEMBERS')) return interaction.reply({embeds: [epicFail], ephemeral: true})
                await target.send({ embeds: [kickedEmbed] }).catch(err => {
                    return;
                });
                target.kick({ reason });
                let successEmbed = new MessageEmbed().setColor("BLURPLE").setAuthor({ name: "Jinx | Moderation", iconURL: `${client.user.avatarURL({ dynamic: true })}` }).setDescription(`${target.user.tag} has been kicked from the server for ${reason}`)
                i.update({ embeds: [successEmbed] });
            }
        })
        collector.on('end', () => {
            interaction.editReply({ components: [buttons] })
        })
    }
}


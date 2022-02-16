const { MessageEmbed, ContextMenuInteraction } = require("discord.js");

module.exports = {
    name: "User Information",
    type: "USER",
    context: true,
    /**
    * @param {ContextMenuInteraction} interaction 
    */
    async execute(interaction) {
        const target = await interaction.guild.members.fetch(interaction.targetId)
        await target.user.fetch();
        
        const Embed = new MessageEmbed()
            .setColor("DARK_PURPLE")
            .setAuthor({ name: `${target.user.tag}`, iconURL: `${target.user.avatarURL({dynamic: true})}`})
            .setThumbnail(target.user.avatarURL({dynamic: true}))
            .setImage(target.user.bannerURL({dynamic: true, size: 512}) || "")
            .addFields(
                {name: "ID", value: target.user.id},
                {name: "Member since", value: `<t:${parseInt(target.joinedTimestamp / 1000)}:R>`, inline: true},
                {name: "Discord member since", value: `<t:${parseInt(target.user.createdTimestamp / 1000)}:R>`, inline: true},
                {name: "Roles", value: target.roles.cache.map(r => r).join(" ").replace("@everyone", "") || "None"}
            );
            
        interaction.reply({embeds: [Embed], ephemeral: true})
    }
}
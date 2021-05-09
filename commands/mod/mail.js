// @ts-check

const { MessageEmbed } = require("discord.js")
const { getRandomColor } = require('../../utils/embeds.js')

module.exports.run = function(args, message, client) {
    const data = args.join(' ')
    const members = message.guild.members.cache.filter((member) => {
        return member.hasPermission("ADMINISTRATOR") && !member.user.bot
    })
    const embed = new MessageEmbed()
    embed.setColor(getRandomColor())
    embed.setDescription(data)
    embed.setAuthor(message.author.username, message.author.avatarURL())
    members.forEach((admin) => {
        admin.send(embed).then((messageData) => {
            messageData.react("😐")
        })
    })

    message.delete().then(() => {}).catch(() => {})
}
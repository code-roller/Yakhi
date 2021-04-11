module.exports.run = function (args, message, yakhi) {
    if (message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('BAN_MEMBERS')) {
        const target = message.mentions.users.first()
        if (target) {
            const targetMember = message.mentions.guild.members.cache.get(target.id)
            if (target.id === targetMember) {
                return message.channel.send(`<@${message.author.id}> Please specify someone in the server to ban.`)
            } else {
                targetMember.ban()
                return message.channel.send(`<@${target}> Has been banned.`)
            }
        } else {
            return message.channel.send(`<@${message.author.id}> Please specify someone to ban.`)
        }
    } else {
        return message.channel.send(`<@${message.author.id}> You do not have permission to use this command.`)
    }
}
module.exports.run = function(args, message, yakhi) {
    if (message.member.hasPermission('ADMINISTRATOR') || message.member.hasPermission('KICK_MEMBERS')){
        const target = message.mentions.users.first()
        if (target){
            const targetMember = message.mentions.guild.members.cache.get(target.id)
            if (target.id === targetMember){
                return message.channel.send(`<@${message.author.id}> Please specify someone in the server to kick.`)
            }else{
                targetMember.kick()
                return message.channel.send(`<@${target}> Has been kicked.`)
            }
        }else{
            return message.channel.send(`<@${message.author.id}> Please specify someone to kick.`)
        }
    }else{
        return message.channel.send(`<@${message.author.id}> You do not have permission to use this command.`)
    }
}
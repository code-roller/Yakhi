const { Collection } = require('discord.js')

const run = async (args, message, client) => {
    let mentions = message.mentions.users
    if(mentions.size == 1){
        mentions = new Collection([
            [message.author.id, message.author]
        ])
    }
    mentions.forEach((value) => {
        if(value.id != client.user.id){
            message.channel.send(value.avatarURL())
        }
    });
}

module.exports = { run }
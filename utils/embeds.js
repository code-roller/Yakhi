const { MessageEmbed } = require('discord.js')

const createEmbed = (title, color, description, author, fields, thumbnail, url, timestamp) => {
    const embed = new MessageEmbed();
    embed.setTitle(title)
    embed.setAuthor(author.name, author.image)
    embed.setDescription(description)
    embed.setColor(color)
    embed.setThumbnail(thumbnail)
    embed.setURL(url)
    embed.addFields(fields)
    
    if(timestamp){
        embed.setTimestamp()
    }
    return embed
}
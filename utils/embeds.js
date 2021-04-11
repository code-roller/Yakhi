const { MessageEmbed } = require('discord.js')

/**
 * Create a discord embed message
 * 
 * @param {string} title The title of the embed message 
 * @param {string} color The color of the message
 * @param {string} description The description of the message 
 * @param {Object} author The author of the message containing two properties,
 * The name of the user and the image url
 * @param {Array<any>} fields The different embed fields
 * @param {string} thumbnail The embed thumbnail
 * @param {string} url The embed url
 * @param {boolean} timestamp Whether to create timestamps or not
 * @returns {MessageEmbed} The newly created discord message embed
 */
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
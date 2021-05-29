const axios = require('axios')
const { MessageEmbed } = require('discord.js')
const { getRandomColor } = require('../../utils/embeds.js')

module.exports.run = (args, message, client) => {
    const numbers = args.map((argument) => {
        return parseInt(argument)
    }).forEach((value, index) => {
        if(!isNaN(value)){
            axios.get(`http://numbersapi.com/${value}`).then((response) => {
                const responseData = response.data
                const embed = new MessageEmbed()
                embed.setColor(getRandomColor())
                embed.setDescription(responseData.toString())
                message.channel.send(embed).then((messageEmbedData) => {
                    messageEmbedData.react('😉')
                }).catch((error) => {})
            }).catch((exception) => {
                // message.channel.send(m?essageEmbed(
                    // "An error occured3"
                // ))
            })
        }
    })
}
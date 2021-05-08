const axios = require('axios')
const { MessageEmbed } = require('discord.js')
const { messageEmbed } = require('../github/user.js')

module.exports.run = (args, message, client) => {
    args.forEach((username) => {
        axios.get(`https://dev.to/api/profile_images/${username}`).then((response) => {
            const data = response.data
            const embed = new MessageEmbed()
            embed.setImage(data.profile_image)
            message.channel.send(embed)
        }).catch((exception) => {
            console.log(exception)
            message.channel.send(messageEmbed(
                "Error",
                "An error occured while fetching data for you"
            ))
        })
    })
}
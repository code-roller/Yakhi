// @ts-check
const { Message, MessageEmbed } = require('discord.js')

class Exception {

    /**
     * @constructor
     * @param {string} error
     * @param {Message} message 
     * @param {boolean} dm 
     */
    constructor(error, message, dm = false) {
        this.error = error
        this.message = message
        this.sendDirectMessage = dm

        this.createException()
    }

    /**
     * @public
     * 
     * Create the exception message and sends
     * it to either author dm or the currenr text 
     * channel based on [sendDirectMessage]
     * 
     * @returns {Promise<void>}
     */
    createException = async () => {
        const embed = new MessageEmbed()
        embed.setColor("#D7000C")
        embed.setTitle("An Unexpected error occured")
        embed.setDescription(this.error)
        if (this.sendDirectMessage) {
            this.message.author.send(embed)
            await this.message.delete()

            return null
        }

        // @ts-ignore
        await this.message.channel.send(embed)
    }
}

module.exports = Exception
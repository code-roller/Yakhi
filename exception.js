// @ts-check
const { Message, MessageEmbed } = require('discord.js')

class Exception {

    /**
     * @constructor
     * @param {string} error
     * @param {Message} message 
     * @param {boolean} dm 
     */
    constructor(error, message, dm=false){
        this.error = error
        this.message = message
        this.sendDirectMessage = dm

        this.createException()
    }

    createException = async () => {
      const embed = new MessageEmbed()
      embed.setColor("#D7000C")  
      embed.setTitle("An Unexpected error occured")
      embed.setDescription(this.error)
      if(this.sendDirectMessage){
          this.message.author.send(embed)
          await this.message.delete()

          return null
      }

      // @ts-ignore
      await this.message.delete((deletedMessage) => {
          deletedMessage.channel.send(embed)
      })
    }
}
// @ts-check
const discord = require('discord.js')
const { announce, admin } = require('../../index.js')

/**
 * @exports
 * @param {Array} args 
 * @param {discord.Message} message 
 * @param {discord.Client} client 
 */
function run(args, message, client){
    /** @type {string} */
    const messageText = args.join(" ")
    const announcementChannel = message.guild.channels.cache.get(announce)

    // @ts-ignore
    const role = message.guild.roles.cache.filter((guildRole) => {
        guildRole.id == admin
    }).first()

    const match = message.member.roles.cache.filter((memberRole) => {
        return memberRole.id == role.id
    })
    if(match.size == 0){
        
    }
}

module.exports = {run}
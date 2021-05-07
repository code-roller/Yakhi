// @ts-check
const discord = require('discord.js')
const axios = require('axios')
const Exception = require('../../exception.js')
const { getRandomColor } = require('../../utils/embeds.js')

/**
 * @constant
 * @param {string} title The embed title
 * @param {string} description The embed description
 * @param {string} color The color of the embed
 * @returns {discord.MessageEmbed} The created discord embed
 */
const messageEmbed = (title, description, color) => {
    /** @type {discord.MessageEmbed} */
    const embed = new discord.MessageEmbed()
    embed.setColor(color)
    embed.setTitle(title)
    embed.setDescription(description)

    return embed
}

class GithubUser {
    /**
     * @constructor
     * @param {string} username 
     * @param {discord.Message} message 
     */
    constructor(username, message) {
        this.username = username
        this.message = message

        this._fetchUserData()
    }

    _fetchUserData() {
        axios.default.get(GithubUser.uniformResourceLocator(this.username)).then((response) => {
            const value = response.data
            const embed = messageEmbed(
                value.login || value.name,
                value.bio || "",
                "#2988F6"
            )
            embed.setThumbnail(value.avatar_url)
            embed.setURL(value.html_url)
            embed.addField(':open_file_folder: Repos', value.public_repos, true)
            embed.addField(':newspaper: Gists', value.public_gists, true)
            embed.addField(':busts_in_silhouette: Followers', value.followers, true)
            embed.addField(':bust_in_silhouette: Following', value.following, true);

            this.message.channel.send(embed)
        }).catch((exception) => {
            this.message.channel.send(messageEmbed(
                "An unexpccted error occured",
                `Failed to fetch data for user ${this.username}`,
                "#D7000C"
            ))
        })
    }

    /**
     * @static
     * @public
     * 
     * Return the api url based on 
     * the username 
     * 
     * @param {string} username 
     * @returns 
     */
    static uniformResourceLocator(username) {
        return `https://api.github.com/users/${username}`
    }
}

/**
 * 
 * @param {any} args 
 * @param {discord.Message} message 
 * @param {discord.Client} client 
 */
function run(args, message, client) {
    if (args.length == 0){
        message.channel.send(messageEmbed(
            "Are you pulling my leg :angry: ?",
            "No username provided",
            "#D7000C"
        ))
    }
    for(let index=0; index<args.length; index++){
        const username = new GithubUser(args[index], message)
    }
}

module.exports = { run }
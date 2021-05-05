// @ts-check

const discord = require("discord.js")
const parser = require("./parse.js")
const executor = require("./execute.js")
const dotenv = require("dotenv").config()
const client = new discord.Client()

/**
 * Environment variables loaded from
 * the .env file using the dotenv module.
 * All these variables are added to the
 * process environment variable
 */
const token = process.env.TOKEN

// The id of the announcement channel for
// yakhi mod announce <announcement>
const announce = process.env.ANNOUNCEMENT_CHANNEL_ID

// the administrator role id
const admin = process.env.ADMIN_ROLE_ID

/**
 * @constant
 * 
 * Checks if the message if a bot command
 * 
 * @param {discord.Message} message 
 * @returns {boolean} Whether or not the message content
 * is a valid bot command
 */
const isBotCommand = (message) => {
    return message.content.startsWith("yakhi ")
}

client.on("ready", async () => {
    console.log("The bot has started")
    await client.user.setActivity("yakhi help all")
})

client.on("message", async message => {
    if (message.author.bot || message.channel.type === "dm") return
    if (message.content.toLowerCase() == "client" || message.content == "client, who are you?") {
        message.channel.send("I am Yakhi, a bot powered by AI and created by code roller. Try `y! help all` for help.")
    }

    if (isBotCommand(message)) {
        const parsed = parser.parse(message.content)
        executor.exec(parsed.command, parsed.subcommand, parsed.args, message, client)
    } else {
        const mentionedEveryone = message.mentions.everyone
        if (mentionedEveryone) {
            // delete the message if the user pings
            // @everyone(All the server members).
            // This can be used to prevent spams and raids
            await message.delete().then((deletedMessage) => {
                deletedMessage.author.send("Please do not ping everyone :neutral_face:")
            })
        }
    }
})

client.login(token)

module.exports = { token, announce, admin }

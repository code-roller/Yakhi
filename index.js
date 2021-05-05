// @ts-check

const discord = require("discord.js")
const parser = require("./parse.js")
const executor = require("./execute.js")
const dotenv = require("dotenv").config()
const client = new discord.Client()

const token = process.env.TOKEN
const announce = process.env.ANNOUNCEMENT_CHANNEL_ID
const admin = process.env.ADMIN_ROLE_ID

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
        if(mentionedEveryone){
            await message.delete().then((deletedMessage) => {
                deletedMessage.author.send("Please do not ping everyone :neutral_face:")
            })
        }
    }
})

client.login(token)

module.exports = { token, announce, admin }

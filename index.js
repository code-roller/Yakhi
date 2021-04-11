const discord = require("discord.js")
const parser = require("./parse.js")
const executor = require("./execute.js")
const dotenv = require("dotenv")
const client = new discord.Client()
dotenv.config()

const isBotCommand = (message) => {
    return Array.from(message.mentions.users.keys()).includes(client.user.id)
}

client.on("ready", async() => {
    console.log("The bot has started")
    await client.user.setActivity("y! help all")
})

client.on("message", async message => {
    if (message.author.bot || message.channel.type === "dm") return
    if (message.content.toLowerCase() == "client" || message.content == "client, who are you?") {
        message.channel.send("I am Yakhi, a bot powered by AI and created by code roller. Try `y! help all` for help.")
    }

    if (isBotCommand(message)) {
        const parsed = parser.parse(message.content)
        executor.exec(parsed.command, parsed.subcommand, parsed.args, message, client)
    }
})

client.login(process.env.TOKEN)

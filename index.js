const d = require("discord.js")
const parser = require("./parse.js")
const executor = require("./execute.js")
const dotenv = require("dotenv")
const yakhi = new d.Client()
dotenv.config()

yakhi.on("ready", () => {
    yakhi.user.setUsername("Yakhi")
    yakhi.user.setActivity("y! help all")
})

yakhi.on("message", async message => {
    if (message.author.bot || message.channel.type === "dm") return
    if (message.content.toLowerCase == "yakhi" || message.content == "Yakhi, who are you?") {
        message.channel.send("I am Yakhi, a bot powered by AI and created by code roller. Try `y! help all` for help.")
    }
    if (message.content.startsWith("y!")) {
        const parsed = parser.parse(message.content)
        executor.exec(parsed.command, parsed.subcommand, parsed.args, message, yakhi)
    }
})

yakhi.login(process.env.TOKEN)
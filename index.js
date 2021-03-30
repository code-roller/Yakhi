const d = require("discord.js")
const dotenv = require("dotenv")
const yakhi = new d.Client()
dotenv.config()

yakhi.login(process.env.TOKEN)
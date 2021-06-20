const { MessageEmbed } = require('discord.js')
const axios = require('axios')

module.exports.run = (args, message, client) => {
	let names = args.filter((currentName) => {
		return currentName.trim().length != 0
	}).map((name) => {return name.trim()})
	if(names.length == 0){
		const username = message.author.username
		names = [username]
	}
	
	for(let index=0; index<names.length; index++){
		const name = names[index]
		axios.get(`https://api.agify.io/?name=${name}`).then((response) => {
			const data = response.data
			message.reply(`${name}'s age is ${data.age ? data.age : "∞"}`)
		}).catch((error) => {
			message.reply(`idk ${name}'s age'`)
		})
	}
}
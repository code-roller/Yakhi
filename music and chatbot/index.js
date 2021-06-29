const db = require('quick.db')
const fetch = require("node-fetch");
const { Client, Collection } = require("discord.js");
const {default_prefix} = require("./configuration/config.json")
const token = process.env['token']

const client = new Client({
    disableEveryone: true
})

client.on('message', async message => {
  if (message.content.startsWith('!reply')) {
    message.lineReply('Hey'); //Line (Inline) Reply with mention

    message.lineReplyNoMention(`My name is ${client.user.username}`); //Line (Inline) Reply without mention
  }
});


client.commands = new Collection();
client.aliases = new Collection();
client.queue = new Map();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("message", async message => {
if (message.channel.name == "yakhichat") {
if (message.author.bot) return;
message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
if (message.content.includes(`@`)) {
return message.channel.send(`**:x: Please dont mention anyone**`);
 }
  message.channel.startTyping();
if (!message.content) return message.channel.send("Please say something.");
fetch(`https://api.affiliateplus.xyz/api/chatbot?message=${encodeURIComponent(message.content)}&botname=${client.user.username}&ownername=Lavaboy01920011`)
    .then(res => res.json())
    .then(data => {
        message.channel.send(`> ${message.content} \n <@${message.author.id}> ${data.message}`);
    });
      message.channel.stopTyping();
}
});


 
 
client.on("message", async message => { 
    
 
    if (message.author.bot) return;
    if (!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`) 
  if(prefix === null) prefix = default_prefix;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await guild.fetchMember(message); 
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
     
    if (cmd.length === 0) return;
    let command = client.commands.get(cmd); 
  if (!command) command = client.commands.get(client.aliases.get(cmd)); 
    if (command) 
        command.run(client, message, args); 


}); 

require('./server')();

client.login("process.env.TOKEN");

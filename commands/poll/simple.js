const djs = require("discord.js");

module.exports.run = async (args, message, yakhi) => {
    var pollEmbed = new djs.MessageEmbed().addField(args[0], "\n👍 Yes\n👎 No");
    var m = await message.channel.send(pollEmbed);
    await m.react("👍");
    await m.react("👎");
}
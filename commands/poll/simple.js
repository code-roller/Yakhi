const djs = require("discord.js");

module.exports.run = async (args, message, yakhi) => {
  var pollEmbed = new djs.MessageEmbed().addField(args[0], "\nš Yes\nš No");
  var m = await message.channel.send(pollEmbed);
  await m.react("š");
  await m.react("š");
};

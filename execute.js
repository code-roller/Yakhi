const fs = require("mz/fs");
const d = require("discord.js");

module.exports.exec = function (command, subcommand, args, message, yakhi) {
  fs.readdir(`./commands/${command}/`, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      if (files.includes(subcommand + ".js")) {
        require(`./commands/${command}/${subcommand}.js`).run(
          args,
          message,
          yakhi
        );
      } else {
        const toSend = new d.MessageEmbed()
          .setColor("ff0000")
          .setDescription("ERROR: Command not recognised.")
          .setTitle(`Error`);
        message.channel.send(toSend);
      }
    }
  });
};

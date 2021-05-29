const axios = require("axios");
const { MessageEmbed } = require("discord.js");
const { messageEmbed } = require("../github/user");

const run = (args, message, client) => {
  axios
    .get("https://api.quotable.io/random")
    .then((response) => {
      const data = response.data;
      const embed = new MessageEmbed()
        .setColor("#9147ff")
        .setDescription(`>>> ${data.content}`)
        .addField(":pencil: Author", data.author, true);
      message.channel.send(embed);
    })
    .catch((err) => {
      const error = messageEmbed(
        "Error :rolling_eyes:",
        "An error occured while fetching quotes for you"
      );
    });
};

module.exports = { run };

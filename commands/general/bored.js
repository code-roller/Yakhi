const discord = require("discord.js");
const axios = require("axios");
const { messageEmbed } = require("../github/user");

const generateActivities = (message) => {
  axios
    .get("http://www.boredapi.com/api/activity/")
    .then((data) => {
      const value = data.data;
      const embed = new discord.MessageEmbed();
      embed.setTitle(`:busts_in_silhouette: ${value.activity}`);
      embed.setColor("#7289DA");
      embed
        .setURL(value.link)
        .addField(":small_blue_diamond: Type", value.type, true)
        .addField(
          ":man_construction_worker::woman_construction_worker: Participants",
          value.participants,
          true
        )
        .addField(":moneybag: Price", value.price);
      message.channel.send(embed);
    })
    .catch((err) => {
      const error = messageEmbed("Error", "Nothing for you right now");
      message.channel.send(error);
    });
};

const run = (args, message, client) => {
  generateActivities(message);
};

module.exports = { run };

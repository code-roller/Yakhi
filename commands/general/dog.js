const axios = require("axios");
const { MessageEmbed } = require("discord.js");
const { getRandomColor } = require("../../utils/embeds.js");

const API = "https://api.thedogapi.com/v1/images/search";

module.exports.run = function (args, message, client) {
  axios.default
    .get(API)
    .then((response) => {
      const data = response.data[0];
      const embed = new MessageEmbed();
      embed.setColor(getRandomColor());
      embed.setImage(data.url);
      message.channel.send(embed);
    })
    .catch((exception) => {
      const embed = new MessageEmbed();
      embed.setColor("#ED010E");
      embed.setTitle("An unexpected error occured");
      embed.setDescription("Unable to fetch data for you");
      message.channel.send(embed);
    });
};

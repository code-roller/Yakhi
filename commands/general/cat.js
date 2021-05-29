const discord = require("discord.js");
const axios = require("axios");
const { messageEmbed } = require("../github/user.js");

/**
 * Generate random cat image by requesting
 * the catapi abd returning the dta as a
 * image
 *
 * @param {discord.Message} message
 */
const generateCatImages = (message) => {
  axios
    .get("https://api.thecatapi.com/v1/images/search")
    .then((data) => {
      const value = Array.from(data.data);
      for (let imgIndex = 0; imgIndex < value.length; imgIndex++) {
        message.channel.send(value[imgIndex].url);
      }
    })
    .catch((exception) => {
      const error = new messageEmbed(
        "Error !!",
        "Failed to fetch cat images :rolling_eyes:"
      );
      message.channel.send(error);
    });
};

const run = (args, message, client) => {
  generateCatImages(message);
};

module.exports = { run };

// @ts-check

const { default: axios } = require("axios");
const { MessageEmbed } = require("discord.js");
const { messageEmbed } = require("../github/user.js");

function articles(message) {
  /** @type {string} */
  const api = "https://dev.to/api/articles?top=1";
  axios
    .get(api)
    .then((response) => {
      const data = response.data[0];
      const embed = new MessageEmbed();
      embed.setTitle(data.title);
      embed.setDescription(data.description);
      embed.setURL(data.url);
      embed.addField(":speech_balloon: Comments", data.comments_count, true);
      embed.addField(
        ":calendar_spiral: Published on",
        data.readable_publish_date,
        true
      );
      embed.addField(":heart: Reactions", data.positive_reactions_count, true);
      embed.setImage(data.cover_image);
      embed.addField(
        ":clock: Reading time",
        `${data.reading_time_minutes} minutes`,
        true
      );
      embed.addField(":pencil: Author", `@${data.user.username}`, true);
      message.channel
        .send(embed)
        .then((sendMessage) => {})
        .catch((error) => {});
    })
    .catch((error) => {
      const embed = messageEmbed(
        "An error occured",
        "Failed to fetch articled for you"
      );
      message.channel.send(embed);
    });
}

module.exports.run = function (args, message, client) {
  articles(message);
};

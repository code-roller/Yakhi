const axios = require("axios");
const { MessageEmbed } = require("discord.js");
const { getRandomColor } = require("../../utils/embeds");

module.exports.run = (args, message, client) => {
  message.channel.send("Fetching memes...").then((fetchMessage) => {
    axios
      .get("https://meme-api.herokuapp.com/gimme")
      .then(({ data }) => {
        if (data.nsfw || data.spoiler) {
          fetchMessage
            .edit("Fetch Failed :confused:")
            .then((fetchErrorMessage) => {
              fetchErrorMessage.react("😐");
            })
            .catch((error) => {});
        } else {
          const embed = new MessageEmbed();
          embed.setColor(getRandomColor());
          embed.setURL(data.postLink);
          embed.setAuthor(
            data.author,
            undefined,
            `https://reddit.com/u/${data.author}/`
          );
          embed.setTitle(data.title);
          embed.setImage(data.url);
          embed.addField(":arrow_up: Upvotes", data.ups, true);

          fetchMessage.edit("Here's it 👇");
          fetchMessage.channel.send(embed);
        }
      })
      .catch((error) => {
        throw error;
      });
  });
};

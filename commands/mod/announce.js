// @ts-check
const discord = require("discord.js");
const Exception = require("../../exception.js");
const { getRandomColor } = require("../../utils/embeds.js");

/**
 * @exports
 * @param {Array} args
 * @param {discord.Message} message
 * @param {discord.Client} client
 */
function run(args, message, client) {
  /** @type {string} */
  const messageText = args.join(" ");
  // const announcementChannel = message.guild.channels.cache.get(announce)
  const announcementChannel = message.guild.systemChannel;

  if (!message.member.hasPermission("ADMINISTRATOR")) {
    const exception = new Exception(
      "You do not have permissions to create announcements",
      message,
      true
    );
  } else {
    const data = new discord.MessageEmbed();
    data.setColor(getRandomColor());
    data.setDescription(messageText);
    data.setAuthor(message.author.username, message.author.avatarURL());
    // @ts-ignore
    announcementChannel.send(data);
  }
}

module.exports = { run };

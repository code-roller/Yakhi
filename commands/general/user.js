const { Collection, MessageEmbed } = require("discord.js");
const moment = require("moment");

/**
 * Get the username and the nickname
 * to display as the title
 *
 * @param {User} user
 * @param {Guild} guild
 * @returns {string} The username along with the nickname
 * username(nickname)
 */
const getUserDisplayName = (user, guild) => {
  const member = guild.members.cache
    .filter((value) => {
      return value.user.id == user.id;
    })
    .first();
  const nickname = member.nickname == null ? `` : `(${member.nickname})`;
  const displayName = member.user.username;

  return `${displayName}${nickname}`;
};

/**
 * Get the mentioned users. If the user has only mentioned
 * the bot, create a new Collection containing the id of the
 * message author and the message author object
 *
 * Loop through the users and for each user, if the user
 * is not the client bot, get information about the user
 * and add it as fields in an embed
 *
 * send the embed in the message channel
 *
 * @param {*} args
 * @param {Message} message
 * @param {Client} client
 */
const run = async (args, message, client) => {
  let mentions = message.mentions.users;
  if (mentions.size == 1) {
    mentions = new Collection([[message.author.id, message.author]]);
  }

  mentions.forEach((value) => {
    const isClient = value.id == client.user.id;
    const member = message.guild.members.cache
      .filter((data) => {
        return data.user.id == value.id;
      })
      .first();
    if (!isClient) {
      const embed = new MessageEmbed();
      embed.setTitle(getUserDisplayName(value, message.guild));
      embed.setColor("#3C4165");
      embed.setThumbnail(value.avatarURL());
      embed.addField(":red_square: Bot", value.bot ? "Yeah" : "Nope", true);
      embed.addField(
        ":bust_in_silhouette: Tag",
        `${value.username}#${value.discriminator}`,
        true
      );
      embed.addField(
        ":crown: Owner",
        value.id == message.guild.ownerID ? "Yeah" : "Nope",
        true
      );
      embed.addField(
        ":video_game: Game",
        `${value.presence.game ? user.presence.game.name : "None"}`,
        true
      );
      embed.addField(
        ":date: Joined The Server On",
        `${moment.utc(member.joinedAt).format("dddd, MMMM Do YYYY")}`,
        true
      );
      embed.addField(
        ":calendar_spiral: Account Created On",
        `${moment.utc(value.createdAt).format("dddd, MMMM Do YYYY")}`,
        true
      );
      embed.setFooter(
        `Replying to ${message.author.username}#${message.author.discriminator}`
      );

      message.channel
        .send(embed)
        .then(() => {})
        .catch((exception) => {
          console.log(exception.message);
        });
    }
  });
};

module.exports = { run };

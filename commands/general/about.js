const { MessageEmbed } = require("discord.js");
const { getRandomColor } = require("../../utils/embeds");

module.exports.run = (args, message, client) => {
  let aboutList = [];
  if (args.length == 0) {
    aboutList.push(message.member);
  } else {
    aboutList = args.map((value) => {
      const id = value.slice(3).slice(0, -1).trim();
      const members = message.guild.members.cache
        .filter((member) => {
          return member.user.id.trim() == id;
        })
        .first();
      return members;
    });
  }

  aboutList.forEach((user) => {
    if (user) {
      const embed = new MessageEmbed();
      embed.setColor(getRandomColor());
      embed.setThumbnail(user.user.avatarURL());
      embed.setTitle(user.user.username);
      embed.addField(":person_curly_hair: Nickname", user.nickname, true);
      embed.addField(":robot: Bot", user.user.bot ? "Yeah" : "No", true);
      embed.addField(":hash: Discriminator", user.user.discriminator, true);
      message.channel.send(embed);
    }
  });
};

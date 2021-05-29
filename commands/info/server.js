const { MessageEmbed } = require("discord.js");

const channelCount = (serverData, types) => {
  return serverData.channels.cache.filter((channel) => {
    return types.includes(channel.type);
  }).size;
};

const serverInformation = (server, message) => {
  const embed = new MessageEmbed()
    .setAuthor(server.name, server.iconURL()?.toString())
    .addField(":id: Server ID", server.id, true)
    .addField(":calendar: Created on", server.createdAt.toDateString(), true)
    .addField(
      ":crown: Owned by",
      server.owner?.nickname == null
        ? server.owner?.displayName
        : server.owner?.nickname,
      true
    )
    .addField(
      `:busts_in_silhouette: Members(${server.memberCount})`,
      server.members.cache.filter((member) => {
        return !member.user.bot;
      }).size + " human(s)",
      true
    )
    .addField(
      `:speech_balloon: ${channelCount(server, ["text", "voice"])}`,
      `**${channelCount(server, ["text"])}** text | ${channelCount(server, [
        "voice",
      ])} voice`,
      true
    )
    .addField(
      `:earth_africa: Others`,
      `**Region**:${
        server.region.charAt(0).toUpperCase() + server.region.slice(1)
      }`,
      true
    );
  message.channel.send(embed);
};

module.exports.run = (args, message, client) => {
  serverInformation(message.guild, message);
};

module.exports.run = async function (args, message, yakhi) {
  const m = await message.channel.send(`Ping?`);
  m.edit(`${m.createdTimestamp - message.createdTimestamp}ms`);
};

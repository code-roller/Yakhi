const djs = require("discord.js");

module.exports.run = async (args, message, yakhi) => {
    var body = "";
    const emojis = [
        "🇦",
        "🇧",
        "🇨",
        "🇩",
        "🇪",
        "🇫",
        "🇬",
        "🇭",
        "🇮",
        "🇯",
        "🇰",
        "🇱",
        "🇲",
        "🇳",
        "🇴",
        "🇵",
        "🇶",
        "🇷",
        "🇸",
        "🇹",
        "🇺",
        "🇻",
        "🇼",
        "🇽",
        "🇾",
        "🇿"
    ];
    const name = args[0];
    const options = args.slice(1);
    const error = new djs.MessageEmbed().setTitle(`Please limit your polls to ${emojis.length.toString()} options at most.`).setColor(`ff0000`);
    if (options.length > emojis.length) {
        await message.channel.send(error);
    } else {
        for (var i = 0; i < options.length; i++) {
            body += `${emojis[i]} ${options[i]}\n`;
        }
        let poll = new djs.MessageEmbed().setColor("#0080ff").setTitle(name).setDescription(body);
        let m = await message.channel.send(poll);
        emojis.slice(0, options.length).forEach(async emoji => {
            await m.react(emoji);
        });
    }
}
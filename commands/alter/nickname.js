module.exports.run = function(args, message, yakhi) {
    yakhi.user.setNickname(args.join(" "))
}
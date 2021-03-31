module.exports.run = function(args, message, yakhi) {
    yakhi.user.setUsername(args.join(" "))
}
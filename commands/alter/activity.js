module.exports.run = function(args, message, yakhi) {
    yakhi.user.setActivity(args.join(" "))
}
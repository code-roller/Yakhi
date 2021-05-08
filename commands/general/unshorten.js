const { expandUrl } = require("../../utils/expand")
const { messageEmbed } = require('../github/user.js')

module.exports.run = function (args, message, client) {
    for (let index = 0; index < args.length; index++) {
        expandUrl(args[index], false, message)
    }
}


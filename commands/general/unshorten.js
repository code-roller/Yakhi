const { expandUrl } = require("../../utils/expand")
const { messageEmbed } = require('../github/user.js')

module.exports.run = function(args, message, client) {
    const data = expandUrl(args[0], 8, message)
    console.log(data)
}


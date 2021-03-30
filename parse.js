module.exports.parse = function(message) {
    return {
        command: message.split(" ")[1],
        subcommand: message.split(" ")[2],
        args: message.split(" ").slice(3)
    }
}
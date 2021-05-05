const parse = (message) => {
    const messageData = message.toString().split(" ").slice(1)
    const map = new Map([
        ["command", messageData[0]],
        ["subcommand", messageData[1]],
        ["args", messageData.slice(2)]
    ])
    return Object.fromEntries(map)
}

module.exports = { parse }
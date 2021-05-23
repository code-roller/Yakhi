module.exports.run = (args, message, client) => {
    message.channel.send(':expressionless:').then((msg) => {
        msg.edit(':neutral_face:').then((msg) => {
            msg.edit(':slight_frown:').then((msg) => {
                msg.edit(":confused:").then((msg) => {
                    msg.edit(":frowning:").then((msg) => {
                        msg.edit(":frowning2:").then((msg) => {
                            msg.edit(":cry:").then((msg) => {
                                msg.edit(":sob:")
                            })
                        })
                    })
                })
            })
        })
    })
    message.author.send("Why did u make me cry :sob: ?")
}
const { getMemberCount } = require("../../utils/count");

 function serverRoleInformation(server, message) {
    const getSpaces = (length) => {
      if (length == undefined) {
        return '';
      }
  
      let spacedString = '';
      for (let index = 0; index < 21 - length; index++) {
        spacedString += ' ';
      }
      return spacedString;
    };
  
    const roles = server.roles.cache;
    let messageData = ``;
    const keys = Array.from(roles.keys());
    for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
      const currentRole = roles.get(keys[keyIndex]);
      messageData += `${currentRole?.name}${getSpaces(
        currentRole?.name.toString().length
      )}${getMemberCount(message, currentRole)}\n`;
    }
    messageData = '```' + messageData + '```';
    message.channel.send(messageData);
  };

module.exports.run = (args, message, client) => {
    serverRoleInformation(message.guild, message)
}
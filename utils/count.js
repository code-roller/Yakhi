function getMemberCount(message, role) {
    if (role == undefined) {
      return 0;
    }
    const roleUserCount = message.guild.members.cache.filter(
      (member) => {
        return Array.from(member.roles.cache.keys()).includes(role.id);
      }
    ).size;
    if (roleUserCount == undefined) {
      return 0;
    }
    return roleUserCount;
  };

module.exports = { getMemberCount }
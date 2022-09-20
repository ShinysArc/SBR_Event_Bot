module.exports = {
  add: async (member, roleName) => {
    let role = member.guild.roles.cache.find((f) => f.name === roleName);
    if (!role) {
      role = await member.guild.roles.create({
        data: {
          name: roleName,
        },
        reason: 'New Role',
      });
    }
    member.roles.add(role);
  },
  remove: async (member, roleName) => {
    let role = member.guild.roles.cache.find((f) => f.name === roleName);
    if (!role) {
      role = await member.guild.roles.create({
        data: {
          name: roleName,
        },
        reason: 'New Role',
      });
    }
    member.roles.remove(role);
  },
};

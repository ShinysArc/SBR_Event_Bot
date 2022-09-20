module.exports = {
  name: 'gamestop',
  description: 'gamestop',
  aliases: [],
  usage: 'gamestop',
  admin: true,
  execute: async (client, message) => {
    if (!message.member.roles.cache.some(r => r.name === "Staff"))
    {
      message.reply('bonsoir non');
      return;
    }
    const msg = message.content.slice(message.content.indexOf(' ') + 1);
    const role = message.guild.roles.cache.find((r) => r.name.toLowerCase() === 'participant')
    await role.delete();
    message.delete();
    message.channel.send(msg);
  },
};

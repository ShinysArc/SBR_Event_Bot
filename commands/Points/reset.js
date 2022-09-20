module.exports = {
  name: 'reset',
  description: 'reset',
  aliases: [],
  usage: 'reset',
  admin: true,
  execute: async (client, message) => {
    if (!message.member.roles.cache.some(r => r.name === "Staff"))
    {
      message.reply('bonsoir non');
      return;
    }
    await client.db.userdata.drop();
    message.delete();
    message.channel.send('Les points ont été reset.');
  },
};

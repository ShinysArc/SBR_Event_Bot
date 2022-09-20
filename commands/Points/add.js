module.exports = {
  name: 'add',
  description: 'add',
  aliases: [],
  usage: 'add @participant <montant>',
  admin: true,
  execute: async (client, message) => {
    if (!message.member.roles.cache.some(r => r.name === "Staff"))
    {
      message.reply('bonsoir non');
      return;
    }
    const msgArr = message.content.split(' ');
    const target = message.mentions.members.first() || message.guild.members.cache.get(msgArr[2]);
    if (!target.roles.cache.some(r => r.name === "Participant"))
    {
      message.reply('bonsoir non');
      return;
    }
    const amount = parseInt(msgArr[2], 10);
    if (isNaN(amount)) {
      message.channel.send('Entrez un nombre de points valide.');
      return;
    }
    message.delete();
    message.channel.send(`✅ ${target} a empoché ${amount} points!`);
    await client.db.userdata.updateOne({ id: target.id }, { $inc: { points: amount } }, { upsert: true });
  },
};

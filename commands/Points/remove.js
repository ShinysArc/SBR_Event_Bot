module.exports = {
  name: 'remove',
  description: 'remove',
  aliases: [],
  usage: 'remove @participant <montant>',
  admin: true,
  execute: async (client, message) => {
    if (!message.member.roles.cache.some(r => r.name === "Staff"))
    {
      message.reply('bonsoir non');
      return;
    }
    const msgArr = message.content.split(' ');
    const target = message.mentions.members.first() || message.guild.members.cache.get(msgArr[2]);
    const amount = parseInt(msgArr[2], 10);
    if (isNaN(amount)) {
      message.channel.send('Entrez un nombre de points valide.');
      return;
    }
    message.channel.send(`✅ ${target} s'est vu retiré ${amount} points !`);
    await client.db.userdata.updateOne({ id: target.id }, { $inc: { points: amount * -1 } }, { upsert: true });
    message.delete();
  },
};

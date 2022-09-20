module.exports = {
  name: 'gameclose',
  description: 'gameclose',
  aliases: [],
  usage: 'gameclose',
  admin: true,
  execute: async (client, message) => {
    if (!message.member.roles.cache.some(r => r.name === "Staff"))
    {
      message.reply('bonsoir non');
      return;
    }
    client.db.config.updateOne({ id: message.guild.id }, {
      $unset: {
        message: '',
      },
    }, { upsert: true });
    const m =
`Vous ne pouvez désormais plus vous inscrire !
Les jeux vont bientôt démarrer.
Que le meilleur gagne.
||@everyone||`
    message.channel.send(m);
    message.delete();
  },
};

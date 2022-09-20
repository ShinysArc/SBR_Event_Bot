module.exports = {
  name: 'question',
  description: 'question',
  aliases: [],
  usage: 'question - <réponse> - <points>',
  admin: true,
  execute: async (client, message) => {
    if (!message.member.roles.cache.some(r => r.name === "Staff"))
    {
      message.reply('bonsoir non');
      return;
    }
    const msgArr = message.content.split(' - ');
    const answers = msgArr[1].toLowerCase().split('/');
    const points = parseInt(msgArr[2], 10);
    if (isNaN(points)) {
      message.channel.send('Entrez un nombre de points valide.');
      return;
    }
    client.question = {
      answers,
      points,
    };
    message.delete();
    message.channel.send('Question initialisée !');
  },
};

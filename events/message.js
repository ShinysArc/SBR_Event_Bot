module.exports = async (client, message) => {
  if (!client.ready) return;

  if (message.author.bot) return;

  const msg = message.content.toLowerCase();
  const commandName = msg.split(' ')[0].substring(1);

  if (!message.member) {
    return;
  }

  if (client.question) {
    if (client.question.answers.includes(message.content.toLowerCase()) && message.member.roles.cache.some(role => role.name === 'Participant')) {
      message.channel.send(`${message.author} a eu la bonne réponse ! Tu as gagné ${client.question.points} points !`);
      client.db.userdata.updateOne({ id: message.author.id }, {
        $inc: {
          points: client.question.points,
        },
      }, { upsert: true });
      delete client.question;
    }
  }

  if (message.content.startsWith('!')) {
    const command = client.commands.get(commandName);
    if (!command) {
      return;
    }
    try {
      command.execute(client, message);
    } catch (error) {
      console.error(error);
    }
  }
};

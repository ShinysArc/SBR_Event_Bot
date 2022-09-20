const generateGroups = (participants, memberCount) => {
  const groupCount = Math.ceil(participants.length / memberCount);
  const groups = [];
  [...new Array(groupCount)].forEach(() => groups.push([]));
  participants.forEach((participant, index) => {
    groups[index % groupCount].push(participant);
  });
  return groups;
};

module.exports = {
  name: 'final',
  description: 'final',
  aliases: [],
  usage: 'final - message - <#_de_participants_par_groupe>',
  admin: true,
  execute: async (client, message) => {
    if (!message.member.roles.cache.some(r => r.name === "Staff"))
    {
      message.reply('bonsoir non');
      return;
    }
    const participants = message.guild.members.cache.array().filter((m) => m.roles.cache.some((r) => r.name === 'Participant'));
    const msgArr = message.content.split(' - ');
    const messageContent = msgArr[1];
    const memberCount = parseInt(msgArr[2], 10);
    if (isNaN(memberCount)) {
      message.channel.send('Entrez un nombre de participants valide.');
      return;
    }
    const groups = generateGroups(participants, memberCount);
    message.author.send(groups);
    groups.forEach((group) => {
      group.forEach((member) => {
        member.send(`
${messageContent}\n\`\`\`
${group.map((m) => {
    let output = '';
    for (let i = 0; i < m.user.tag.length; i++) {
      let c = m.user.tag.charCodeAt(i);

      if (c >= 65 && c <= 90)
        c = ((c - 65 + 24) % 26) + 65;
      else if (c >= 97 && c <= 122)
        c = ((c - 97 + 24) % 26) + 97;

      output += String.fromCharCode(c);
      console.log(m.user.tag.charCodeAt(i), String.fromCharCode(m.user.tag.charCodeAt(i)));
    }
    return output;
  }).join('\n')}
\`\`\``).catch(console.error);
      });
    });
  },
};

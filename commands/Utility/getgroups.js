const generateGroups = (participants, memberCount) => {
    const groupCount = Math.ceil(participants.length / memberCount);
    const groups = [];
    [...new Array(groupCount)].forEach(() => groups.push([]));
    participants.forEach((participant, index) => {
      groups[index % groupCount].push(participant);
    });
    return groups;
  };

/* eslint-disable consistent-return */
/* eslint-disable max-len */
const Discord = require('discord.js');

module.exports =
{
  name: 'getgroups',
  description: 'osef',
  aliases: [],
  usage: 'getgroups',
  admin: false,
  execute: async (client, message) =>
  {
    const Role = message.guild.roles.cache.find(role => role.name == "Participant");
    const Members = message.guild.members.cache.filter(member => member.roles.cache.find(role => role == Role)).map(member => member.user.tag);

    const data = await client.db.userdata.find().toArray();
    const overall = data.sort((a, b) => b.points - a.points);
    const embed = overall.map((u) => {client.users.cache.get(u.id) ? client.users.cache.get(u.id).tag : u.id});
    groups.forEach((group) => {
        group.forEach((member) => {
            message.author.send(`
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
  }
}
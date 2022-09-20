/* eslint-disable consistent-return */
/* eslint-disable max-len */
const Discord = require('discord.js');

module.exports =
{
  name: 'nbparticipants',
  description: 'osef',
  aliases: [],
  usage: 'nbparticipants',
  admin: false,
  execute: async (client, message) =>
  {
    const Role = message.guild.roles.cache.find(role => role.name == "Participant");
    const Members = message.guild.members.cache.filter(member => member.roles.cache.find(role => role == Role)).map(member => member.user.tag);
    message.channel.send(Members);
  }
}
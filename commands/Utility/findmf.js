const Discord = require('discord.js');

module.exports =
{
  name: 'findmf',
  description: 'osef',
  aliases: [],
  usage: 'findmf',
  admin: false,
  execute: async (client, message) =>
  {
    const data = client.users.cache.find(user => user.id === 391276452995399687);
    message.author.send(data.tag);
  }
}
/* eslint-disable consistent-return */
/* eslint-disable max-len */
const Discord = require('discord.js');

module.exports = {
  name: 'announce',
  description: 'Affiche une annonce',
  aliases: ['announcement'],
  usage: 'announce "Titre" "Description"',
  admin: false,
  execute: async (client, message) => {
    if (!message.member.roles.cache.some(r => r.name === "Staff"))
    {
      message.reply('bonsoir non');
      return;
    }
    const msgArr = message.content.split('"');
    const title = msgArr[1];
    const description = msgArr[3];

    message.delete();

    if (title && description) {
      const embed = new Discord.MessageEmbed()
        .setColor('#ffffff')
        .setTitle(title)
        .setDescription(description)
        .setTimestamp();

      const roleName = 'Participant'
      message.channel.send(`${message.guild.roles.cache.find(element => (element.name.includes(roleName)) || element.id.includes(roleName))}`);
      message.channel.send(embed);
    }
  },
};

/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-await-in-loop */

const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'publicscoreboard',
  description: 'publicscoreboard',
  aliases: [],
  execute: async (client, message) => {
    if (!message.member.roles.cache.some(r => r.name === "Staff"))
    {
      message.reply('bonsoir non');
      return;
    }
    const msgArr = message.content.split(' ');
    const publicMessage = msgArr.slice(1).join(' ');
    let page = 0;
    if (msgArr[1]) {
      const tempPage = parseInt(msgArr[1], 10);
      if (!isNaN(tempPage)) {
        page = tempPage - 1;
      }
    }
    const data = await client.db.userdata.find().toArray();
    const overall = data.sort((a, b) => b.points - a.points).slice(0 + page * 10, 10 + page * 10);

    const embed = new MessageEmbed()
      .setTitle('Scoreboard')
      .setDescription(overall.map((u, index) => `#${index + 1} - ${client.users.cache.get(u.id) ? client.users.cache.get(u.id).tag : u.id} - ${u.points}`));
    await message.channel.send(publicMessage, embed);
    message.delete();
  },
};

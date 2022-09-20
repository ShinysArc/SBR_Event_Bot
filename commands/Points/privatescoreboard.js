/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-await-in-loop */

const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'privatescoreboard',
  description: 'privatescoreboard',
  aliases: [],
  execute: async (client, message) => {
    const msgArr = message.content.split(' ');
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
    await message.author.send(embed);
    message.delete();
  },
};

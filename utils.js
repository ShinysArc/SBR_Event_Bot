const { MessageEmbed } = require('discord.js');

const embed = (message, title, description) => {
  const myEmbed = new MessageEmbed()
    .setColor('#fffffe')
    .setTitle(title)
    .setAuthor(message.author.username, message.author.avatarURL() || 'https://cdn.discordapp.com/embed/avatars/0.png')
    .setDescription(description)
    .setTimestamp();
  return myEmbed;
};

module.exports = {
  embed,
};

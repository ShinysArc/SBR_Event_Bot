const roleChange = require('../utils/roleChange');

module.exports = async (client, reaction, user) => {
  if (!client.ready) return;

  if (user.bot) { return; }

  const config = await client.db.config.findOne({ id: reaction.message.guild.id });

  if (!config) return;

  if (config.message === reaction.message.id) {
    roleChange.add(reaction.message.guild.members.cache.get(user.id), 'Participant');
  }
};

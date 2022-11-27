const participantSchema = require('../../models/participant-schema');

module.exports = {
    name: 'add',
    description: 'add',
    callback: async (message) => {
        if (!message.member.roles.cache.some(r => r.name === "Staff" || r.name === "Joestar (Administrateur)")) {
            message.message.reply('bonsoir non');
            return;
        }

        const msgArr = message.message.content.split(' ');
        const target = message.message.mentions.members.first() || message.guild.members.cache.get(msgArr[2]);
        if (!target.roles.cache.some(r => r.name === "Participant")) {
            message.reply('Le participant n\'a pas le rôle Participant');
            return;
        }

        const amount = parseInt(msgArr[2], 10);
        if (isNaN(amount)) {
            message.channel.send('Entrez un nombre de points valide.');
            return;
        }

        message.message.delete();
        message.channel.send(`✅ ${target} a empoché ${amount} points!`);
        await participantSchema.updateOne({ id: target.id }, { $inc: { points: amount } }, { upsert: true });
    },
  };
  
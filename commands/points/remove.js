const participantSchema = require('../../models/participant-schema');

module.exports = {
    name: 'remove',
    description: 'remove',
    minArgs: 2,
    maxArgs: 2,
    correctSyntax: "Correct syntax: !remove <@user> <nb_points>",
    callback: async (message) => {
        if (!message.member.roles.cache.some(r => r.name === "Staff" || r.name === "Joestar (Administrateur)")) {
            message.message.reply('bonsoir non');
            return;
        }

        const msgArr = message.message.content.split(' ');
        const target = message.message.mentions.members.first();
        if (!target.roles.cache.some(r => r.name === "Participant")) {
            message.message.reply('L\'utilisateur n\'a pas le rôle Participant');
            return;
        }

        const amount = parseInt(msgArr[2], 10);
        if (isNaN(amount)) {
            message.channel.send('Entrez un nombre de points valide.');
            return;
        }

        message.message.delete();
        message.channel.send(`✅ ${target} s'est vu retirer ${amount} points !`);
        await participantSchema.updateOne({ id: target.id }, { $inc: { points: amount * -1 } }, { upsert: true });
    },
  };
  
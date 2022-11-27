const questionSchema = require('../../models/question-schema');

module.exports = {
    name: 'question',
    description: 'question',
    callback: async (message) => {
        if (!message.member.roles.cache.some(r => r.name === "Staff")) {
            message.message.reply('bonsoir non');
            return;
        }

        const msgArr = message.message.content.split(' - ');
        const answers = msgArr[1].toLowerCase().split('/').map((answer) => answer.trim());
        const points = parseInt(msgArr[2], 10);
        if (isNaN(points)) {
            message.channel.send('Entrez un nombre de points valide.');
            return;
        }

        await questionSchema.create({
            answers: answers,
            points: points,
        });

        message.message.delete();
        message.channel.send('Question initialisée !');
    },
};
  
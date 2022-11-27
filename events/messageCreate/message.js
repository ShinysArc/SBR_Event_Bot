const questionSchema = require('../../models/question-schema');
const participantSchema = require('../../models/participant-schema');

module.exports = async (message) => {
    const question = await questionSchema.findOne({});
    if (question) {
        if (question['answers'].includes(message.content.toLowerCase()) && message.member.roles.cache.some(r => r.name === 'Participant')) {
            message.channel.send(`${message.author} a eu la bonne réponse ! Tu as gagné ${question.points} points !`);
            await participantSchema.updateOne({ id: message.author.id }, { $inc: { points: question['points'] } }, { upsert: true });
            await questionSchema.deleteOne({});
        }
    }
};
const participantSchema = require('../../models/participant-schema');

module.exports = {
    name: 'reset',
    description: 'reset',
    callback: async (message) => {
        if (!message.member.roles.cache.some(r => r.name === "Staff")) {
            message.message.reply('bonsoir non');
            return;
        }

        participantSchema.find({}).then(async (data) => {
            for (let i = 0; i < data.length; i++) {
                await participantSchema
                    .updateOne(
                        { id: data[i].id },
                        { $set: { points: 0 } },
                        { upsert: true }
                    );
            }
        });
        message.message.delete();
        await message.channel.send('Les points ont été reset.');
    },
};
  
const participantSchema = require('../../models/participant-schema');
const roleSchema = require('../../models/role-schema');

module.exports = {
    name: 'gamestop',
    description: 'gamestop',
    callback: async (message) => {
        if (!message.member.roles.cache.some(r => r.name === "Staff" || r.name === "Joestar (Administrateur)")) {
            message.message.reply('bonsoir non');
            return;
        }
        const msg = message.message.content.slice(message.message.content.indexOf(' ') + 1);
        const role = message.guild.roles.cache.find(r => r.name === 'Participant');
        await roleSchema.deleteOne({ name: 'Participant' });
        await participantSchema.deleteMany();
        if (role)
            await role.delete();
        message.message.delete();
        await message.channel.send(msg);
    },
};
  
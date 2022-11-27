const { EmbedBuilder } = require('discord.js');
const roleSchema = require('../../models/role-schema');

module.exports = {
    name: 'announce',
    description: 'Affiche une annonce',
    callback: async (message) => {
        if (!message.member.roles.cache.some(r => r.name === "Staff" || r.name === "Joestar (Administrateur)")) {
            message.message.reply('bonsoir non');
            return;
        }

        const role = await roleSchema.findOne({ name: 'Participant' });

        const msgArr = message.message.content.split('"');
        const title = msgArr[1];
        const description = msgArr[3];
    
        message.message.delete();
    
        if (title && description) {
            const embed = new EmbedBuilder()
            .setColor('#0E86D4')
            .setTitle(title)
            .setDescription(description)
            .setTimestamp();

            message.channel.send({ content: `||<@&${role.id}>||`, embeds: [embed] });
        }
    },
};
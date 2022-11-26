const { EmbedBuilder } = require('discord.js');
const participantSchema = require('../../models/participant-schema');

module.exports = {
    name: 'privatescoreboard',
    description: 'privatescoreboard',
    callback: async (message) => {
        if (!message.member.roles.cache.some(r => r.name === "Staff")) {
            message.message.reply('bonsoir non');
            return;
        }

        const msgArr = message.message.content.split(' ');
        let page = 0;
        if (msgArr[1]) {
            const tempPage = parseInt(msgArr[1], 10);
            if (!isNaN(tempPage))
                page = tempPage - 1;
        }
        const data = await participantSchema.find({});
        const overall = data.sort((a, b) => b.points - a.points).slice(0 + page * 10, 10 + page * 10);
        client = message.client;

        const embed = new EmbedBuilder()
            .setTitle('Classement de la SBR')
            .setColor(0x00FF00)
            .setTimestamp()
            .setDescription(String(overall.map((u, index) => `#**${index + 1} ${client.users.cache.get(u.id).tag.slice(0, -5)}** - ${u.points} points`)));
        await message.message.author.send({ embeds: [embed] });
        message.message.delete();
    },
};
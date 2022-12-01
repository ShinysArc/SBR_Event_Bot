const { EmbedBuilder } = require('discord.js');
const participantSchema = require('../../models/participant-schema');
const roleSchema = require('../../models/role-schema');

module.exports = {
    name: 'publicscoreboard',
    description: 'publicscoreboard',
    callback: async (message) => {
        if (!message.member.roles.cache.some(r => r.name === "Staff" || r.name === "Joestar (Administrateur)")) {
            message.message.reply('bonsoir non');
            return;
        }

        const role = await roleSchema.findOne({ name: 'Participant' });
        const msgArr = message.message.content.split(' ');
        const publicMessage = msgArr.slice(1).join(' ') + `\n\n<@&${role.id}>`;
        let page = 0;
        if (msgArr[1]) {
            const tempPage = parseInt(msgArr[1], 10);
            if (!isNaN(tempPage))
                page = tempPage - 1;
        }
        const data = await participantSchema.find({});
        const overall = data.sort((a, b) => b.points - a.points).slice(0 + page * 10, 10 + page * 10);
        client = message.client;
        let IDs = []
        overall.map((u) => {
            IDs.push(client.users.fetch(u.id).then(us => us.id))
        })

        let users = await Promise.all(IDs);
        let desc = ""
        overall.map((u, index) => desc += `#**${index + 1}   <@${users[index]}>** - ${u.points} point(s)\n`)

        const embed = new EmbedBuilder()
            .setTitle('Classement de la SBR')
            .setColor(0x00FF00)
            .setTimestamp()
            .setDescription(desc);
        await message.channel.send({ content: publicMessage, embeds: [embed] });
        message.message.delete();
    },
};
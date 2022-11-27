const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const roleSchema = require('../../models/role-schema');

module.exports = {
    name: 'gameclose',
    description: 'gameclose',
    callback: async (message) => {
        if (!message.member.roles.cache.some(r => r.name === "Staff" || r.name === "Joestar (Administrateur)")) {
            message.message.reply('bonsoir non');
            return;
        }
        const role = await roleSchema.findOne({ name: 'Participant' });

        const msg = `
Vous ne pouvez désormais plus vous inscrire !
Les jeux vont bientôt démarrer.
Que le meilleur gagne.

||<@&${role.id}>||`
        const reactionMessageSchema = await roleSchema.findOne({ name: 'Participant' });
        const button = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Inscriptions terminées')
                    .setEmoji('🏇')
					.setStyle(ButtonStyle.Danger)
                    .setDisabled(true),
			);
        
        const reactionMessageId = reactionMessageSchema['messageId'];
        const channelId = reactionMessageSchema['channelId'];

        const channel = message.client.channels.cache.get(channelId);
        const reactionMessage = await channel.messages.fetch(reactionMessageId);
        reactionMessage.edit({ components: [button] });

        await message.channel.send(msg);

        message.message.delete();
    },
}
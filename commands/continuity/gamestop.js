const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const participantSchema = require('../../models/participant-schema');
const roleSchema = require('../../models/role-schema');

module.exports = {
    name: 'gamestop',
    description: 'gamestop',
    callback: async (message) => {
        if (!message.member.roles.cache.some(r => r.name === "Staff")) {
            message.message.reply('bonsoir non');
            return;
        }
        
        const msg = `
Bonjour`;
        const reactionMessageSchema = await roleSchema.findOne({ name: 'Participant' });
        const button = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Inscription terminée')
                    .setEmoji('🏇')
					.setStyle(ButtonStyle.Danger)
                    .setDisabled(true),
			);
        
        const reactionMessageId = reactionMessageSchema['messageId'];
        const channelId = reactionMessageSchema['channelId'];

        const channel = message.client.channels.cache.get(channelId);
        const reactionMessage = await channel.messages.fetch(reactionMessageId);
        reactionMessage.edit({ components: [button] });

        message.message.delete();
    },
}
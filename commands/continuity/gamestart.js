const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const participantSchema = require('../../models/participant-schema');
const roleSchema = require('../../models/role-schema');

module.exports = {
    name: 'gamestart',
    description: 'gamestart',
    init: (client) => {
        client.on('interactionCreate', async (interaction) => {
            if (!interaction.isButton())
                return;

            const member = interaction.member;
            let role = member.guild.roles.cache.find((f) => f.name === 'Participant');
            if (!role) {
                role = await member.guild.roles.create({
                    name: 'Participant',
                    reason: 'Le rôle Participant est nécessaire pour le bon fonctionnement du bot.',
                });
                await roleSchema.create({
                    id: role.id,
                    name: role.name,
                    channelId: interaction.channel.id,
                    messageId: interaction.message.id,
                });
            }

            if (member.roles.cache.some(r => r.name === "Participant")) {
                member.roles.remove(role);
                const p = await participantSchema.findOneAndDelete({
                    id: member.id
                });
                interaction.reply({ content: "Tu n'as plus le rôle Participant !", ephemeral: true });
            } else {
                member.roles.add(role);
                const p = await participantSchema.create({
                    id: member.id,
                    points: 0
                });
                interaction.reply({ content: 'Rôle Participant ajouté !', ephemeral: true });
            }
        });
    },
    callback: async (message) => {
        if (!message.member.roles.cache.some(r => r.name === "Staff" || r.name === "Joestar (Administrateur)")) {
            message.message.reply('bonsoir non');
            return;
        }
        
        const msg = `
__**Bonjour à tous et à toutes !**__
Ici Stéphane Acier, je reprends la parole quasiment __1 an après la dernière Steel Ball Run__ organisé ici sur le serveur JojoLovers !
*"Pourquoi ?"* me diriez-vous... Je vous annonce officiellement la ***2ème édition de la Steel Ball Run du JojoLovers !*** Encore une course qui s'inscrira dans la légende, puisqu'elle se déroulera tout le long du mois de décembre.

__Prenez en compte une modification importante depuis la dernière SBR :__
- Cette fois-ci, chacun-e pour soi ! Vous devrez être réactif-ve car vous, et vous seul-e êtes responsable pour monter en haut du classement.

__Concernant les règles, je vais vous rafraichir la mémoire :__
• Le classement se fera grâce à un système de points, vous aurez l'occasion d'en gagner **deux fois par jour, et chaque samedi soir** (sauf si exception), un évènement en vocal se fera pour gagner des points !
• Chaque jour, 2 questions seront posées **__à n'importe quel moment de la journée (entre 08:00 et 00:00)__**. Premier-ère répondu-e, premier-ère récompensé-e : il faudra être vif-ve pour gagner le plus de point. Les trois premiers à répondre correctement à la question gagneront des points (*le 1er 3 pts, le 2ème 2 pts et le 3ème 1 pt*). Ce tableau sera montré au gré des organisateurs qui m'épaulent, il pourra être montré à tout moment.
• Votre score déterminera votre classement dans le tableau. Des récompenses sont à la clé pour les gagnant-e-s (tomes jojo, posters, nitro...).

Sous cette annonce apparaîtra un bouton, **veuillez réagir pour indiquer votre participation**. Vous avez trois jours, jusqu'au <t:1669827600:F>, pour vous inscrire.

Alors, cher-e-s membres de JoJoLovers, êtes-vous prêt-e-s pour la Steel Ball Run ?
Que les meilleur-e-s gagnent.

||@everyone||`;
        const reactionMessage = await message.channel.send(msg);
        const button = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('primary')
					.setLabel('Participer !')
                    .setEmoji('🏇')
					.setStyle(ButtonStyle.Primary),
			);

        reactionMessage.edit({ components: [button] });
        message.message.delete();
    },
}
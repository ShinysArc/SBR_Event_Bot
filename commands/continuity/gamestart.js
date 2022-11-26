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
                    name: role.name
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
        if (!message.member.roles.cache.some(r => r.name === "Staff")) {
            message.message.reply('bonsoir non');
            return;
        }
        
        const msg = `
Bonjour, bonsoir à tous.
Je me présente, je me nomme Stéphane Acier. Vous avez sans doute entendu parler de mon arrière arrière grand-père Stephen Steel, l'organisateur de la Steel Ball Run.
Et c'est en voyant l'engouement que cette course a eu, ainsi qu'en l'honneur de sa mémoire que j'ai décidé d'organiser une deuxième édition de cet évènement légendaire.

La course se déroulera sur tout le mois de décembre, vous aurez chaque jour l'occasion de gagner des points et tous les weekends, des jeux seront mis en place pour en faire gagner davantage.
Votre score déterminera votre placement dans le top. De ce top se démarquera un podium qui pourra montrer votre avancement.
Les gagnants se verront remettre divers prix qui vous seront communiqués plus tard.

Sous cette annonce apparaîtra une emote, veuillez réagir pour indiquer votre participation. Vous avez deux jours, jusqu'au 3 décembre à 23h59, pour vous inscrire.

Alors, chers membres de JoJoLovers, êtes-vous prêts pour la Steel Ball Run ?
Que le meilleur gagne.

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
        reactionMessage.edit({components: [button]});

        message.message.delete();
    },
}
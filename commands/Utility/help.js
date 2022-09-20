/* eslint-disable consistent-return */
/* eslint-disable max-len */
const Discord = require('discord.js');

module.exports =
{
  name: 'help',
  description: 'Commande help',
  aliases: [],
  usage: 'help',
  admin: false,
  execute: async (client, message) =>
  {
    if (!message.member.roles.cache.some(r => r.name === "Staff"))
    {
      message.reply('bonsoir non');
      return;
    }
    message.channel.send(`
Voici les commandes supportées:

**!help** - Commande help


**__Points:__**

**!add <@participant> <montant>** - Ajoute le <montant> de points au <participant>.
**!remove <@participant> <montant>** - Retire le <montant> au <participant>.
**!reset** - Reset les points de tous les participants.
**!question - <réponse> - <points>** - Le premier à donner <réponse> gagne <points>.
**!privatescoreboard** - Envoie le <scoreboard> des points à la personne ayant rentré la commande.
**!publicscoreboard <message>** - Affiche le <scoreboard> avec <message> dans le channel.
**!final** - Fait plein de trucs compliqués faites pas attention svp mrc.


**__Démarrage:__**

**!gamestart** - Démarre l'event, donne le rôle "Participant" à ceux qui réagissent.
**!gameclose** - Ferme les inscriptions à l'event.
**!gamestop** - Termine l'event, le rôle "Participant" est supprimé.


**__Utilitaire:__**

**!announce "Titre" "Description"** - Affiche une annonce avec "Titre" et "Description", ping les "Participants"
`)
  }
}


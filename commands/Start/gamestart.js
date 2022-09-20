module.exports = {
  name: 'gamestart',
  description: 'gamestart',
  aliases: [],
  usage: 'gamestart',
  admin: true,
  execute: async (client, message) => {
    if (!message.member.roles.cache.some(r => r.name === "Staff"))
    {
      message.reply('bonsoir non');
      return;
    }
    const m =
`Bonjour, bonsoir à tous.
Je me présente, je me nomme Stéphane Acier. Vous avez sans doute entendu parler de mon arrière arrière grand-père Stephen Steel, l'organisateur de la Steel Ball Run.
Et c'est en voyant l'engouement que cette course a eu, ainsi qu'en l'honneur de sa mémoire que j'ai décidé d'organiser une deuxième édition de cet évènement légendaire.

La course se déroulera sur tout le mois de décembre, vous aurez chaque jour l'occasion de gagner des points et tous les weekends, des jeux seront mis en place pour en faire gagner davantage.
Votre score déterminera votre placement dans le top. De ce top se démarquera un podium qui pourra montrer votre avancement.
Les gagnants se verront remettre divers prix qui vous seront communiqués plus tard.

Sous cette annonce apparaîtra une emote, veuillez réagir pour indiquer votre participation. Vous avez deux jours, jusqu'au 3 décembre à 23h59, pour vous inscrire.

Alors, chers membres de JoJoLovers, êtes-vous prêts pour la Steel Ball Run ?
Que le meilleur gagne.

||@everyone||`
    const reactionMessage = await message.channel.send(m);
    reactionMessage.react('🏇');
    client.db.config.updateOne({ id: message.guild.id }, {
      $set: {
        message: reactionMessage.id,
      },
    }, { upsert: true });
    message.delete();
  },
};

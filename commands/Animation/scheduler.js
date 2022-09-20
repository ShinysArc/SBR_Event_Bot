const momentTimezone = require('moment-timezone')
const { MessageCollector, Discord } = require('discord.js');

const scheduledSchema = require('../../scheduled-schema.js');

module.exports =
{
  name: 'schedule',
  aliases: [],
  description: 'Commande schedule',
  expectedArgs: '<Channel> <DD/MM/YYYY> <HH:MM> <"AM" or "PM"> <Timezone>',
  minArgs: 3,
  maxArgs: 5,
  init: () => {},
  execute: async ({ message, args }) => {
      const { mentions, guild, channel } = message

      const targetChannel = mentions.channels.first()
      if (!targetChannel) {
          message.reply('Veuillez tagger un channel')
          return
      }

      // Remove the channel tag from the args array
      args.shift()

      const [date, time, clockType, timeZone] = args

      if (clockType !== 'AM' && clockType !== 'PM') {
          message.reply(`Veuillez spécifier "AM" ou "PM"`)
          return
      }

      const validTimeZones = momentTimezone.tz.names()
      if (!validTimeZones.includes(timeZone)) {
        message.reply('Timezone inconnue, veuillez utiliser une timezone parmi les suivantes: <https://gist.github.com/AlexzanderFlores/d511a7c7e97b4c3ae60cb6e562f78300>')
        return
      }

      const targetDate = momentTimezone.tz(
          `${date} ${time} ${clockType}`,
          'DD-MM-YYYY HH:mm A',
          timeZone
      )

      message.reply('Veuillez entrer le message que vous voulez programmer.')

      const filter = (newMessage) => {
          return newMessage.author.id === message.author.id
      }

      const collector = new MessageCollector(channel, filter, {
          max: 1,
          time: 1000 * 60 // 60 seconds
      })

      collector.on('end', async (collected) => {
          const collectedMessage = collected.first()

          if (!collectedMessage) {
              message.reply("Vous n'avez pas répondu à temps")
              return
          }

          message.reply('Votre message a été programmé')

          await new scheduledSchema({
              date: targetDate.valueOf(),
              content: collectedMessage.content(),
              guildId: guild.id,
              channelId: targetChannel.id
          }).save()
      })
    }
}
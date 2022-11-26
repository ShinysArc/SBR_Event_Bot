const { Client, GatewayIntentBits, Partials, ActivityType } = require('discord.js')
const WOKCommands = require('wokcommands')
const path = require('path')
require('dotenv').config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [
        Partials.Message, Partials.Reaction
    ]
})

client.on('ready', () => {
    const dbOptions = {
        keepAlive: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    client.user.setPresence({
        activities: [{
            name: 'la course',
            type: ActivityType.Watching
        }],
        status: 'dnd',
    })

    console.log('Bot is ready!');

    new WOKCommands({
        client,
        commandsDir: path.join(__dirname, 'commands'),
        events: {
            // Where the events are stored
            dir: path.join(__dirname, 'events'),
          },
        dbOptions,
        mongoUri: process.env.MONGO_URI
    })
})

client.login(process.env.TOKEN)
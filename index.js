const { Client, GatewayIntentBits } = require('discord.js')
require('dotenv').config()

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
    ],
})

client.on('ready', () => {
    console.log('Ready!')
});

client.on('messageCreate', async (message) => {
    if (message.content === '!ping') {
        await message.reply('Pong!')
    }
})

client.login(process.env.TOKEN)
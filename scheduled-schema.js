const req = require('express/lib/request')
const mongoose = require('mongoose')

const reqString = {
    type: String,
    required: true
}

const ScheduledSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    content: reqString,
    guildId: reqString,
    channelId: reqString
})

const name = 'scheduled'

module.exports = mongoose.model[name] || mongoose.model(name, ScheduledSchema, name)
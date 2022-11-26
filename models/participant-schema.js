const mongoose = require('mongoose');
const { Schema } = mongoose;

const reqString = {
    type: String,
    required: true,
};

const schema = new Schema({
    id: reqString,
    points: reqString
})

module.exports = mongoose.models['participants'] || mongoose.model('participants', schema);
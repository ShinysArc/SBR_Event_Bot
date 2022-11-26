const mongoose = require('mongoose');
const { Schema } = mongoose;

const reqString = {
    type: String,
    required: true,
};

const schema = new Schema({
    id: reqString,
    name: reqString,
})

module.exports = mongoose.models['role'] || mongoose.model('role', schema);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const reqString = {
    type: String,
    required: true,
};

const schema = new Schema({
    answers: [reqString],
    points: {
        type: Number,
        required: true,
    }
})

module.exports = mongoose.models['question'] || mongoose.model('question', schema);
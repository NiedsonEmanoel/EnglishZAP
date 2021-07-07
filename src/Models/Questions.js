const mongoose = require('mongoose'); //
const QuestionsSchema = new mongoose.Schema({
    chatId: {
        type: String,
        required: true
    },
    Points: {
        type: Number,
        required: true
    },
    NumOfQuestion: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Questions = mongoose.model('questions', QuestionsSchema);

module.exports = Questions;
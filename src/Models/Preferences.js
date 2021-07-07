const mongoose = require('mongoose');

const SchemaPreferences = new mongoose.Schema({
    QuestionNow: {
        type: Number,
        default: 1
    },

    isAbleToRegister: {
        type: Boolean,
        default: true
    },

    QuestionOneStart: {
        type: Date
    },
    QuestionOneEnd: {
        type: Date
    },

    QuestionTwoStart: {
        type: Date
    },
    QuestionTwoEnd: {
        type: Date
    },

    QuestionThreeStart: {
        type: Date
    },
    QuestionThreeEnd: {
        type: Date
    },

    QuestionFourStart: {
        type: Date
    },
    QuestionFourEnd: {
        type: Date
    },

    QuestionFiveStart: {
        type: Date
    },
    QuestionFiveEnd: {
        type: Date
    },

    QuestionSixStart: {
        type: Date
    },
    QuestionSixEnd: {
        type: Date
    },

    QuestionSevenStart: {
        type: Date
    },
    QuestionSevenEnd: {
        type: Date
    },

    QuestionEightStart: {
        type: Date
    },
    QuestionEightEnd: {
        type: Date
    },

    QuestionNineStart: {
        type: Date
    },
    QuestionNineEnd: {
        type: Date
    },

    QuestionTenStart: {
        type: Date
    },
    QuestionTenEnd: {
        type: Date
    }
});

const Preferences = mongoose.model('preferences', SchemaPreferences)

module.exports = Preferences
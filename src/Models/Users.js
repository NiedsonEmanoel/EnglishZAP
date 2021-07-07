const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    chatId: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        default: 0
    },
    answered: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

const Users = mongoose.model('users', UserSchema);

module.exports = Users;
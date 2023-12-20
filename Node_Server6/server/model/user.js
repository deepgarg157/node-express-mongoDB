const mongoose = require('mongoose')

const userInfo = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isPremium: {
        type: Boolean,
        required: true
    }

})

const Users = mongoose.model('user', userInfo)

module.exports = Users
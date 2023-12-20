const mongoose = require('mongoose')

const userInfo = new mongoose.Schema({
    fullName: {
        userFullName: {
            type: String,
            required: true
        }
    },
    email: {
        userEmail: {
            type: String,
            required: true
        }
    },
    password: {
        userPassword: {
            type: String,
            required: true
        }

    }

})

const Users = mongoose.model('user', userInfo)

module.exports = Users
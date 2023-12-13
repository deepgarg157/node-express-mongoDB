const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const ejs = require('ejs')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs')

const Users = mongoose.model('user', {
    firstName: String,
    lastName: String,
    phone: Number
})

app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'create the path is done'
    })
})

app.get('/users', async (req, res) => {
    try {
        const users = await Users.find()
        res.json({
            status: 'success',
            data: users
        })
    }
    catch (error) {
        res.json({
            status: 'Fail',
            message: error.message
        })
    }

})

app.listen(process.env.Port, () => {
    mongoose.connect(process.env.MongoDB_URL)
        .then(() => console.log('server is connected'))
        .catch((error) => console.log(error.message))
})
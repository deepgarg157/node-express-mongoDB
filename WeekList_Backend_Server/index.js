const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

app.set('view engine', 'ejs')

const userInfo = mongoose.model('user', {
    fullName: String,
    email: String,
    password: String,
    isPremium: Boolean
})

app.get('/users', async (req, res) => {
    try {
        const user = await userInfo.find()
        res.json({
            status: 'Success',
            data: user
        })
    }
    catch (error) {
        res.json({
            status: 'Fail',
            message: error.message
        })
    }
})

app.post('/users', (req, res) => {
    try {
        const { fullName, email, password, isPremium } = req.body
        console.log(req.body)
        res.json({
            status: 'Create the new user is successful',
        })
    }
    catch (error) {
        res.json({
            status: 'Fail to create the new user',
            message: error.message
        })
    }
})

const port = process.env.port || 3000
app.listen(port, () => {
    mongoose.connect(process.env.MongoDB_URL)
        .then(() => console.log('server is started'))
        .catch((error) => console.log(error.message))
})
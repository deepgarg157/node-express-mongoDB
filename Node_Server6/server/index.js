const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const ejs = require('ejs')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
dotenv.config()

const Users = require('./model/user')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

app.set('view engine', 'ejs')

// public route
app.get('/', (req, res) => {
    res.json({
        status: 'success'
    })
})

// Private route
app.get('/users', async (req, res) => {
    try {
        const user = await Users.find()
        res.json({
            status: 'successful get the user data',
            data: user
        })
    }
    catch (error) {
        res.json({
            status: 'Fail to fetch the data from the mongoDb',
            message: error.message
        })
    }
})

app.post('/register', async (req, res) => {
    try {
        const { fullName, email, password, isPremium } = req.body
        await Users.create({ fullName, email, password, isPremium })
        res.json({
            status: 'New user register is done'
        })
    }
    catch (error) {
        res.json({
            status: 'Fail to create the new user register',
            message: error.message
        })
    }
})

app.listen(process.env.port, () => {
    mongoose.connect(process.env.MongoDB_URL)
        .then(() => console.log(`server is running at port ${process.env.port}`))
        .catch((error) => console.log(error.message))
})
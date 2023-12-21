const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
dotenv.config()

const userInfo = require('./model/userModel')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())

app.set('view engine', 'ejs')

// public route
app.get('/health', (req, res) => {
    const state = "OK"
    res.json({
        status: 'the week list server',
        date: new Date(),
        state: state
    })
})

// Middleware 
const isLoggedIn = (req, res, next) => {
    const logged = true
    if (logged) {
        const { jwttoken } = req.headers
        jwt.verify(jwttoken, 'highlyCridentialSecurtyToken')
        next()
    }
    else {
        res.json({
            status: 'try the user login again'
        })
    }
}

const isPremium = (req, res, next) => {
    const premium = true
    if (premium) {
        next()
    }
    else {
        res.json({
            status: 'the user is not a premium account, pls take the premium account'
        })
    }
}

app.get('/dashboard', isLoggedIn, (req, res) => {
    res.send('this is a dashboard page')
})

app.get('/isPremium', isLoggedIn, isPremium, (req, res) => {
    res.send('This is a Premium Page')
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

app.post('/signUp', async (req, res) => {
    try {
        const { fullName, email, password, age, gender, mobile } = req.body
        const bcryptPassword = await bcrypt.hash(password, 10)
        await userInfo.create({ fullName, email, password: bcryptPassword, age, gender, mobile })
        res.json({
            status: 'SignUp is successful',
            password: bcryptPassword
        })
    }
    catch (error) {
        res.json({
            status: 'Fail to create the new user',
            message: error.message
        })
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userInfo.findOne({ email })
        if (user) {
            const passwordMatched = await bcrypt.compare(password, user.password)

            if (passwordMatched) {
                const jwtToken = jwt.sign(user.toJSON(), 'highlyCridentialSecurtyToken', { expiresIn: 60 })
                res.json({
                    status: 'success the user login',
                    jwtToken
                })
            }
            else {
                res.json({
                    status: 'Fail to logic'
                })
            }

        }
        else {
            res.json({
                status: 'Fail to user login try again'
            })
        }

    }
    catch (error) {
        res.json({
            status: 'Fail to user login',
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
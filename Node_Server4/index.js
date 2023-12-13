const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const ejs = require('ejs')
const dotenv = require('dotenv')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs')

// Schema in mongoose
const Users = mongoose.model('user', {
    fullName: String,
    email: String,
    password: String,
    isPremium: Boolean,
})

// MiddleWare
// Authentication (user identity is check)
const isLoggedIn = (req, res, next) => {
    try {
        const { jwttoken } = req.headers
        const user = jwt.verify(jwttoken, 'highlyCridentialSecurtyToken')
        next()
    }
    catch (error) {
        res.json({
            status: 'Fail',
            message: error.message
        })
    }
}

//Authorization (what is user have type of)
const isPremium = (req, res, next) => {
    const premium = true
    if (premium) {
        next()
    }
    else {
        res.json({
            status: 'Fail',
            message: 'User have to take the premium'
        })
    }
}

// Public Route
app.get('/', (req, res) => {
    res.json({
        status: 'success',
        message: 'create the path is done'
    })
})

app.get('/dashboard', isLoggedIn, (req, res) => {
    res.send("This is a Dashboard Page")
})

app.get('/isPremium', isLoggedIn, isPremium, (req, res) => {
    res.send("This is a Premium Page")
})

// Private route
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

app.post('/signup', async (req, res) => {
    try {
        const { fullName, email, password, isPremium } = req.body
        const bcryptPassword = await bcrypt.hash(password, 10)
        await Users.create({ fullName, email, password: bcryptPassword, isPremium })
        res.json({
            status: 'success',
            message: bcryptPassword
        })
    }
    catch (error) {
        res.json({
            status: 'fail',
            message: error.message
        })
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Users.findOne({ email })
        if (user) {
            const isPasswordMatched = await bcrypt.compare(password, user.password)
            if (isPasswordMatched) {
                const jwtToken = jwt.sign(user.toJSON(), 'highlyCridentialSecurtyToken', { expiresIn: 15 })
                res.json({
                    status: 'success',
                    message: 'successfully the user login',
                    jwtToken
                })
            }
            else {
                res.json({
                    status: 'Fail',
                    message: 'something is wrong pls try the login again'
                })
            }

        }
        else {
            res.json({
                status: 'Fail',
                message: 'user dont exist'
            })
        }

    }
    catch (error) {
        res.json({
            status: 'Fail',
            message: 'something is wrong pls try the login again'
        })
    }
})

app.listen(process.env.Port, () => {
    mongoose.connect(process.env.MongoDB_URL)
        .then(() => console.log('server is connected'))
        .catch((error) => console.log(error.message))
})
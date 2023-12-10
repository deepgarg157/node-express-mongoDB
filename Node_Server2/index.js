const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

const Users = mongoose.model('user', {
    firstName: String,
    lastName: String,
    phone: Number
})

app.get('/', (req, res) => {
    res.json({
        message: 'all good'
    })
})

// CRUD
// R - GET /users
// C - Post /users
// U - Patch /users/:id
// D - Delete /users/:id

app.get('/users', async (req, res) => {
    try {
        const user = await Users.find({})
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

app.post('/users', async (req, res) => {
    console.log(req.body)
    try {
        const { firstName, lastName, phone } = req.body
        await Users.create({
            firstName, lastName, phone
        })
        res.json({
            status: 'Success',
            data: []
        })
    }
    catch (error) {
        res.json({
            status: 'Fail',
            message: error.message
        })
    }
})

app.patch('/users/:id', async (req, res) => {
    try {
        const {id} = req.params
        const { firstName, lastName, phone } = req.body
        await Users.findByIdAndUpdate(id, {firstName, lastName, phone})
        res.json({
            status:'Success',
            message:'user updated sucessfully'
        })
    } catch (error) {
        res.json({
            status: 'Fail',
            message: error.message
        })
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const {id} = req.params
        await Users.findByIdAndDelete(id)
        res.json({
            status:'Success',
            message:'user Deleted sucessfully'
        })
    } catch (error) {
        res.json({
            status: 'Fail',
            message: error.message
        })
    }
})

app.listen(process.env.Port, () => {
    mongoose.connect(process.env.MongoDB_URL)
        .then(() => console.log('connected the data'))
        .catch((error) => console.log(error))
})
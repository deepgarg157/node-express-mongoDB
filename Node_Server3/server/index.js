const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

const userData = mongoose.model('user', {
    firstName: String,
    lastName: String,
    phone: Number
})

app.get('/', (req, res) => {
    res.json({
        status: 'Success',
        message: 'All good'
    })
})

app.get('/users', async (req, res) => {
    try {
        const users = await userData.find()
        res.json({
            status: 'success',
            message: users
        })
    }
    catch (error) {
        res.json({
            status: 'fail',
            message: 'something went wrong'
        })
    }
})

app.post('/users', async (req, res) => {
    try {
        const { firstName, lastName, phone } = req.body
        await userData.create({
            firstName,
            lastName,
            phone
        })
        res.json({
            status: 'success',
            message: 'create data successful'
        })
    }
    catch (error) {
        res.json({
            status: 'fail',
            message: 'something went wrong'
        })
    }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const {id} = req.params
        await userData.findByIdAndDelete(id)
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

app.listen(process.env.port, () => {
    mongoose.connect(process.env.mongoDB_URL)
        .then(() => console.log('connected the data'))
        .catch((error) => console.log(error))
    console.log('server running at localhost port 3000')
})
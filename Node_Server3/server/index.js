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
    catch(error){
        res.json({
            status:'fail',
            message:'something went wrong'
        })
    }
})

app.listen(process.env.port, () => {
    mongoose.connect(process.env.mongoDB_URL)
        .then(() => console.log('connected the data'))
        .catch((error) => console.log(error))
    console.log('server running at localhost port 3000')
})
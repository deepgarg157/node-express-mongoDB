const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const {Schema, model} = require('mongoose')
const dotenv = require('dotenv')
const ejs = require('ejs')
dotenv.config()

const server = http.createServer((req, res)=>{
    res.setHeader('Content-type', 'text-html')
    res.end("server created")
})

const app = express()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

const userInfo = new Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isPremium:{
        type:Boolean,
        required:true
    },
})

const Users = mongoose.model('user', userInfo)

const Products = [
    {
        id: 1,
        name: 'Deepanshu',
        age: 26,
        gender: 'male',
        email: 'deep123@gmail.com'
    },
    {
        id: 2,
        name: 'Ankit',
        age: 21,
        gender: 'male',
        email: 'ankit123@gmail.com'
    },
    {
        id: 3,
        name: 'Ram',
        age: 32,
        gender: 'male',
        email: 'ram123@gmail.com'
    },
    {
        id: 4,
        name: 'sita',
        age: 24,
        gender: 'female',
        email: 'sita123@gmail.com'
    }
]

app.get('/users', async (req, res) => {
    try {
        const user = await Users.find()
        res.json({
            status: 'success',
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

app.get('/product', (req, res) => {
    const id = req.params.id
    // const product = Products.find((p) => p.id == id)
    res.json({
        status: 'success',
        message: Products
    })
})

app.post('/product/:id', (req, res) => {
    console.log(req.body)
    const product = Products.push(req.body)
    try {
        res.json({
            status: 'success',
            message: 'create the new product'
        })
    }
    catch (error) {
        res.json({
            status: 'fail',
            message: error.message
        })
    }

})

app.patch('/product/:id', (req, res) => {
    try {
        res.json({
            status: 'Success',
            message: 'Update the product'
        })
    }
    catch (error) {
        res.json({
            status: 'Fail',
            message: error.message
        })
    }
})


app.delete('/product/:id', (req, res) => {
    try {
        const id = req.params.id
        const deleteProduct = Products.unshift()
        res.json({
            status: 'Success',
            message: 'delete the product'
        })
    }
    catch (error) {
        res.json({
            status: 'Fail',
            message: error.message
        })
    }
})

app.listen(process.env.port, () => {
    mongoose.connect('mongodb+srv://admin:admin123@cluster0.zeg1dyy.mongodb.net/?retryWrites=true&w=majority')
        .then(() => console.log('server started'))
        .catch((error) => console.log(error.message))
})

// server.listen(3000)

// Express
// Rest API in express
// CRUD in express
// MVC - model view controller
// EJS
// MiddleWare router
// Mongoose and mongoDB connect on the server
// CRUD in the MongoDb and mongoose on the server
// bcrypt - encrypt and decrypt
// jwt - json web token
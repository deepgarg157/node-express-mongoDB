const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req, res)=>{
    console.log(process.env)
    res.json({
        message:'all good'
    })
})

app.listen(3000, ()=>{
// mongoose.connect('mongodb+srv://admin:admin123@cluster0.zeg1dyy.mongodb.net/?retryWrites=true&w=majority')
// .then(()=>console.log('connected the data'))
// .catch((error)=> console.log(error))
//     console.log('server running on port 3000')
})
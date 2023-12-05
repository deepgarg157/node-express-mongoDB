const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')

const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:false}))

mongoose.connect('mongodb+srv://admin:admin@123@cluster0.zeg1dyy.mongodb.net/?retryWrites=true&w=majority')
.then(()=>console.log('connected the data'))
.catch((error)=> console.log(error))

app.get('/',(req, res)=>{
    res.json({
        message:'all good'
    })
})

app.listen(3000, ()=>{
    console.log('server running on port 3000')
})
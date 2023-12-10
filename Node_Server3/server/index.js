const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({extended:false}))

app.get('/', (req, res)=>{
    res.json({
        status:'Success',
        message:'All good'
    })
})

app.listen(process.env.port, ()=>{
    console.log('server running at localhost port 3000')
})
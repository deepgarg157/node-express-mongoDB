const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
    res.send('this is a home page')
})

app.get('/user', (req, res)=>{
    res.render('user')
})

app.listen(7000, ()=>{
    console.log('server running')
})
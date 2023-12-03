const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({extended : false}))

app.get('/', (req, res)=>{
    res.send("This is a Home Page")
})

app.get('/user', (req, res)=>{
const user = {
    name:'Deepanshu',
    age:27
}
    res.json(user)
})

app.get('/about', (req, res)=>{
    res.sendFile(__dirname + '/about.html')
})

app.get('/register', (req, res)=>{
    res.sendFile(__dirname + '/register.html')
})

app.post('/api/register', (req, res)=>{
    const {firstname, lastname} = req.query
    res.send(firstname + ' ' + lastname)
})

app.listen(3000, ()=>{
    console.log('server is running')
})
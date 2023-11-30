const express = require('express')
const app = express()

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

app.get('/resgister', (req, res)=>{
    res.sendFile(__dirname + '/register.html')
})

app.listen(3000, ()=>{
    console.log('server is running')
})
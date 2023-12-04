const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.send('this is a home page')
})

// app.get('/user', (req, res)=>{
//     const userinfo =  {
//         username:'deep',
//         name:'Deepanshu',
//         ahe:27,
//         email:'deep@123gmail.com',
//         password : 1234,
//         isPremium : true
//     }
//     res.render('user', userinfo)
// })

// app.get('/users', (req, res)=>{
//     const userinfo = {
//         username:'ram',
//         name:'ram',
//         ahe:28,
//         email:'ram@123gmail.com',
//         password : 1234567,
//         isPremium : false
//     }
//     res.render('user', userinfo)
// })

const USERS = [
    {
        username: 'deep',
        name: 'Deepanshu',
        ahe: 27,
        email: 'deep@123gmail.com',
        password: 1234,
        isPremium: true
    },
    {
        username: 'ram',
        name: 'ram',
        ahe: 28,
        email: 'ram@123gmail.com',
        password: 1234567,
        isPremium: false
    }
]

app.get('/not-found', (req, res) => {
    res.render('not-found')
})

app.get('/:username', (req, res) => {
    console.log(req.params)
    const { username } = req.params
    const userDetails = USERS.find((user) => user.username === username)
    if (userDetails)
        res.render('user', userDetails)
    else
        res.redirect('not-found')
})

app.listen(7000, () => {
    console.log('server running')
})
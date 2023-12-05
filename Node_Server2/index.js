const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.get('/',(req, res)=>{
    res.json({
        message:'all good'
    })
})

app.listen(3000, ()=>{
    console.log('server running on port 3000')
})
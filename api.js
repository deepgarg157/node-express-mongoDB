const express = require('express')
const app = express()

app.use(express.json())

const getData = require('./mongodb')

app.get('/', async (req, res)=>{
    const data = await getData()
    const result = await data.find().toArray()
    res.send(result)
})

app.post('/', async (req, res)=>{
    const data = await getData()
    const result = await data.insertOne(
        {
            name:'iphone 10R',
            brand:'Iphone',
            price: 250
        }
    )
    res.send(result)
})

app.listen(4000);
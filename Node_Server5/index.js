const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))

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

app.patch('/product/:id', (req, res)=>{
    try{
        res.json({
            status:'Success',
            message:'Update the product'
        })
    }
    catch(error){
        res.json({
            status:'Fail',
            message:error.message
        })
    }
})


app.delete('/product/:id', (req, res)=>{
    try{
        const id = req.params.id
        const deleteProduct = Products.unshift()
        res.json({
            status:'Success',
            message:'delete the product'
        })
    }
    catch(error){
        res.json({
            status:'Fail',
            message:error.message
        })
    }
})

app.listen(3000, () => {
    console.log('server started')
})

// Express 
// Rest API in express
// CRUD in express
// MVC - model view controller
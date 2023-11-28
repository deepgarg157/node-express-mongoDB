// const lib = require('./lib.js')

// console.log(lib.y)


// const http = require('http');
// const fs = require('fs');

// const index = fs.readFileSync('index.html', 'utf-8');
// const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
// const products = data.products;

// const server = http.createServer((req, res) => {
//      console.log(req.url, req.method);

//      if (req.url.startsWith('/product')) {
//           const id = req.url.split('/')[2]
//           const product = products.find(p => p.id === (+id))
//           console.log(product)
//           res.setHeader('Content-Type', 'text/html');
//           let modifiedIndex = index.replace('**title**', product.title)
//                .replace('**url**', product.thumbnail)
//                .replace('**price**', product.price)
//                .replace('**rating**', product.rating)
//           res.end(modifiedIndex);
//           return;
//      }

//      switch (req.url) {
//           case '/':
//                res.setHeader('Content-Type', 'text/html');
//                res.end(index);
//                break;
//           case '/api':
//                res.setHeader('Content-Type', 'application/json');
//                res.end(JSON.stringify(data));
//                break;

//           default:
//                res.writeHead(404);
//                res.end();
//      }

//      console.log('server started  ');
//      //   res.setHeader('Dummy', 'DummyValue');
// });

// server.listen(8080);

// ============== Create the API through the HTTP create server ================
// const http = require('http')
// const data = require('./lib.js')

// const server = http.createServer((req, res)=>{
//       res.setHeader('Content-Text', 'application/json')
//       res.end(JSON.stringify(data))
// })

// server.listen(8080)

// ================= Display the file form folder =================

// const fs = require('fs')
// const path = require('path');
// const { error } = require('console')
// const dirPath = path.join(__dirname, 'files')

// for(i=0 ; i<5 ; i++)
// {
//     fs.writeFileSync(dirPath + '/hello' + i + '.txt', 'this is a simple test file')
// }

// fs.readdir(dirPath, (err, files)=>{
//     files.forEach((items)=>{
//         console.log(items)
//     })
// })

// ============= C R U D with file system ==============

// C- Create
// R- Read 
// U- Update
// D- Delete

// const fs = require('fs')
// const path = require('path')
// const dirPath = path.join(__dirname, 'crud')
// const filePath = dirPath + '/crud.txt'

// Create the file
// fs.writeFileSync(filePath, 'this is a simple crud file')

// // Read the file
// fs.readFile(filePath, 'utf-8', (err, item) => {
//     console.log(item)
// })

// // Update the file
// fs.appendFile(filePath, 'this is a updated file', (err) => {
//     if (!err) {
//         console.log('file is updated')
//     }
// })

// // delete the file
// fs.unlinkSync(filePath)


// ================Handle Asynorous data in node js =================

// let a = 10;
// let b = 0;

// const waitDataUpdate = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(60)
//     }, 2000);
// })

// waitDataUpdate.then((data) => {
//     console.log(a + data)
// })

// ================= Express =============

// const express = require('express')
// const app = express()

// app.get('/', (req, res)=>{
//     res.send('This is a Home Page')
// })
// app.get('/about',(req, res)=>{
//     res.send('this is a about page')
// })
// app.get('/service',(req,res)=>{
//     res.send('this is a service page')
// })

// app.listen(8080);


// ============  Make HTML page and through the path and Template Engine EJS ============ 

// const express = require('express')
// const path = require('path')

// const app = express()

// const publicPath = path.join(__dirname, 'public')

// app.use(express.static(publicPath))

// app.set('view engine', 'ejs')

// app.get('/',(req, res)=>{
// res.sendFile(`${publicPath}/index.html`)
// })

// // how to render the EJS engine file 
// app.get('/profile', (req, res)=>{
//     const userInfo = {
//         name : 'Deepanshu',
//         email : "deep@123",
//         age : 27
//     }
//     res.render('profile', {userInfo})
// })

// app.get('/login', (req, res)=>{
//     res.render('login')
// })

// app.get('/about',(req,res)=>{
//     res.sendFile(`${publicPath}/about.html`)
// })

// app.get('/help',(req, res)=>{
//     res.sendFile(`${publicPath}/help.html`)
// })

// app.get('*', (req, res)=>{
//     res.sendFile(`${publicPath}/error.html`)
// })

// app.listen(5000)

// ================ Express js Middleware ================= 

const express = require('express');

const app = express();

const route = express.Router()

const requireFilter = require('./middleware')

// app.use(requireFilter)

route.use(requireFilter)

app.get('/user', (req, res)=>{
    res.send("this is a user page")
})

app.get('/', (req, res)=>{
    res.send("This is a Home Page")
})

route.get('/about',(req, res)=>{
    res.send('This is a About Page')
})

app.use('/', route)

app.listen(5000)


// ========== MongoDB ===============

const {MongoClient} = require('mongodb')

const url = 'mongodb://localhost:27017'
const database = 'e-comm'
const client = new MongoClient(url)

async function getData (){
    const result = await client.connect()
    const db = result.db(database)
    const collection = db.collection('products')
    const response = await collection.find({}).toArray()
    console.log(response)
}

getData()
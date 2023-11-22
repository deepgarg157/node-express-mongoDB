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
const http = require('http')
const data = require('./lib.js')

const server = http.createServer((req, res)=>{
      res.setHeader('Content-Text', 'application/json')
      res.end(JSON.stringify(data))
})

server.listen(8080)

// ================= Display the file form folder =================

const fs = require('fs')
const path = require('path');
const dirPath = path.join(__dirname, 'files')

for(i=0 ; i<5 ; i++){
    fs.writeFileSync(dirPath + '/hello' + i + '.txt', 'this is a simple test file')
}
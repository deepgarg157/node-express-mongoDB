const {MongoClient} = require('mongodb')

const url = 'mongodb://localhost:27017'
const database = 'e-comm'
const client = new MongoClient(url)

async function getData (){
    const result = await client.connect()
    const db = result.db(database)
    return db.collection('products')
}

module.exports = getData;
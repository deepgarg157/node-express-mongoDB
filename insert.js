const getData = require('./mongodb')

const insertdata = async () => {
    try{
        const db = await getData()
        const result = await db.insertOne(
            { name: 'note 12 Pro', brand: 'MI', price: '10000', category: 'mobiles' }
        )
        console.log(result)
        return result
    }catch(e){
        console.log(e)
    }
   
}
insertdata()
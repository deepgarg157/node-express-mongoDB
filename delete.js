const getData = require('./mongodb')

const deleteData = async () => {
    let data = await getData()
    let result = await data.deleteOne(
        { name: 'Oneplus 8' })
    console.log(result)
}

deleteData()
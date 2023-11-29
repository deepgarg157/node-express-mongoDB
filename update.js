const getData = require('./mongodb')

const updateData = async () => {

    let data = await getData()
    let update = await data.updateOne(
        { name: 'note 12 pro' },
        { $set: { name: 'note 12 pro max' } }
    )
    console.log(update)
}

updateData()
const mongodb = require('mongodb')
const mongoose = require('mongoose')

const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectID
//const id = new ObjectID()
//console.log(id)

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Spojení s databází selhalo')
    }

    const db = client.db(databaseName)
    
})
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-project', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
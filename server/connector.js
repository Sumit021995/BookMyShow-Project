
// Import MongoDB for server connection  
const mongodb = require('mongodb');
// MongoURI for local Machine Server Connection(mongoDB Compass)
const mongoURI = "mongodb://localhost:27017" + "bookMovie"
// Import mongoose for Object Data Modeling (ODM) library for MongoDB and Node.js
let mongoose = require('mongoose');
//  Import Mongoose Schema from schema.js
const { bookMovieSchema } = require('./schema')

//  .connect Method used to connect mongoDB server online
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("connection established with mongodb server online"); })
    .catch(err => {
        console.log("error while connection", err)
    });
    //  Create collection in Database
let collection_connection = mongoose.model('bookmovietickets', bookMovieSchema)


exports.connection = collection_connection;

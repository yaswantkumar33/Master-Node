// const mongodb = require("mongodb");

// const mongoClient = mongodb.MongoClient;
// const ObjectId = mongodb.ObjectId;
// let database;

// async function getDatabase() {
//     const client = await mongoClient.connect("mongodb://127.0.0.1:27017");
//     database = client.db("library");

//     if (!database) {
//         console.log("Database not conencted/1");
//     }

//     return database;
// }


// mongoose method 

const mongoose = require('mongoose');

async function getDatabase() {
    mongoose.connect('mongodb+srv://articstark1512_db_user:AwJiqf6zLsFUUQTd@mogodbwithyash.52qw2an.mongodb.net/?appName=mogodbwithYash').then(() => {
        console.log("Database connected")
    }).catch(() => {
        console.log("Connection failed to database")
    })

}

module.exports = { getDatabase };

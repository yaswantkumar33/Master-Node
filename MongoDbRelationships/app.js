// const mongodb = require("mongodb");
// const mongoClient = mongodb.MongoClient;

const mongoose = require('mongoose');

const orderModel = require('./models/orderModel');
require('./models/productModel');
require('./models/customerModel');



(async () => {

    // database conenction in mongoose 
    await mongoose.connect('mongodb://127.0.0.1:27017/customers').then(() => {
        console.log("Dataase Connceted sucessfully")
    }).catch(() => {
        console.log("database not connected")
    })



    // console.log(orderModel);
    // console.log(typeof orderModel);
    try {
        const orders = await orderModel.find({}).populate(['product_ids', 'customer_id']);
        console.log(JSON.stringify(orders));
    } catch (err) {
        console.log(err);


    }



    // let database;
    // database = await mongoClient.connect('mongodb://127.0.0.1:27017').then((client) => {
    //     database = client.db('customers');
    //     if (!database) {
    //         console.log('Database not connected');
    //     } else {
    //         console.log('Database connected');
    //     }
    //     return database;
    // });

    // const orders = await database.collection('orders').aggregate([{ $lookup: { from: "products", localField: "product_ids", foreignField: '_id', as: "products" } }]).toArray();

    // console.log(orders);




})();
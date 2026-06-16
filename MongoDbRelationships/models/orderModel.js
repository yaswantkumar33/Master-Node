const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    amount: Number,
    customer_id: [{ type: ObjectId, ref: 'Customers' }],
    product_ids: [{ type: ObjectId, ref: 'Product' }]
})

const ordersmodel = mongoose.model('orders', ordersSchema);
module.exports = ordersmodel;

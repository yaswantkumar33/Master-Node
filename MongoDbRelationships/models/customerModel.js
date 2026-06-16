const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String
})

const customerModel = mongoose.model('Customers', customerSchema);

module.exports = customerModel;
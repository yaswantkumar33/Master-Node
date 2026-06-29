const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    name: String,
    price: Number
});

module.exports = mongoose.model("Product", productsSchema);


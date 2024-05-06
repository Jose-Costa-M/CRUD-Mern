const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: String,
    name: String,
    quantity: Number,
    price: Number,
    material: String,
    color: String,
    size: String,
    createAT: Date,
  });

  const Product = mongoose.model('Product', productSchema);

  module.exports = Product;
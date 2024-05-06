const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    id: String,
    name: String,
    productid: String,
    priceSale: Number,
    quantitySale: Number,
    saleType: String,
    fechaDeVenta: Date,
  });

  const Sale = mongoose.model('Sale', saleSchema);

  module.exports = Sale;
const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    CustomerName: String,
    CustomerEmail: String ,
    CustomerPhone: String,
    CustomerPassword: String,
    CustomerImage: String
})

module.exports = mongoose.model('customers', CustomerSchema);

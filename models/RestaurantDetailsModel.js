const mongoose = require('mongoose');

const RestaurantDetailsSchema = new mongoose.Schema({
    RestaurantName: String,
    RestaurantLocation: Array,
    OwnerName: String,
    OwnerEmail: String,
    OwnerPhone: String,
    OwnerPassword: String,
    menuItems: Object
})

module.exports = mongoose.model('restaurantdetails', RestaurantDetailsSchema);

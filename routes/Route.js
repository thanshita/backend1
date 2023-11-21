const express = require('express')
const router = express.Router();
const RestaurantDetailsModel = require('../models/RestaurantDetailsModel');
const CustomerModel = require('../models/CustomerModel');

router.route('/upload').post((req, res) => {
    const RestaurantName = req.body.RestaurantName;
    const RestaurantLocation = req.body.RestaurantLocation;
    const OwnerName = req.body.OwnerName;
    const OwnerEmail = req.body.OwnerEmail;
    const OwnerPhone = req.body.OwnerPhone;
    const OwnerPassword = req.body.hashedOwnerPassword;
    const menuItems = req.body.menuItemsSep;
    const newData = new RestaurantDetailsModel({
        RestaurantName, RestaurantLocation, OwnerName, OwnerEmail, OwnerPhone, OwnerPassword, menuItems
    });

    newData.save();
})
router.route('/update').put((req, res) => {
    const ownerEmail = req.body.OwnerEmail;
    const updatedMenuItems = req.body.menuItems;
  
    RestaurantDetailsModel.findOneAndUpdate(
      { OwnerEmail: ownerEmail },
      { $set: { menuItems: updatedMenuItems } },
      { new: true }
    )
      .then((updatedRestaurant) => {
        if (!updatedRestaurant) {
          return res.status(404).json('Restaurant not found');
        }
        return res.status(200).json('Menu items updated successfully');
      })
      .catch((err) => {
        res.status(400).json('Error updating menu items: ' + err);
      });
  });
  
  
router.route('/newcustomer').post((req, res) => {
    const CustomerName = req.body.name;
    const CustomerEmail = req.body.email;
    const CustomerPhone = req.body.phone;
    const CustomerPassword = req.body.password;
    const CustomerImage = req.body.userImage
    const newCustomerData = new CustomerModel({
        CustomerName, CustomerEmail, CustomerPhone, CustomerPassword, CustomerImage
    });

    var dup = false;

    CustomerModel.find({ CustomerEmail: req.body.email }).then((result) => {
        // console.log("serverrrrrrrrrrrrrrr", result.length)
        if (result.length > 0) dup = true;
    })

    setTimeout(() => {
        if (!dup) {
            newCustomerData.save();
            res.send({ message: "success" })
        } else {
            res.send({ message: "duplicate" })
        }
    }, 2000)
})

router.route('/usercheck1').get((req, res) => {
    CustomerModel.find({ CustomerEmail: req.query.email }).then((err, result) => {
        // console.log("result", req.query.email)
        if (err) {
            res.send(err)
            return
        }

        res.send(result)

    })
});

// check in resta users
router.route('/usercheck2').get((req, res) => {
    RestaurantDetailsModel.find({ OwnerEmail: req.query.email }).then((err, result) => {
        // console.log("result", req.query.email)
        if (err) {
            res.send(err)
            return
        }
        res.send(result)
    })
});

router.route('/resdetails').get((req,res) =>{
    RestaurantDetailsModel.find({}).then((err,result)=>{
        if(err){
            res.send(err)
            return
        }
        res.send(result)
    })
})
router.route('/custdetails').get((req,res) =>{
    CustomerModel.find({}).then((err,result)=>{
        if(err){
            res.send(err)
            return
        }
        res.send(result)
    })
})

module.exports = router;
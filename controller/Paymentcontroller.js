const Razorpay = require('razorpay');
var crypto = require("crypto");
const KEY_ID = 'rzp_test_FRazYtp3DBYKDA'
const KEY_SECRET = 'aIh37733BX0ytWNCgFOt38XD'

module.exports.orders = (req, res) => {

    let instance = new Razorpay({ key_id: KEY_ID, key_secret: KEY_SECRET })  //creating a razorpay instance

    var options = {
        amount: req.body.amount * 100,  // amount in the smallest currency unit i.e paise to convert all the ruppees into paise.
        currency: "INR",// currency should be inr.
    };

    instance.orders.create(options, function (err, order) {   
        if (err) {
            return res.send({ code: 500, message: 'Server Err.' })  // if the order is not created then send server error.
        }
        return res.send({ code: 200, message: 'order created', data: order }) // else order created and the data is our order ie the response is our order
    });
}


module.exports.verfiy = (req, res) => {                               //payment verification process starts.


    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id; // signature of request of body from razorpay.

    var expectedSignature = crypto.createHmac('sha256', KEY_SECRET)
        .update(body.toString())                                            // process to decrypt the expected signature using crypto module.
        .digest('hex');

    if (expectedSignature === req.body.response.razorpay_signature) {
        res.send({ code: 200, message: 'Sign Valid' });                     // if the razor pay signature is equal to the expected then sign valid else not valid.
    } else {

        res.send({ code: 500, message: 'Sign Invalid' });
    }
}
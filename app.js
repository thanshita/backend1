const express = require('express')
const serverless = require('serverless-http')
var bodyParser = require('body-parser');

const app = express('')
const cors = require('cors')
const mongoose = require('mongoose')

const paymentController = require('./controller/Paymentcontroller')

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: '50mb' }));

app.post('/orders', paymentController.orders)
app.post('/verify', paymentController.verfiy)

mongoose.connect('mongodb+srv://rohithsuri2003:mern@cluster0.vzrjutg.mongodb.net/?retryWrites=true&w=majority')
    .then((res) => {
        console.log('connected to database')
    }).catch(err => console.log(err))


app.use('/', require('./routes/Route'))

app.listen(3000, () => {
    console.log('server connected')
})

module.exports = app
module.exports.handler = serverless(app)
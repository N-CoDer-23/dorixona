const { Schema, model} = require('mongoose')

const pharmacySchema = new Schema({
    title: { 
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    lifetime: {
        type: String,
        require: true
    },
    addDay:{
        type: String,
        require: true
     },
    price:{
        type: Number,
        require: true
    },
    image:{
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    }

})

const Product = model('product', pharmacySchema);
module.exports = Product
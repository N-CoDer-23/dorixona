const { Schema, model}= require('mongoose')

const userSchema = new Schema({ 
    fname: {type: String, require: true},
    lname: {type: String, require: true},
    birthday: {type: String, require: true},
    userName: {type: String, require: true},
    password: {type: String, require: true},
    gender: {type: String},
    phoneNumber: {type: Number, require: true},
    address: {type: String},
    salary: {type: String, require: true},
    idNumber: {type: String, require: true},
    type: {type: String, require: true},
    workTime: {type: String, require: true}
})

const User = model('user', userSchema);
module.exports = User;
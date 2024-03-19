const { Schema, model}= require('mongoose')

const userSchema = new Schema({ 
    fname: {type: String, require: true},
    lname: {type: String, require: true},
    birthday: {type: String, require: true},
    username: {type: String, require: true},
    password: {type: String, require: true},
    gender: {type: String},
    phonenumber: {type: Number, require: true},
    address: {type: String},
    salary: {type: String, require: true},
    idnumber: {type: String, require: true},
    type: {type: String, require: true},
    worktime: {type: String, require: true}
})

const User = model('user', userSchema);
module.exports = User;
const {Router} = require('express')

const users = Router();

const{getUser, Login, Register,deleteUser,updateUser} = require('../controls/login')

users.get('/getUser', getUser);
users.post('/postLogin', Login);
users.post('/postRegister', Register);
users.delete('/deleteUser', deleteUser);
users.put('/updateUser', updateUser);


module.exports = {users};
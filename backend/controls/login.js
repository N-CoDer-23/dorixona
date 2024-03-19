const User = require('../model/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUser = (req, res) => {
    const allInfo = req.body;
    res.send(allInfo)
}
// -------Login - Sigin in-------------
const Login = async(req, res) => {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });

        if (!user){
            return res.status(401).send({
                success: false,
                message: "Username or Password involid!"
            })
        }

        if (await bcrypt.compare(password, user.password)){
            const token = jwt.sign({username: user.username}, "Secret")
            return res.status(200).send({
                success: true,
                message: `Welcome back ${username}`,
                token: token
            })
        }
        else {
            res.status(401).send({
                success: false,
                message: "Username or Password involid!"
            })
        }
    }catch(error){
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Server error"
        })
    }
}

// -----Register - SiginUp-------
const Register = async (req, res) => {
    try{
        const {username, password} = req.body;
        const existingUser = await User.find({ username });
        const hashedPassword = await bcrypt.hash(password, 15);

        if (existingUser) {
            res.status(400).send({
                success: false,
                message: "Username already exists!"
            })
        }
        else {
            let allInfo = req.body;
            const newUser = new User({allInfo, hashedPassword});
            await newUser.save();
            res.status(201).send({
                success: true,
                message: "Registration successful!"
            })
        }
    }catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Server error"
        })
    }
}
// ---------Delete - User---------
const deleteUser = async (req, res) => {
    try{
        let {_id} =req.body;
        let deleted = await User.findByIdAndDelete(_id);

        if (!deleted) {
            return req.send({
                success: false,
                message: "User deleted!",
                token: deleted
            })
        }
    }catch (error) {
        res.send({ success: false, message: error})
    }
}
// ------Update User-----------
const updateUser = async (req, res) => {
    try{
        let { id } = req.body;
        let body = req.body;
        let editUser = await User.updateMany({ _id: id }, body);

        if (!editUser) {
            return res.send({
                success: false,
                message: "User is not updated!",
                token: editUser
            })
        }
        res.send({
            success: true,
            message: "User is updated!",
            token: editUser
        });

    } catch (error) {
        res.send({ success: false, message: error })
    }
}


module.exports = {
    getUser,
    Login,
    Register,
    deleteUser,
    updateUser

}
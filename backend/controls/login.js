const User = require('../model/UserSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getLogin = (req, res) => {
    const allUserInfo = req.body;
    res.send(allUserInfo)

}
// ----------------Login-SignIn-------------------
const Login = async (req, res) => {
    try {

        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Username yoki Password noto'g'ri!"
            })
        }
        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ username: user.username }, "secret")
            return res.status(200).send({
                success: true,
                message:` Xush kebsiz ${username}`,
                token: token
            })
        }
        else {
            res.status(401).send({
                success: false,
                message: "Username yoki Password noto'g'ri!"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            succes: false,
            message: "Serverda xato"
        })
    }
}

// ----------------Register-SignUp-------------------
const Register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.find({ username });
        const hashedPassword = await bcrypt.hash(password, 15)

        if (existingUser) {
            res.status(400).send({
                success: false,
                message: "Username chiqib ketdi!"
            })
        } else {
            let allUserInfo = req.body;
            const newUser = new User({ allUserInfo, hashedPassword });
            await newUser.save();
            res.status(201).send({
                success: true,
                message: "Muaffiyaqatli registratsiya bo'ldi !"
            })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({
            succes: false,
            message: "Serverda xato"
        })
    }
}

// ----------------Delete Login--------------------
const deleteLogin = async (req, res) => {
    try {
        let { _id } = req.body;
        let deleted = await User.findByIdAndDelete(_id);

        if (!deleted) {
            return res.send({
                success: false,
                message: "User o'chirildi!",
                innerData: deleted
            })
        }
    } catch (error) {
        res.send({ success: false, message: error })
    }
}
// ----------------Update Login--------------------
const updateLogin = async (req, res) => {
    try {
        let { id } = req.body;
        let body = req.body;
        let editUser = await User.updateMany({ _id: id }, body);

        if (!editUser) {
            return res.send({
                success: false,
                message: "User yangilanmadi",
                innerData: editUser
            })
        }
        res.send({
            success: true,
            message: "User yangilandi !",
            innerData: editUser
        });
    } catch (error) {
        res.send({ success: false, message: error })
    }
}


module.exports = {
    getLogin,
    Login,
    Register,
    deleteLogin,
    updateLogin
}
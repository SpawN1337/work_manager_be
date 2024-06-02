const jwt = require('jsonwebtoken');
// require model
const User = require('../models/userShema')
// require the lodash
const _ = require('lodash')
//  require bcrypt and create the salt
const bcrypt = require('bcrypt');


// login controller
exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            const compaire = await bcrypt.compare(req.body.password, user.password);
            if (compaire) {
                //  create of jwt token 
                const tokenData = {
                    userId: user._id,
                    username: user.username,
                    role: user.role
                }
                const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
                res.send({ message: 'تم التحقق بنجاح', token: token });
            } else {
                res.status(400).send({ message: 'خطأ في إسم المستخدم أو في كلمة العبور' });
            }
        } else {
            res.status(400).send({ message: "خطأ في إسم المستخدم أو في كلمة العبور" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error Occured");
    }
}

// register controller 
exports.register = async (req, res) => {
    try {
        const userFound = await User.findOne({ username: req.body.username });
        if (userFound) {
            res.status(400).send({ message: 'إسم المستخدم متواجدة قم بإختيار إسم آخر' })
        } else {
            const hashedPwd = await bcrypt.hash(req.body.password, 10);
            const createdUser = await User.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                grade: req.body.grade,
                bureau: req.body.bureau,
                role: req.body.role,
                password: hashedPwd,
            });
            res.json({ message: 'تمت الإضافة بنجاح' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//reset password contoller
exports.changePassword = async (req, res) => {
    const { resetlink, newPass } = req.body
    try {
        if (resetlink) {
            jwt.verify(resetlink, process.env.RESET_PASSWORD_KEY, async (err, decodedData) => {
                if (err) {
                    res.status(400).json({ message: 'invalid token or it is expired' })
                }
                const user = await User.findOne({ resetlink })

                const hashedPwd = await bcrypt.hash(newPass, 10);
                user.password = hashedPwd;
                user.resetlink = '';
                await user.save();
                res.status(200).json({ message: "your password has been changed" })
            })
        } else {
            res.status(400).json({ message: "reset link is expired" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server error Occured" });
    }
}


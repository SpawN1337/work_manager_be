const User = require('../models/userShema')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// get all users
exports.allUsers = async (req, res) => {
    try {
        const users = await User.find({}).populate('grade');;
        res.json(users);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//add one user(not used)
exports.addUser = async (req, res) => {
    try {
        //hash password
        console.log("userrrrrr",req.body)
        const createdUser = await User.create(req.body)
        res.json(createdUser);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//update user by id
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        //hash password
        if(req.body.password != user.password ){
        const hashedPwd = await bcrypt.hash(req.body.password, 10);
        req.body.password=hashedPwd;}
        const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body)
        res.json(updatedUser);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}



// remove user by id
exports.removeUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        res.json({ message: 'deleted user successfully' });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//get one user by id
exports.getUser = async (req, res) => {
    try {
        //hash password
        const getUser = await User.findById(req.params.id)
        res.json(getUser);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
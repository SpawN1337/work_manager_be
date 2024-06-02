const express = require('express');
const router = express.Router();
// reuire Controller
const userController = require('../controllers/userController')

// get all user
router.get('/allusers', userController.allUsers)

// add one user
router.post('/adduser', userController.addUser)

//getone user by id
router.get('/getuser/:id', userController.getUser)

// update user by id
router.put('/updateuser/:id', userController.updateUser)

// delete user by id
router.delete('/removeuser/:id', userController.removeUser)


module.exports = router;
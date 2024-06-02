const express = require('express');
const router = express.Router();

//require Controller
const authController = require(('../controllers/authController'));

//register controller
router.post('/register', authController.register);

//login controller
router.post("/login", authController.login);


module.exports = router;

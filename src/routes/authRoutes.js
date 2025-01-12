const express = require('express');
const {registerUser, loginUser, forgotPassword} = require('../controllers/AuthController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);


module.exports = router;



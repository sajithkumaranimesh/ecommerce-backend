const express = require('express');
const {registerUser, loginUser, forgotPassword, resetPassword} = require('../controllers/AuthController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:resetToken', resetPassword);


module.exports = router;



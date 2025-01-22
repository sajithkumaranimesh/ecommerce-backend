const express = require('express')
const { createOrder } = require('../controllers/OrderController');

const router = express.Router();

router.post('/create-checkout-session', createOrder);

module.exports = router
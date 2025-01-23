const orderService = require('../service/OrderService');


const createOrder = async (req, res) => {
    try{
        const { cartItems } = req.body;
        const result = await orderService.createOrder(cartItems);

        res.status(201).json(result);
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { createOrder }
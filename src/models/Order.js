const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    lineItems: [
        {
            price_data: {
                currency: String,
                product_data: {
                    name: String,
                    images: [String],
                },
                unit_amount: Number,
            },
            quantity: Number,
        }
    ],
    sessionId: String,
})

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
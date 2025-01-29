const Order = require('../models/Order');
const stripe = require('stripe')('sk_test_51Qi77VDSOdB84Ar5WYOs92YdN2geHGbtt8DPjl6UuJgPiDvAcJ0yvbaGm9qIWpbZs5sLXTl44XCOwIkBPy6ffxkN00RRw5wZwi');


const createOrder = async (cartItems) => {
    try{
        const lineItems = cartItems.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.imageUrl],
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        })

        const newOrder = new Order({
            lineItems: lineItems,
            sessionId: session.id,
        })

        await newOrder.save();

        return { success: true, message: "Order successfully saved!", data: session };
    }catch(error){
        throw new Error(error);
    }
}

module.exports = { createOrder }
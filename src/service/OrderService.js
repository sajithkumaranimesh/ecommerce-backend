const Order = require('../models/Order');
const stripe = require('stripe')('sk_test_51Qi77VDSOdB84Ar5WYOs92YdN2geHGbtt8DPjl6UuJgPiDvAcJ0yvbaGm9qIWpbZs5sLXTl44XCOwIkBPy6ffxkN00RRw5wZwi');
const mongoose = require('mongoose');
const Product = require('../models/Product')

const createOrder = async (cartItems) => {

    const session = await mongoose.startSession();
    session.startTransaction();

    try{

        if(!cartItems || cartItems.length === 0){
            throw new Error("Cart items are required to create an order.");
        }

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
        
        const sessionData = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/cancel',
        })

        for(const item of cartItems){
            const product = await Product.findById(item._id).session(session);
            if(!product || product.stock < item.quantity){
                throw new Error(`Product ${item._id} is out of stock.`);
            }

            product.stock -= item.quantity;
            await product.save({ session });
        }

        const newOrder = new Order({
            lineItems: lineItems,
            sessionId: sessionData.id,
        })

        await newOrder.save({ session });

        await session.commitTransaction();
        session.endSession();

        return { success: true, message: "Order successfully created!", data: sessionData };
    }catch(error){
        throw new Error(error);
        // throw new Error("Failed to save Order.");
    }
}

module.exports = { createOrder }
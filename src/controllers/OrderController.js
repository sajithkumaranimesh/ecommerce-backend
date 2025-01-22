const express = require('express');
const app = express();
const stripe = require('stripe')('sk_test_51Qi77VDSOdB84Ar5WYOs92YdN2geHGbtt8DPjl6UuJgPiDvAcJ0yvbaGm9qIWpbZs5sLXTl44XCOwIkBPy6ffxkN00RRw5wZwi');

app.use(express.json());


const createOrder = async (req, res) => {
    console.log(req.body.cartItems);

    try{
        const lineItems = req.body.cartItems.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.name,
                    images: [item.imageUrl], // Ensure the URL is valid
                },
                unit_amount: item.price * 100, // Convert price to cents
            },
            quantity: item.quantity, // Correctly specify the quantity
        }));
        

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/success',
            cancel_url: 'http://localhost:3000/success',
        })

        console.log(session);
        res.status(200).json(session);
    }catch(error){}
}

module.exports = { createOrder }
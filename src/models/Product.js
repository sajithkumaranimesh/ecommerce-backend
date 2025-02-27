const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: [true, "product name is required!"],
    },
    description: {
        type: String,
        required: [true, "description is required!"],
    },
    price: {
        type: Number,
        required: [true, "price is required!"],
    },
    stock: {
        type: Number,
        required: [true, "stock is required!"],
    },
    image_url: {
        type: String,
        required: [true, "image url is required!"]
    },
    category: {
        type: Schema.ObjectId,
        ref: "category"
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
})

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
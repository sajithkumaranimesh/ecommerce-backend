const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [true, "category name is required!"]
    },
    description: {
        type: String,
        required: [true, "description is required!"]
    },
    image_url: {
        type: String,
        required: [true, "image_url is required!"]
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
    }
})

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
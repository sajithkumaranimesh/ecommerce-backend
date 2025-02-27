const Product = require("../models/Product");

const persist = async ( product ) => {
    try{
       const newProduct =  new Product(product);
       newProduct.created_at = Date.now();
       newProduct.updated_at = Date.now();
       await newProduct.save();
       return { success: true, message: "Product successfully created!" };
    }catch(error){
        throw new Error("Failed to create product.");
    }
}


const retrieveAll = async () => {
    try{
        const productList = await Product.find();
        return { success: true, message: "Products successfully retrieved!", data: productList };
    }catch(error){
        throw new Error("Failed to retrieve products.");
    }
}


const retrieveById = async (id) => {
    try{
        const product = await Product.findById(id);
        if (!product) {
            throw new Error("Product not found.");
        }
        return { success: true, message: "Product successfully retrieved!", data: product };
    }catch(error){
        throw new Error("Failed to retrieve product by id.");
    }
}


const deleteById = async (id) => {
    try{
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            throw new Error("Product not found.");
        }
        return { success: true, message: "Product successfully deleted!", data: deletedProduct };
    }catch(error){
        throw new Error("Failed to delete product by id.");
    }
}


const updateById = async (id, product) => {
    try{
        product.updated_at = Date.now();
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new: true});
        if (!updatedProduct) {
            throw new Error("Product not found.");
        }
        return { success: true, message: "Product successfully updated!", data: updatedProduct };
    }catch(error){
        throw new Error("Failed to update product by id.")
    }
}


module.exports = { persist, retrieveAll, retrieveById, deleteById, updateById}
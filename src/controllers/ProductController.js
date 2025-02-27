const productService = require('../service/ProductService');


const persist = async (req, res) => {
    try{
        const product = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            image_url: req.body.imageUrl,
            category: req.body.category
        }
        const result = await productService.persist(product);
        res.status(201).json(result);
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}


const retrieveAll = async (req, res) => {
    try{
        const result = await productService.retrieveAll();
        res.status(200).json(result);
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}


const retrieveById = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await productService.retrieveById(id);
        res.status(200).json(result);
    }catch(error){
        res.status(404).json({ success: false, message: error.message });
    }
}


const deleteById = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await productService.deleteById(id);
        res.status(200).json(result);
    }catch(error){
        res.status(404).json({ success: false, message: error.message });
    }
}


const updateById = async (req, res) => {
    try{
        const { id } = req.params;
        const updateProduct = {
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            image_url: req.body.imageUrl,
            category: req.body.category
        }
        const result = await productService.updateById(id, updateProduct);
        res.status(200).json(result);
    }catch(error){
        res.status(404).json({ success: false, message: error.message });
    }
}


module.exports = { persist, retrieveAll, retrieveById, deleteById, updateById };
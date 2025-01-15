const categoryService = require('../service/CategoryService');


const persist = async (req, res) => {
    try{
        const { name, description, imageUrl} = req.body;
        const result = await categoryService.persist({ name, description, imageUrl})
        res.status(201).json(result);
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}


const retrieveAll = async (req, res) => {
    try{
        const result = await categoryService.retrieveAll();
        res.status(200).json(result);
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}


const retrieveById = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await categoryService.retrieveById(id)
        res.status(200).json(result);
    }catch(error){
        res.status(404).json({ success: false, message: error.message });
    }
}


const deleteById = async (req, res) => {
    try{
        const { id } = req.params;
        const result = await categoryService.deleteById(id);
        res.status(200).json(result);
    }catch(error){
        res.status(404).json({ success: false, message: error.message });
    }
}


const updateById = async (req, res) => {
    try{
        const { id } = req.params;
        const { name, description, imageUrl } = req.params;
        const result = await categoryService.updateById(id, { name, description, imageUrl });
        res.status(200).json(result);
    }catch(error){
        res.status(404).json({ success: false, message: error.message });
    }
}


module.exports = { persist, retrieveAll, retrieveById, deleteById, updateById}
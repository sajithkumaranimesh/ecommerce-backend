const Category = require("../models/Category");

const persist = async ({ name, description, imageUrl, }) => {
    try{
        await Category({
            name: name,
            description: description,
            image_url: imageUrl,
            created_at: Date.now(),
            update_at: Date.now(),
        }).save();
        return { success: true, message: "category persist successful!"};
    }catch(error){
        throw new Error("category persist faild!");
    }
}

const retrieveAll = async () => {
    try{
        const categoryList = await Category.find();
        return { success: true, message: "retrieve category successful!", categoryList};
    }catch(error){
        throw new Error("category retrieve faild!");
    }
}

const retrieveById = async (id) => {
    try{
        const category = await Category.findById(id);
        return { success: true, message: "retrieve by id successfull!", category};
    }catch(error){
        throw new Error("retrieve by id faild!");
    }
}

const deleteById = async (id) => {
    try{
        const deletedCategory = await Category.findByIdAndDelete(id);
        return { success: true, message: "delete by id successfull!", deletedCategory};
    }catch(error){
        throw new Error("delete by id faild!");
    }
}

const updateById = async (id) => {
    try{
        const updatedCategory = await Category.findByIdAndUpdate(id, category);
        return { success: true, message: "update successfull!", updatedCategory};
    }catch(error){
        throw new Error("update by id faild!");
    }
}
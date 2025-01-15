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
        throw new Error("ca")
    }
}
const Category = require("../models/Category");

const persist = async ({ name, description, imageUrl }) => {
    try {
        const category = new Category({
            name,
            description,
            image_url: imageUrl,
            created_at: Date.now(),
            updated_at: Date.now(),
        });
        await category.save();
        return { success: true, message: "Category successfully created!" };
    } catch (error) {
        throw new Error("Failed to create category.");
    }
};

const retrieveAll = async () => {
    try {
        const categoryList = await Category.find();
        return { success: true, message: "Categories successfully retrieved!", data: categoryList };
    } catch (error) {
        throw new Error("Failed to retrieve categories.");
    }
};


const retrieveById = async (id) => {
    try {
        const category = await Category.findById(id);
        if (!category) {
            throw new Error("Category not found.");
        }
        return { success: true, message: "Category successfully retrieved!", data: category };
    } catch (error) {
        throw new Error("Failed to retrieve category by id.");
    }
};


const deleteById = async (id) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            throw new Error("Category not found.");
        }
        return { success: true, message: "Category successfully deleted!", data: deletedCategory };
    } catch (error) {
        throw new Error("Failed to delete category by id.");
    }
};


const updateById = async (id, { name, description, imageUrl }) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            {
                name,
                description,
                image_url: imageUrl,
                updated_at: Date.now(),
            },
            { new: true }
        );
        if (!updatedCategory) {
            throw new Error("Category not found.");
        }
        return { success: true, message: "Category successfully updated!", data: updatedCategory };
    } catch (error) {
        throw new Error("Failed to update category by id.");
    }
};


module.exports = {
    persist,
    retrieveAll,
    retrieveById,
    deleteById,
    updateById,
};

const User = require("../models/User");
const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
const secretKey = "nimesh-secret-key";

const registerUser = async ({ username, password}) => {
    try{
        await new User({username, password}).save();
        return {success: true, message: "user registered successfully!"};
    }catch(error){
        throw new Error("user registration faild!");
    }
};

const loginUser = async ({username, password}) => {
    try{
        const user = await User.findOne({ username });
        if(!user){
            throw new Error("user not found with this username!");
        }

        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid){
            throw new Error("invalid password!");
        }

        const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: "5d" });
        return { success: true, token };
    }catch(error){
        throw new Error("Authentication failed!");
    }
};


const forgotPassword = async ({ email }) => {
    const user = await User.findOne({ username: email });
    if(!user){
        throw new Error("user not found with this email!");
    }

    // const token = crypto.randomBytes(20).toString('hex');


}


module.exports = {registerUser, loginUser};
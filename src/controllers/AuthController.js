const User = require("../models/User");
const jwt = require('jsonwebtoken');
const secretKey = 'nimesh-secret-key';

const registerUser = async (req, res) => {
    try{
        const { username, password} = req.body;
        await new User({username, password}).save();
        res.status(201).json({ message: 'user registered successfully!'});

    }catch(err){
        res.status(500).json({ error: 'user registration failed!'})

    }
}


const loginUser = async (req, res) => {
    try{
        const { username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({ error: "user not found in this username!" });
        }
        const isPasswordValid = await user.comparePassword(password);
        if(!isPasswordValid){
            return res.status(401).json({ error: "invalid password!"})
        }
        const token = jwt.sign({userId: user._id}, secretKey, { expiresIn: '5d'});
        res.json({token});

    }catch(err){
        res.status(500).json({ error: 'authentication failed'});
        
    }
}


module.exports = {registerUser, loginUser}
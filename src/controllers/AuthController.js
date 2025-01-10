const User = require("../models/User");

const registerUser = async (req, res) => {
    try{
        const { username, password} = req.body;
        await new User({username, password}).save();
        res.status(201).json({ message: 'User Registered Successfully'});
    }catch(err){
        res.status(500).json({ message: 'User Registration Failed'})
    }
}

const authService = require('../service/AuthService');

const registerUser = async (req, res) => {
    try{
        const { username, password } = req.body.user;
        const result = await authService.registerUser({username, password});
        res.status(201).json(result);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};


const loginUser = async (req, res) => {
    try{
        const { username, password} = req.body;
        const result = await authService.loginUser({username, password});
        res.json(result);
    }catch(error){
        res.status(401).json({error: error.message});
    }
};

module.exports = {registerUser, loginUser};
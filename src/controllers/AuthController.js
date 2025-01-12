const authService = require('../service/AuthService');

const registerUser = async (req, res) => {
    try{
        const { email, password } = req.body.user;
        const result = await authService.registerUser({email, password});
        res.status(201).json(result);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};


const loginUser = async (req, res) => {
    try{
        const { email, password} = req.body;
        const result = await authService.loginUser({email, password});
        res.json(result);
    }catch(error){
        res.status(401).json({error: error.message});
    }
};

const forgotPassword = async (req, res) => {
    try{
        const { email } = req.body;
        const result = await authService.forgotPassword({email});
    }catch(error){}
}

module.exports = {registerUser, loginUser};
const authService = require('../service/AuthService');

const registerUser = async (req, res) => {
    try{
        const { name ,email, password, passwordConfirm } = req.body;
        const result = await authService.registerUser({name ,email, password, passwordConfirm});
        res.status(201).json(result);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};


const loginUser = async (req, res) => {
    try{
        const { email, password} = req.body;
        const result = await authService.loginUser({email, password});
        res.status(200).json(result);
    }catch(error){
        res.status(401).json({error: error.message});
    }
};

const forgotPassword = async (req, res) => {
    try{
        const {email} = req.body;
        const protocol = req.protocol;
        const host = req.get('host');
        const result = await authService.forgotPassword(email, protocol, host);
        res.status(200).json(result);
    }catch(error){
        res.status(500).json({ error: error.message})
    }
}

const resetPassword = async (req, res) => {
    try{
        const {resetToken} = req.params;
        const { password, passwordConfirm} = req.body;
        const result = await authService.resetPassword(resetToken, password, passwordConfirm);
        res.status(201).json(result);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports = {registerUser, loginUser, forgotPassword, resetPassword};
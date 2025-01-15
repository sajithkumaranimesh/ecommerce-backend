const jwt = require('jsonwebtoken');
const secretKey = 'nimesh-secret-key';

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if(!token) return res.status(401).json({ error: 'not token available'});

    jwt.verify(token, secretKey, (err, user) => {
        if(err) return res.status(403).json({ error: 'token is not walid'});
        req.user = user;
        next();
    })
}

module.exports = authenticateToken;
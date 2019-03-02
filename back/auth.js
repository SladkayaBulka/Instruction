const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config/app');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorizstion');
    if (!authHeader) {
        res.status(401).json({ message: 'token not provided!!' });
    };
    const token = authHeader.replace('Bearer ', '');
    try {
        jwt.verify(token, jwtSecret);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: 'invalid token!!' });
        }
    }
    next();
}
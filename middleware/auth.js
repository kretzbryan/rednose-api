const jwt = require('jsonwebtoken');
const config = require('../config/default');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied.' })
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);

        req.user = decoded.user;
        next();
    } catch {
        res.status(401).json({ msg: 'Token is not valid.' })
    }
}
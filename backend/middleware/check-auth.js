const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        console.log("Checking User Authentication (checkauth.js)");
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error('Authorization header missing');
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            throw new Error('Token missing');
        }
        const decoded = jwt.verify(token,'some key');
        req.userData = decoded;
        console.log("User Authentication completed (checkauth.js)");
        next();
    } catch (error) {
        console.log("User Authentication Failed (checkauth.js)");
        console.log('Error:', error.message);
        res.status(401).send({
            message: 'Authorization Failed',
            error: error.message
        });
    }
};

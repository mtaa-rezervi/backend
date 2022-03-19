const jwt = require('jsonwebtoken');

// Middleware for verifying auth tokens
const verifyJWT = (req, res, next) => {
    // Checks whether the auth token is included
    let authToken = req.headers.authorization
    if (!authToken) return res.status(401).send({ error: { message: 'Missing auth-token' } });

    authToken = authToken.split(' ')[1];

    // Checks correctness of the token
    try {
        const verified = jwt.verify(authToken, process.env.JWT_SECRET);
        req.user = verified
        next()  
    } catch(err) {
        return res.status(401).send({ error: { message: 'Invalid auth-token' } });
    }
};

exports.verifyJWT = verifyJWT;
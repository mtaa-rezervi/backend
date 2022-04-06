const jwt = require('jsonwebtoken');

// Middleware for verifying auth tokens
// TODO: - add token expiration
const verifyJWT = (req, res, next) => {
    // Check whether the auth token is included
    let authToken = req.headers.authorization;
    if (!authToken) return res.status(401).send({ error: { message: 'Missing auth-token' } });

    authToken = authToken.split(' ')[1];

    // Check correctness of the token
    try {
        const jwtPayload = jwt.verify(authToken, process.env.JWT_SECRET);
        req.jwtPayload = jwtPayload;
        next();
    } catch(err) {
        return res.status(401).send({ error: { message: 'Invalid auth-token' } });
    }
};

// Middleware for verifying the auth token for requests with userID
const verifyUserID = (req, res, next) => {
    if (req.params.id != req.jwtPayload._id) {
        return res.status(401).send({ error: { message: 'Invalid auth-token' } });
    }
    next();
};

exports.verifyJWT = verifyJWT;
exports.verifyUserID = verifyUserID;
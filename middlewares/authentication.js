const User = require('../models/user-model');
const jwt = require('jsonwebtoken');
const { UnauthenticatedError } = require('../errors');

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication invalid');
    }

    const token = authHeader.spit('')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        const user = User.findById(payload.id).select('-password');
        req.user = user;

        next();
    } catch {
        throw new UnauthenticatedError('Authentication invalid');
    }
}

module.exports = auth;
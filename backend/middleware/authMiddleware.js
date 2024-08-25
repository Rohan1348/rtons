const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protect = async (req, res, next) => {
    let token;
    // console.log('Authorization Header:', req.headers.authorization);

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        // console.log('Extracted Token:', token);
    }

    if (!token) {
        console.log('No token found');
        return res.status(401).json({ error: 'Not authorized, no token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(401).json({ error: 'Not authorized, token failed' });
    }
};


exports.admin = (req, res, next) => {
    // console.log("admin middleware")
    if (req.user && (req.user.role === 'admin')) {
        next();
    } else {
        console.log("Not admin")
        res.status(403).json({ error: 'Not authorized as admin' });
    }
};

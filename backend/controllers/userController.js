const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const user = await User.create({ username, password, role });
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        // res.status(201).json({ success: true, data: user });
        res.status(201).json({ success: true, token });
    } catch (error) {
        res.status(400).json({ success: false, error: 'User registration failed' });
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && (await user.matchPassword(password))) {
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ success: true, token });
        } else {
            res.status(401).json({ success: false, error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(400).json({ success: false, error: 'Login failed' });
    }
};

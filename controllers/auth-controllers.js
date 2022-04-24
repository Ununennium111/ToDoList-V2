const User = require('../models/user-model');

const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    res.status(201).json({
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    // Verify if email and password are not empty

    // Verify is the user exists

    // Verify if the password is correct

    const token = user.createJWT();
    res.status(200).json({ user: { username: user.username }, token });
}

module.exports = {
    register,
    login
}
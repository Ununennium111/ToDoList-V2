const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        maxlength: [50, 'Username cannot contain more than 50 characters'],
        minlength: [4, 'Username cannot contain less than 4 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please enter a valid email'
        ],
        unique: [true, 'Email already registered']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [4, 'Password cannot contain less than 4 characters']
    }
});

UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        { userId: this._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_LIFETIME
        }
    );
}

UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
}

module.exports = model('User', UserSchema);
const errorHandler = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || 500,
        msg: err.message || 'Something went wrong, please try again later'
    }

    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(',')
        customError.statusCode = 400
    }

    if (err.code && err.code === 11000) {
        if (Object.keys(err.keyValue)[0] === 'email') {
            customError.msg = 'Email already registered, please choose another email';
        }
        else {
            customError.msg = `Duplicate value entered for ${Object.keys(
                err.keyValue
            )} field, please choose another value`
        }
        customError.statusCode = 400
    }

    return res.status(customError.statusCode).json({ msg: customError.msg });
}

module.exports = errorHandler;
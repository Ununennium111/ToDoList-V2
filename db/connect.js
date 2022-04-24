const { connect } = require('mongoose');

module.exports = connectDB = (url) => {
    return connect(url);
}
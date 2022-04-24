// Dotenv
require('dotenv').config();

// Express
const express = require('express');
const app = express();

// DB
const connectDB = require('./db/connect');

// Morgan
const morgan = require('morgan');

// Security packages
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// Not found
const notFoundMiddleware = require('./middlewares/not-found');

// Middlewares
app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 100
    })
);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(morgan('dev'));

app.use(notFoundMiddleware);

// Port
app.set('port', process.env.PORT || 3000);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(app.get('port'), console.log(`Server running on port : ${app.get('port')}`));
    } catch (error) {
        console.log(error);
    }
}

start();
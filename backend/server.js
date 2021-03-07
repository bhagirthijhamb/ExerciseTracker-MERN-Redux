const path = require('path');
const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./../backend/config/db');
// const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const app = express();
const userRouter = require('./routes/users');

dotenv.config();
connectDB();

// App Setup
// Getting the express work the way we want it to
app.use(morgan('dev'));
app.use(express.json());
userRouter(app);


// Server Setup
// Getting our express application to talk to the outside world
const PORT = process.env.PORT || 3090;
// const server = http.createServer(app);
app.listen(PORT, console.log(`Server listening on port ${PORT}`))
console.log('Server listening on:', PORT);



const path = require('path');
const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
// const connectDB = require('./config/db');
// const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const app = express();
app.use(express.json());

// App Setup
// Getting the express work the way we want it to


// Server Setup
// Getting our express application to talk to the outside world
const PORT = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(PORT, console.log(`Server listening on port ${PORT}`))

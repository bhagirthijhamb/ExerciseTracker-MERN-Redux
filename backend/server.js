const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./../backend/config/db');
const errorHandlingMiddlewares = require('./middlewares/errorHandleMiddleware');

require('./models/userModel');
require('./models/exerciseModel');

const app = express();

dotenv.config();
connectDB();

// App Setup
// Getting the express work the way we want it to
app.use(morgan('dev'));
app.use(express.json());

require('./routes/userRoutes')(app);
require('./routes/exerciseRoutes')(app);

app.use(errorHandlingMiddlewares.notFound);
app.use(errorHandlingMiddlewares.errorHandler);

// Server Setup
// Getting our express application to talk to the outside world
const PORT = process.env.PORT || 3090;
// const server = http.createServer(app);
app.listen(PORT, console.log(`Server listening on port ${PORT}`))
console.log('Server listening on:', PORT);



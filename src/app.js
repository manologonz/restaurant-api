const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const paginate = require('express-paginate');

require('dotenv').config();

const middlewares = require('./api/utils/middlewares');
const api = require('./api');

// Creating the application
const app = express();

// Configurations
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(paginate.middleware(10, 20))

// routes
app.use('/api', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;

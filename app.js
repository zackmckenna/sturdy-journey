
const config = require('./utils/config');
const logger = require('./utils/logger');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const rolesRouter = require('./controllers/roles');
const usersRouter = require('./controllers/users');
const notesRouter = require('./controllers/notes');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const mongoose = require('mongoose');
const morgan = require('morgan');

logger.info(`Connecting to ${config.MONGODB_URI}`);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongDB.');
  })
  .catch((error) => {
    logger.info(`Error connecting to MongoDB: ${error.message}`);
  });

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(middleware.errorHandler);
app.use(middleware.tokenExtractor);
app.use(express.static('build'));

app.use('/api/users', usersRouter);
app.use('/api/roles', rolesRouter);
app.use('/api/notes', notesRouter);
app.use('/api/login', loginRouter);

module.exports = app;


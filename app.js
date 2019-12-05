
const config = require('./utils/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const rolesRouter = require('./controllers/roles');
/*const middleware = require('./utils/middleware');*/
const mongoose = require('mongoose');
const morgan = require('morgan');

console.log(`Connecting to ${config.MONGODB_URI}`);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongDB.');
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB: ${error.message}`);
  });
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());

app.use('/api/roles', rolesRouter);

module.exports = app;


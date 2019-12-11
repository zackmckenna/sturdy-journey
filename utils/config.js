require('dotenv').config();
require('socket.io');

let PORT = process.env.PORT;
let MONGODB_URI = process.env.MONGODB_URI;
let io = require('socket.io')({
  transports: ['websocket']
});

if(process.env.NODE_ENV === 'test') {
  MONGO_URI = process.env.TEST_MONGO_URI;
}

module.exports = {
  MONGODB_URI,
  PORT
};

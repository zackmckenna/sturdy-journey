const app = require('./app');
const http = require('http');
const config = require('./utils/config');
const socketIo = require('socket.io');

const server = http.createServer(app);

const io = socketIo(server);

io.on('connection', socket => {
  console.log(`client connected: ${socket.id}`);
  socket.on('button', () => {
    console.log('button clicked');
  });
  socket.on('login', (user) => {
    console.log('logged in');
    console.log(user);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

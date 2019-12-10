const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');
const config = require('./utils/config');

const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
  console.log('Socket.io is connected');
  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

const app = require('./app');
const http = require('http');
const config = require('./utils/config');
const socketIo = require('socket.io');

const server = http.createServer(app);

const io = socketIo(server, { wxEngine: 'ws ' });

io.on('connection', socket => {
  console.log(`client connected: ${socket.id}`);
  socket.on('button', () => {
    console.log('button clicked');
  });
  socket.on('login', (user) => {
    console.log(`${user} is logged in.`);
    socket.emit('add global user', { user: user });
  });
  socket.on('add user', user => {
    console.log(`adding ${user}`);
    io.emit('set new users', user);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

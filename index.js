const app = require('./app');
const http = require('http');
const config = require('./utils/config');
const socketIo = require('socket.io');

const server = http.createServer(app);

const io = socketIo(server, { wxEngine: 'ws ' });

const getUsers = () => {
  let clients = io.sockets.clients().connected;
  let sockets = Object.values(clients);
  let users = sockets.map(socket => socket.user);
  return users;
};

const emitUsers = () => {
  io.emit('visitors', getUsers());
};

io.on('connection', socket => {
  console.log(`client connected: ${socket.id}`);
  socket.on('button', () => {
    console.log('button clicked');
  });

  socket.on('add_user', user => {
    console.log(`adding ${user.username}`);
    user !== null ? socket.user = user : null;
    emitUsers();
  });

  socket.on('remove_user', user => {
    socket.user ? console.log(`removing ${user.username}`) : null;
    socket.user = null;
    emitUsers();
  });

  socket.on('message', (message) => {
    console.log(message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    emitUsers();
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

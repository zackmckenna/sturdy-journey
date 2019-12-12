const app = require('./app');
const http = require('http');
const config = require('./utils/config');
const socketIo = require('socket.io');

const server = http.createServer(app);

const io = socketIo(server, { wxEngine: 'ws ' });

const getVisitors = () => {
  let clients = io.sockets.clients().connected;
  let sockets = Object.values(clients);
  let users = sockets.map(socket => socket.user);
  return users;
};

const emitVisitors = () => {
  io.emit('visitors', getVisitors());
};

io.on('connection', socket => {
  console.log(`client connected: ${socket.id}`);
  socket.on('button', () => {
    console.log('button clicked');
  });
  socket.on('login', (user) => {
    console.log(`${user} is logged in.`);
    socket.emit('add global user', { user: user });
  });
  socket.on('add_user', user => {
    console.log(`adding ${user}`);
    user !== null ? socket.user = user : null;
    emitVisitors();
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
    emitVisitors();
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});

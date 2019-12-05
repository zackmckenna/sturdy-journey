const usersRouter = require('express').Router();
const User = require('../models/user');

let users = usersRouter.get('/', (request, response) => {
  User.find({}).then(users => {
    response.json(users);
  });
});

console.log(users);

usersRouter.get('/api/userCount', (request, response) => {
  response.send(`<h1>There are ${users.length} roles.</h1>`);
});


usersRouter.get('/', (request, response) => {
  User.find({}).then(users => {
    response.json(users);
  });
});

usersRouter.delete('/:id', (request, response) => {
  const id = +request.params.id;
  users = users.filter(user => user.id !== id);

  response.status(204).end();
});

usersRouter.get('/:id', (request, response) => {
  const id = +request.params.id;
  const user = users.find(user => user.id === id);

  if (user) {
    response.send(`User Id: ${user.id} username: ${user.name} is name: ${user.username}.`);
  } else {
    response.status(404).end();
  }
});

usersRouter.post('/', (request, response) => {
  const body = request.body;
  console.log(body);

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' });
  }

  const user = new User({
    name: body.name,
    username: body.username,
    password: body.password,
  });

  user.save().then(savedUser => {
    response.json(savedUser.toJSON());
  });
});

module.exports = usersRouter;

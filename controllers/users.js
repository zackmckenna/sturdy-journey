const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users.map(user => user.toJSON()));
});

usersRouter.delete('/:id', async (request, response) => {
  const users = await User.find({});
  
  response.status(204).end();
});

usersRouter.get('/:id', (request, response) => {
  const id = +request.params.id;
  const user = User.findById(id).then(user => {
    response.json(user.toJSON());
  });

  if (user) {
    response.send(`User Id: ${user.id} username: ${user.name} is name: ${user.username}.`);
  } else {
    response.status(404).end();
  }
});

usersRouter.post('/', (request, response) => {
  const body = request.body;

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

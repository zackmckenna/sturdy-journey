const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users.map(user => user.toJSON()));
});

usersRouter.delete('/:id', async (request, response, next) => {
  try {
    await User.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

usersRouter.get('/:id', async (request, response, next) => {
  try{
    const user = await User.findById(request.params.id);
    if (user) {
      response.json(user.toJSON());
    } else {
      response.status(404).end();
    }
  } catch(exception) {
    next(exception);
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

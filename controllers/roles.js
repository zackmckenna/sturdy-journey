const rolesRouter = require('express').Router();
const Role = require('../models/role');

let roles = [
  {
    id: 1,
    name: 'keyholder',
    alignment: 'good',
    description: 'You hold the key',
    actions: 'identify good wizard',
  },
  {
    id: 2,
    name: 'good wizard',
    alignment: 'good',
    description: 'You need the keyholder to trust you',
    actions: 'identify the traitor',
  },
  {
    id: 3,
    name: 'guard',
    alignment: 'good',
    description: 'You defend the keyholder',
    actions: 'identify the traitor',
  },
  {
    id: 4,
    name: 'traitor',
    alignment: 'evil',
    description: 'You must sow discord and aid Evil Wizard',
    actions: 'not stop the game',
  },
  {
    id: 5,
    name: 'evil wizard',
    alignment: 'evil',
    description: 'You must find the keyholder',
    actions: 'identify the keyholder',
  },
  {
    id: 6,
    name: 'wizard',
    alignment: 'evil',
    description: 'You must find the keyholder',
    actions: 'identify the keyholder',
  }
];

let gameLogic = [
  {
    players: 4,
    wizards: 1,
    guards: 1,
    traitors: 1,
    keyholder: 1,
    good: 1,
    evil: 1
  },
  {
    players: 5,
    wizards: 2,
    guards: 1,
    traitors: 1,
    keyholder: 1,
    good: 1,
    evil: 1
  },
  {
    players: 6,
    wizards: 2,
    guards: 2,
    traitors: 1,
    keyholder: 1,
    good: 1,
    evil: 1
  },
  {
    players: 7,
    wizards: 2,
    guards: 3,
    traitors: 1,
    keyholder: 1,
    good: 1,
    evil: 1
  },
  {
    players: 8,
    wizards: 2,
    guards: 3,
    traitors: 2,
    keyholder: 1,
    good: 1,
    evil: 1
  },
  {
    players: 9,
    wizards: 3,
    guards: 3,
    traitors: 2,
    keyholder: 1,
    good: 2,
    evil: 2
  },
  {
    players: 10,
    wizards: 3,
    guards: 4,
    traitors: 2,
    keyholder: 1,
    good: 2,
    evil: 2
  }
];

rolesRouter.get('/api/roleCount', (request, response) => {
  response.send(`<h1>There are ${roles.length} roles.</h1>`);
});

rolesRouter.get('/api/gameLogic', (request, response) => {
  response.send(`<h3>${gameLogic.map(game => `If there are ${game.players} players, there is ${game.wizards} wizards`)} </h3>`);
});

rolesRouter.get('/', (request, response) => {
  response.json(roles);
});

rolesRouter.delete('/:id', (request, response) => {
  const id = +request.params.id;
  roles = roles.filter(role => role.id !== id);

  response.status(204).end();
});

rolesRouter.get('/:id', (request, response) => {
  const id = +request.params.id;
  const role = roles.find(role => role.id === id);

  if (role) {
    response.send(`Role Id: ${role.id} The ${role.name} is a ${role.alignment} character. They can ${role.actions}.`);
  } else {
    response.status(404).end();
  }
});

rolesRouter.post('/', (request, response) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' });
  }

  const role = new Role({
    name: body.name,
    alignment: body.alignment,
    description: body.description,
    actions: body.actions,
    booleanAlign: body.booleanAlign
  });

  role.save().then(savedRole => {
    response.json(savedRole.toJSON());
  });
});

module.exports = rolesRouter;

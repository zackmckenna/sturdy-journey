const rolesRouter = require('express').Router();
const Role = require('../models/role');
const ROLES = require('../shared/roles');
const GAMELOGIC = require('../shared/gameLogic');

let gameLogic = GAMELOGIC;
let roles = ROLES;

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

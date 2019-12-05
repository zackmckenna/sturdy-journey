const rolesRouter = require('express').Router();
const Role = require('../models/role');
const ROLES = require('../shared/roles');
const GAMELOGIC = require('../shared/gameLogic');

/*let gameLogic = GAMELOGIC;
let roles = ROLES; */

rolesRouter.get('/', async (request, response) => {
  const roles = await Role.find({});
  response.json(roles.map(role => role.toJSON()));
});

rolesRouter.delete('/:id', (request, response) => {
  const id = +request.params.id;
  roles = roles.filter(role => role.id !== id);

  response.status(204).end();
});

rolesRouter.get('/:id', (request, response) => {
  Role.findById(request.params.id).then(role => {
    response.json(role.toJSON());
  });
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

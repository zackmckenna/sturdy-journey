const rolesRouter = require('express').Router();
const Role = require('../models/role');

rolesRouter.get('/', async (request, response) => {
  const roles = await Role.find({});
  response.json(roles.map(role => role.toJSON()));
});

rolesRouter.delete('/:id', async (request, response, next) => {
  try{
    await Role.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch(exception){
    next(exception);
  }
});

rolesRouter.get('/:id', async (request, response, next) => {
  try{
    const role = await Role.findById(request.params.id);
    if (role) {
      response.json(role.toJSON());
    } else {
      response.status(404).end();
    }
  } catch(exception) {
    next(exception);
  }
});

rolesRouter.post('/', async (request, response, next) => {
  const body = request.body;

  const role = new Role({
    name: body.name,
    alignment: body.alignment,
    description: body.description,
    actions: body.actions,
    booleanAlign: body.booleanAlign
  });

  try {
    const savedRole = await role.save();
    response.json(savedRole.toJSON());
  } catch (exception){
    next(exception);
  }

});


module.exports = rolesRouter;

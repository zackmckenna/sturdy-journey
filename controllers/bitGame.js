const bitGameRouter = require('express').Router();
const BitGame = require('../models/bitGame');

bitGameRouter.get('/', async (request, response) => {
  const bitGames = await BitGame.find({});
  response.json(bitGames.map(bitGame => bitGame.toJSON()));
});

bitGameRouter.delete('/:id', async (request, response, next) => {
  try{
    await BitGame.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch(exception){
    next(exception);
  }
});

bitGameRouter.get('/:id', async (request, response, next) => {
  try{
    const bitGame = await BitGame.findById(request.params.id);
    if (bitGame) {
      response.json(bitGame.toJSON());
    } else {
      response.status(404).end();
    }
  } catch(exception) {
    next(exception);
  }
});

bitGameRouter.post('/', async (request, response, next) => {
  const body = request.body;

  const bitGame = new BitGame({
    gameName: body.gameName,
    minPlayers: body.minPlay,
    maxPlayers: body.maxPlayers,
    gameType: body.gameType,
    numberPlayer: body.numberPlayer,
    numberCaptian: body.numberCaptian,
    numberMate: body.numberMate,
    numberMutineer: body.numberMutineer,
    numberFirstmate: body.numberFirstmate,
    numberGood: body.numberGood,
    numberEvil: body.numberEvil
  });

  try {
    const savedBitGame = await bitGame.save();
    response.json(savedBitGame.toJSON());
  } catch (exception){
    next(exception);
  }

});


module.exports = bitGameRouter;

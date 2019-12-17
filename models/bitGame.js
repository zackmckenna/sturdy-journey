const mongoose = require('mongoose');

const bitGameSchema = new mongoose.Schema({
  gameName: String,
  minPlayers: Number,
  maxPlayers: Number,
  gameType: String,
  numberPlayer: Number,
  numberCaptian: Number,
  numberMate: Number,
  numberMutineer: Number,
  numberFirstMate: Number,
  numberGood: Number,
  numberEvil: Number
});

bitGameSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('BitGame', bitGameSchema);

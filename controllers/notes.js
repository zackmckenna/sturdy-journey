const notesRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Note = require('../models/note');


notesRouter.get('/', async (request, response) => {
  const notes = await Note
    .find({}).populate('user', { username: 1, name: 1 });

  response.json(notes.map(note => note.toJSON()));
});

notesRouter.post('/', async (request, response, next) => {
  const body = request.body;

  const user = await User.findById(body.userId);

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    date: new Date(),
    user: user._id
  });

  try {
    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();
    response.json(savedNote.toJSON());
  } catch(exception) {
    next(exception);
  }
});

module.exports = notesRouter;

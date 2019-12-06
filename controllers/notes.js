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

  const token = request.token;

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const note = new Note({
      content: body.content,
      important: body.important === undefined ? false : body.important,
      date: new Date(),
      user: user._id
    });

    const savedNote = await note.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();
    response.json(savedNote.toJSON());
  } catch(exception) {
    next(exception);
  }
});

module.exports = notesRouter;

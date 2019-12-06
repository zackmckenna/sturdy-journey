const User = require('../models/user');
const Note = require('../models/note');

const initialUsers = [
  {
    username: 'Zack',
    name: 'Zack McKenna',
    password: 'McKenna'
  },
  {
    username: 'Charles',
    name: 'Charles lenny',
    password: 'lenny'
  },
];

const initialNotes = [
  {
    content: 'I am a note.'
  },
  {
    content: 'I am another note.'
  },
];



const nonExistingId = async () => {
  const note = new User({ content: 'willremovethissoon' });
  await note.save();
  await note.remove();

  return note._id.toString();
};

const notesInDb = async () => {
  const notes = await Note.find({});
  return notes.map(note => note.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

module.exports = {
  initialUsers, usersInDb, initialNotes, nonExistingId, notesInDb
};

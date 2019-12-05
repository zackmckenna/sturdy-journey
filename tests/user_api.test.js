const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const User = require('../models/user');

const initialUsers = [
  {
    name: 'Zack',
    username: 'zacksparrow',
    password: 'password',
  },
  {
    name: 'suzye',
    username: 'snooz',
    password: 'snooz',
  },
];

beforeEach(async () => {
  await User.deleteMany({});

  let userObject = new User(initialUsers[0]);
  await userObject.save();

  userObject = new User(initialUsers[1]);
  await userObject.save();
});

test('a valid user can be added ', async () => {
  const newUser = {
    name: 'test1',
    username: 'test1',
    password: 'test1'
  };

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/users');

  const contents = response.body.map(r => r.content);

  expect(response.body.length).toBe(initialUsers.length + 1);
  expect(response.body[2].name).toContain(
    'test1'
  );
});

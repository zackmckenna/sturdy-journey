const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('roles are returned as json', async () => {
  await api
    .get('/api/roles')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('There are 5 roles', async () => {
  const response = await api.get('/api/roles');

  expect(response.body.length).toBe(5);
});


afterAll(() => {
  mongoose.connection.close();
});

const supertest = require('supertest');
const expect = require('expect');

const request = supertest('http://localhost:3000');

const createdUser = {};
const username = 'John';
const password = 'password';
const loginUser = async (auth) => {
  try {
    const res = await request
      .post('/api/v1/login')
      .send({
        username: 'musasho',
        password: '1292602b'
      })
      .expect(200);
    auth.token = res.body.token;
  }
  catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    throw error;
  }
};

afterAll(async () => {
  try {
    const auth = {};
    await loginUser(auth);
    await request
      .delete(`/api/v1/users/${createdUser.id}`)
      .set('Authorization', `Bearer ${auth.token}`)
      .expect(204);
  }
  catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    throw error;
  }
});

describe('POST: /api/v1/users', () => {
  test('success', async () => {
    jest.setTimeout(10000);
    try {
      const res = await request
        .post('/api/v1/users')
        .send({
          name: username,
          password,
          email: '1234567@abc.com'
        })
        .set('Accept', 'application/json');
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('user');
      expect(res.body).toHaveProperty('password');
      createdUser.id = res.body.user.id;
    }
    catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  });

  test('failure: email already exists', async () => {
    jest.setTimeout(10000);
    try {
      const res = await request
        .post('/api/v1/users')
        .send({
          name: 'John1',
          password: 'password',
          email: '1234567@abc.com'
        })
        .set('Accept', 'application/json');
      expect(res.status).toBe(409);
    }
    catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  });

  test('failure: name already exists', async () => {
    jest.setTimeout(10000);

    try {
      const res = await request
        .post('/api/v1/users')
        .send({
          name: 'John',
          password: 'password',
          email: '12345678@abc.com'
        })
        .set('Accept', 'application/json');
      expect(res.status).toBe(409);
    }
    catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  });
});

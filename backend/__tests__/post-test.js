const supertest = require('supertest');
const expect = require('expect');

const request = supertest('http://localhost:3000');

const username = 'John';
const password = 'password';

const createdPost = {};

const loginUser = async (auth) => {
  try {
    const res = await request
      .post('/api/v1/login')
      .send({
        username: 'musasho',
        password: '1292602b'
      })
      .expect(200);
    if (auth) {
      auth.token = res.body.token;
    }
    return res;
  }
  catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    throw error;
  }
};

describe('POST: /api/v1/posts', () => {
  const auth = {};
  beforeAll(async () => {
    await loginUser(auth);
  });

  test('success', async () => {
    jest.setTimeout(10000);

    try {
      const res = await request
        .post('/api/v1/posts')
        .set('Authorization', `Bearer ${auth.token}`)
        .send({
          title: 'title',
          description: 'description'
        });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('post');
      createdPost.id = res.body.post.id;
    }
    catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  });

  test('failure: empty string', async () => {
    jest.setTimeout(10000);

    try {
      const res = await request
        .post('/api/v1/posts')
        .set('Authorization', `Bearer ${auth.token}`)
        .send({
          title: '',
          description: ''
        });
      expect(res.status).toBe(400);
    }
    catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  });


  test('failure: no auth', async () => {
    jest.setTimeout(10000);

    try {
      const res = await request
        .post('/api/v1/posts')
        .send({
          title: 'title',
          description: 'description'
        });
      expect(res.status).toBe(401);
    }
    catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  });

  test('failure: no body', async () => {
    jest.setTimeout(10000);

    try {
      const res = await request
        .post('/api/v1/posts')
        .set('Authorization', `Bearer ${auth.token}`);
      expect(res.status).toBe(500);
    }
    catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  });
});

describe('GET: /api/v1/posts', () => {
  const auth = {};
  beforeAll(async () => {
    await loginUser(auth);
  });

  test('success', async () => {
    jest.setTimeout(10000);

    try {
      const res = await request
        .get('/api/v1/posts?limit=20&offset=0')
        .set('Authorization', `Bearer ${auth.token}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('posts');
      expect(res.body.posts).toHaveProperty('count');
      expect(res.body.posts).toHaveProperty('rows');
    }
    catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  });

  test('failure: no query', async () => {
    jest.setTimeout(10000);

    try {
      const res = await request
        .get('/api/v1/posts')
        .set('Authorization', `Bearer ${auth.token}`);
      expect(res.status).toBe(500);
    }
    catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  });
});

describe('PUT: /api/v1/posts/:id', () => {
  const auth = {};
  beforeAll(async () => {
    await loginUser(auth);
  });

  test('success', async () => {
    jest.setTimeout(10000);

    try {
      const res = await request
        .put(`/api/v1/posts/${createdPost.id}`)
        .set('Authorization', `Bearer ${auth.token}`);
      expect(res.status).toBe(204);
    }
    catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  });

  test('failure: not exists', async () => {
    jest.setTimeout(10000);

    try {
      const res = await request
        .put('/api/v1/posts/99999')
        .set('Authorization', `Bearer ${auth.token}`);
      expect(res.status).toBe(400);
    }
    catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  });
});

describe('DELETE: /api/v1/posts', () => {
  const auth = {};
  beforeAll(async () => {
    await loginUser(auth);
  });

  test('success', async () => {
    jest.setTimeout(10000);

    try {
      const res = await request
        .delete(`/api/v1/posts/${createdPost.id}`)
        .set('Authorization', `Bearer ${auth.token}`);
      expect(res.status).toBe(204);
    }
    catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  });

  test('failure: not exists', async () => {
    jest.setTimeout(10000);

    try {
      const res = await request
        .delete(`/api/v1/posts/${createdPost.id}`)
        .set('Authorization', `Bearer ${auth.token}`);
      expect(res.status).toBe(400);
    }
    catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  });
});

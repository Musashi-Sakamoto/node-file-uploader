const supertest = require('supertest');
const expect = require('expect');

require('dotenv').config();

const request = supertest('http://localhost:3000');

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

describe('POST: /api/v1/images', () => {
  const auth = {};
  let createdImage = {};
  let firstPost = {};
  beforeAll(async () => {
    await loginUser(auth);
  });

  test('success: image', async () => {
    jest.setTimeout(10000);

    try {
      const postData = await request
        .post('/api/v1/posts')
        .set('Authorization', `Bearer ${auth.token}`)
        .send({
          title: 'title',
          description: 'description'
        });
      expect(postData.status).toBe(201);
      expect(postData.body).toHaveProperty('post');
      firstPost = postData.body.post;
      const res = await request
        .post('/api/v1/images')
        .set('Authorization', `Bearer ${auth.token}`)
        .attach('image', `${__dirname}/assets/test.jpeg`, { filename: `${firstPost.id}`, contentType: 'image/jpeg' });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('image');
      createdImage = res.body.image;
    }
    catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      throw error;
    }
  });

  afterAll(async () => {
    try {
      const res = await request
        .delete(`/api/v1/posts/${firstPost.id}`)
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
});

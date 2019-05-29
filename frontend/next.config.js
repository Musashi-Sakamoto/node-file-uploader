module.exports = {
  target: 'serverless',
  env: {
    API_HOST: process.env.NODE_ENV === 'production' ? 'https://enigmatic-cove-78500.herokuapp.com/api/v1' : 'http://localhost:3000/api/v1'
  }
};

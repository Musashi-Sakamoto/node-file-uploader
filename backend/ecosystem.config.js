module.exports = {
  apps: [{
    name: 'API',
    script: './bin/www',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    instances: 'max',
    autorestart: true,
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
